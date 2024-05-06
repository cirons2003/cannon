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
        emit('new_order', {
            'order_id': o.order_id,
            'order_data': o.order_data, 
            'scheduled_time': o.scheduled_time.isoformat()+ '+00:00'
        }, to = 'authorized_room')

def relay_order(order_data, scheduled_time):
    """
    Transmits an order to the print server.

    Args:
        order_data (dict): Dictionary containing order details.
        scheduled_time (str): ISO 8601 formatted datetime string in UTC timezone.

    Returns:
        dict: Response object with a success or error message.

    """
    # Check if order_data and scheduled_time are provided
    if not order_data or not scheduled_time:
        return {'message': 'Missing order_data or scheduled_time'}

    # Validate order_data type
    if not isinstance(order_data, dict):
        return {'message': 'Invalid type for order_data'}

    # Validate scheduled_time format
    scheduled_datetime = datetime.fromisoformat(scheduled_time)
    if scheduled_datetime.tzinfo != timezone.utc:
        return {'message': 'Invalid format for scheduled_time. It should be in ISO 8601 format with UTC timezone'}

    # Add order to the database
    queueOrder = Order(order_data=order_data, scheduled_time=scheduled_datetime)
    try:
        db.session.add(queueOrder)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return {'message': 'Failed to place order. Database error.'}

    # Emit order to the print server
    socketio.emit('new_order', {'order_id': queueOrder.order_id, 'order_data': order_data, 'scheduled_time': scheduled_time}, to='authorized_room')

    return {'message': 'Order has been placed!'}
