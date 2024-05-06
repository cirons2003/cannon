from datetime import datetime, timezone, timedelta
from .extensions import db 
from .models import Order


def handle_order(data):
    ###Function: handle_order
    ##INPUT: takes an order as input with following attributes
    #   order_id: int, 
    #   order_data: dictionary, 
    #   scheduled_time: isoformat datetime in utc timezone
    ##OUTPUT: 
    #   True if order processed successfully
    #   False if order processing failed
    
    # Validate and extract inputs
    if 'order_id' not in data:
        return False, "Missing 'order_id' in the input data"
    order_id = data['order_id']
    
    if 'order_data' not in data:
        return False, "Missing 'order_data' in the input data"
    order_data = data['order_data']
    
    if 'scheduled_time' not in data:
        return False, "Missing 'scheduled_time' in the input data"
    scheduled_time = data['scheduled_time']

    # Assert input types 
    if not isinstance(order_id, int):
        return False, "'order_id' must be an integer"
    if not isinstance(order_data, dict):
        return False, f"'order_data' must be a dictionary, type is {type(order_data)}"

    # Validate scheduled_time format
    scheduled_datetime = datetime.fromisoformat(scheduled_time)
    if scheduled_datetime.tzinfo is None or scheduled_datetime.tzinfo.utcoffset(scheduled_datetime) != timedelta(0):
        return False, "Invalid format for 'scheduled_time'. It should be in ISO 8601 format with UTC timezone"

    ##storing for now 
    try:
        order = Order(order_id = order_id, order_data = order_data, scheduled_time = scheduled_datetime)
        db.session.add(order)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return False, "Failed to commit future order to database"
    
    return True, f"order {order_id} has been processed!"
    

