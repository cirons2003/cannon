from .extensions import sio, db
from datetime import datetime, timezone
from tzlocal import get_localzone
import threading
from .models import Order 
from .helpers import handle_order

def setup_socket_events(app):
    @sio.event
    def connect():
        print('connected to server!')
        ##timeout prevents race conditions
        get_orders_timer = threading.Timer(3, sio.emit, ['request_pending_orders'])
        get_orders_timer.start()

    ##IMPORTANT: handles an incoming order 
    @sio.event
    def new_order(data):
        with app.app_context():
            processed, message = handle_order(data)
            print(message)
            ## DANGER 
            if processed:  
                sio.emit('order_processed', {'order_id': data['order_id']})
    
    @sio.event
    def disconnect():
        print('disconnected from server')

