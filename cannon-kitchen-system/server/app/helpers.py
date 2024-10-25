from .extensions import printer #, db
#from .models import Order


def handle_order(order_data, app):
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
        
        order = {'order_id': order_data['order_id'], 'item_name': order_data['item_name'], 'selections':order_data['selections'], 
                      'user_name':order_data['user_name'], 'description':order_data['description']}

        try: 
            printer.print_orders([order])
        except Exception as e:  
            print(f"Printer failed to print... check printer connection: {e}")
            return 0, str(e)

        print('printed')
        return 1, f'successfully handled order {order['order_id']}'

