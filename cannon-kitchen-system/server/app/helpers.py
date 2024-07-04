from datetime import datetime, timezone, timedelta
from .extensions import db 
from .models import Order
from flask import current_app


def handle_order(order_data, app):
    with app.app_context():
        print('handling order')
        if 'order_id' not in order_data: 
            return False, 'missing order_id'
        if 'selections' not in order_data: 
            return False, 'missing selections'
        if 'user_name' not in order_data: 
            return False, 'missing user_name'
        if 'scheduled_time' not in order_data:
            return False, 'missing scheduled_time'
        
        order = Order(order_id=order_data['order_id'], item_name=order_data['item_name'], selections=order_data['selections'], user_name=order_data['user_name'], scheduled_time=order_data['scheduled_time'])

        try: 
            db.session.add(order) 
            db.session.commit()
        except Exception as e:  
            db.session.rollback()
            return False, str(e) #'couldnt add to database' 

        print('handled')
        return True, f'successfully handled order {order.order_id}'