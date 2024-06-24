from datetime import datetime, timezone, timedelta
from .extensions import db 
from .models import Order
from flask import current_app


def handle_order(order, app):
    with app.app_context():
        print('handling order')
        if 'order_id' not in order: 
            return False, 'missing order_id'
        if 'selections' not in order: 
            return False, 'missing selections'
        if 'user_name' not in order: 
            return False, 'missing user_name'
        if 'scheduled_time' not in order:
            return False, 'missing scheduled_time'
        
        order = Order(order_id=order['order_id'], selections=order['selections'], user_name=order['user_name'], scheduled_time=order['scheduled_time'])

        try: 
            print('try block')
            db.session.add(order) 
            db.session.commit()
        except Exception as e:  
            db.session.rollback()
            return False, str(e) #'couldnt add to database' 

        print('handled')
        return True, f'successfully handled order ${order["order_id"]}'