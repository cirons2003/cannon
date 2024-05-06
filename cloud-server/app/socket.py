from flask_socketio import join_room, emit, disconnect, rooms
from flask import Blueprint, request, jsonify
import os
from .models import Order
from datetime import datetime, timezone
from .extensions import db, socketio

##handles authentication of client connections
def setup_socket_functionality():
    @socketio.on('connect')
    def handle_connect():
        print('local server connected... confirming authorization')
        secret_key = request.args.get('secret_key')
        if True or secret_key == 'secret':
            join_room('authorized_room')
            print('joined room')

    @socketio.on('disconnect')
    def handle_disconnect():
        print('local server disconnected')
        
            

    @socketio.on('request_pending_orders')
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
    
    @socketio.on('order_processed')
    def remove_order(data):
        order = Order.query.get(data['order_id'])
        if order:
            try:
                db.session.delete(order)
                db.session.commit()
                print(f'removed order {data["order_id"]}')
            except Exception as e:
                db.session.rollback()
                print(f'the following error occurred: {e}')




order_bp = Blueprint('order', __name__)

fakeOrderData = {'name': 'Carson', 'order': 'Turkey Shoot'}
fakeOrderTime = datetime.now(timezone.utc)

##accept utc times only 
@order_bp.route('/placeOrder')

def place_order():
    user = None ##get user id from auth token and query for user
    ##handle authorization of request if passes do the following 
    order_data = fakeOrderData #request.json.get('order_data')
    scheduled_time = fakeOrderTime #request.json.get('scheduled_time')
    queueOrder = Order(order_data = order_data, scheduled_time = scheduled_time)
    try:
        db.session.add(queueOrder)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'order not placed'})
    
    socketio.emit('new_order', {'order_id': queueOrder.order_id, 'order_data': order_data, 'scheduled_time': queueOrder.scheduled_time.isoformat()+'+00:00'}, to = 'authorized_room')
    
    return jsonify({'message': 'success'})

    

    