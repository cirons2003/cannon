from .extensions import sio
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
            processed, message = handle_order(data, app)
            print(message)
            ## DANGER 
            if processed:  
                sio.emit('order_processed', {'order_id': data['order_id']})

        @sio.event
        def disconnect():
            print('disconnected from server')   

