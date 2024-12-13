from .extensions import sio, ordercache
import threading
from .helpers import handle_order

def setup_socket_events(app):
    with app.app_context():
        @sio.event
        def connect():
            print('connected to server!')
            ##timeout prevents race conditions
            get_orders_timer = threading.Timer(3, sio.emit, ['request_pending_orders'])
            get_orders_timer.start()


        ##IMPORTANT: handles an incoming order 
        @sio.event
        def new_order(data):
            # avoid double orders 
            if (ordercache.containsOrder(data['order_id'])):
                print(f'Prevented duplicate order for order {data['order_id']}!')
                return 
            
            ordercache.addOrder(data['order_id'])
            
            status_code, message = handle_order(data, app) #0=fail, 1=print
            print(message)
            
            if status_code == 0:
                return 
            
            elif status_code == 1: 
                new_status = 'placed'
                sio.emit('update_order_status', {'order_id': data['order_id'], 'new_status': new_status})
            else: 
                print('invalid print status')
                return
            
        @sio.event
        def status_updated(data): 
            order_id = data['order_id']
            ordercache.removeOrder(order_id)

        @sio.event
        def disconnect():
            print('disconnected from server')   

