from .extensions import db, socketio
from .models import Order
from flask_socketio import rooms, emit
from datetime import datetime, timezone

##function called on server when an order has been processed 
def cleanup_processed_order(data):
    order = Order.query.get(data['order_id'])
    if order:
        try:
            db.session.delete(order)
            db.session.commit()
            print(f'removed order {data["order_id"]}')
        except Exception as e:
            db.session.rollback()
            print(f'the following error occurred: {e}')



def relay_pending_orders():
    if 'authorized_room' not in rooms():
        return 
    orders = Order.query.all()
    for o in orders:
        relay_order(o)
        

def relay_order(o: Order): 
    socketio.emit('new_order', {
        'order_id': o.order_id,
        'item_name': o.item_name,
        'selections': o.selections,
        'user_name': o.user_name,
        'scheduled_time': o.scheduled_time, 
        'description': o.description,
    }, to = 'authorized_room')