from flask_socketio import join_room, emit, disconnect, rooms
from flask import Blueprint, request, jsonify, current_app
import os
from .models import Order, User
from datetime import datetime, timedelta
from .extensions import db, socketio
from .helpers import cleanup_processed_order, relay_pending_orders, relay_order
from flask_jwt_extended import jwt_required, get_jwt_identity


def setup_socket_functionality():
    ##New local server
    @socketio.on('connect')
    def handle_connect():
        print('local server connected... confirming authorization')
        join_room('authorized_room')
        print('joined room')

    ##print server disconnected
    @socketio.on('disconnect')
    def handle_disconnect():
        print('local server disconnected')
        
    ##transfer orders from queue
    @socketio.on('request_pending_orders')
    def request_pending_orders():
        relay_pending_orders()
    

    ##handle the processed order
    @socketio.on('order_processed')
    def order_processed(data):
        cleanup_processed_order(data)




order_bp = Blueprint('order', __name__)

##accept utc times only 
@order_bp.route('/placeOrder', methods = ['POST'])
@jwt_required()
def place_order():
    item_name=request.json.get('item_name')
    selections=request.json.get('selections')
    user_id=get_jwt_identity()
    timestamp = datetime.now() + timedelta(minutes=5) ##5min delay
    timestamp_string = timestamp.isoformat()

    if item_name is None or not isinstance(item_name, str): 
        return jsonify({'message': 'item_name is required and must be a string'}), 400 
    
    if selections is None or not isinstance(selections, list): 
        return jsonify({'message':'selections are required even if empty, must be a list'}), 400
    
    user = User.query.get(user_id)
    if user is None: 
        return jsonify({'message': 'user not found'}), 401 
    
    user_name=f"{user.first_name} {user.last_name}"

    order = Order(user_name=user_name, item_name=item_name, selections=selections, scheduled_time=timestamp_string)
    try:
        db.session.add(order)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'failed to place order', 'error_message': str(e)}), 500
    
    # Emit order to the print server
    relay_order(order)

    return jsonify({'message': 'order successfully placed'}), 200