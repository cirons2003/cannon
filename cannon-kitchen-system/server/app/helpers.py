from datetime import datetime, timezone, timedelta
from .extensions import db, printer
from .models import Order


def handle_order(order_data: Order, app):
    with app.app_context():
        print('handling order')
        if 'order_id' not in order_data: 
            return False, 'missing order_id'
        if 'selections' not in order_data: 
            return False, 'missing selections'
        if 'user_name' not in order_data: 
            return False, 'missing user_name'
        if 'description' not in order_data: 
            return False, 'missing description'
        
        order = Order(order_id=order_data['order_id'], item_name=order_data['item_name'], selections=order_data['selections'], 
                      user_name=order_data['user_name'], description=order_data['description'])

        try: 
            printer.print_order(order)
        except Exception as e:  
            db.session.rollback()
            return False, str(e) 
        
        print('handled')
        return True, f'successfully handled order {order.order_id}'