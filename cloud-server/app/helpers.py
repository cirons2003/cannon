from .extensions import db, socketio
from .models import Order, Meal
from flask_socketio import rooms, emit
from datetime import datetime
import pytz
import os

##function called on server when an order has been processed 
def change_order_status(data):
    order = Order.query.get(data['order_id'])

    if order:
        try:
            order.status = data['new_status']
            db.session.commit()
            print(f'order {data["order_id"]} was {data["new_status"]}')
        except Exception as e:
            db.session.rollback()
            print(f'the following error occurred: {e}')


def relay_pending_orders():
    if 'authorized_room' not in rooms():
        return 
    orders = Order.query.filter(Order.status == 'pending').all() # consider indexing on status if we scale assumptions
    for o in orders:
        relay_order(o)
        

def relay_order(o: Order): 
    active_meal = get_active_meal()
    meal_date = get_meal_date_now()
    
    if (active_meal is None or o.meal_name != active_meal.name or str(o.meal_date) != str(meal_date)):
        try: 
            o.status = 'expired'
            db.session.commit()
        except Exception as e: 
            db.session.rollback()
            print(f'failed to change status for order {o.order_id}', e)
    else:
        socketio.emit('new_order', {
            'order_id': o.order_id,
            'item_name': o.item_name,
            'selections': o.selections,
            'user_name': o.user_name,
            'description': o.description,
        }, to = 'authorized_room')

def get_active_meal(): 
    now = datetime.now(pytz.timezone('America/New_York'))
    now_day = (now.weekday() + 1) % 7
    
    meals = Meal.query.filter_by(day_of_week = now_day).all()

    current_meal = None
    for m in meals: 
        start_hour_str, start_min_str = m.start_time.split(':') 
        start_hour = int(start_hour_str)
        start_min = int(start_min_str)
        end_hour_str, end_min_str = m.end_time.split(':')
        end_hour = int(end_hour_str)
        end_min = int(end_min_str)
        if (now.hour < start_hour or (now.hour == start_hour and now.minute < start_min)):
            continue
        if (now.hour > end_hour or (now.hour == end_hour and now.minute > end_min)):
            continue
        current_meal = m
        break
    return current_meal

def get_order_credits_left(user, active_meal):
    count = int(os.getenv('ORDERS_PER_MEAL'))
    meal_date = get_meal_date_now()
    
    for order in user.orders: 
        if (order.meal_name == active_meal.name and order.meal_date == meal_date):
            count = count-1
            if (count == 0):
                return 0
    return count
    
def get_meal_date_now():
    now = datetime.now(pytz.timezone('America/New_York'))
    return now.date().strftime('%Y-%m-%d')