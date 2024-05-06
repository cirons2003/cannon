from .extensions import sio, db
from datetime import datetime, timezone
from tzlocal import get_localzone
import threading
from .models import Order 

def setup_socket_events(app):
    @sio.event
    def connect():
        print('connected to server!')
        ##timeout prevents race conditions
        get_orders_timer = threading.Timer(3, sio.emit, ['request_pending_orders'])
        get_orders_timer.start()

    ##IMPORTANT 
    @sio.event
    def new_order(data):
        with app.app_context():
            if (data['order_id'] % 2 == 0):
                print(f'order {data["order_id"]}', f'scheduled at {datetime.fromisoformat(data["scheduled_time"]).astimezone(get_localzone()).time()}', f'details {data["order_data"]}')
            else:
                try:
                    order = Order(order_id = data['order_id'], 
                                order_data = data['order_data'], 
                                scheduled_time = datetime.fromisoformat(data['scheduled_time']).astimezone(timezone.utc))
                    db.session.add(order)
                    db.session.commit()
                except Exception as e:
                    db.session.rollback()
                    print(f'the following error occurred {e}')
            ## DANGER    
            sio.emit('order_processed', {'order_id': data['order_id']})
    
    @sio.event
    def disconnect():
        print('disconnected from server')

