from .extensions import sio, db
from datetime import datetime, timezone
from tzlocal import get_localzone
import threading
from .models import Order 
from .helpers import handle_order
from flask import current_app

def setup_socket_events(app):
    @sio.event
    def connect():
        print('connected to server!')
        ##timeout prevents race conditions
        get_orders_timer = threading.Timer(3, sio.emit, ['request_pending_orders'])
        get_orders_timer.start()

    ##IMPORTANT: handles an incoming order 
    @sio.event
    def new_order(order, app):
        print('made it to new order')
        with app.app_context():
            processed, message = handle_order(order, app)
            print(message)
            ## DANGER 
            if processed:  
                sio.emit('order_processed', {'order_id': order['order_id']})

    @sio.event
    def disconnect():
        print('disconnected from server')

