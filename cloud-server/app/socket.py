from flask_socketio import join_room, emit, disconnect, rooms
from flask import Blueprint, request, jsonify
import os
from .models import Order, User, Meal, Menu
from datetime import datetime, timedelta
from .extensions import socketio, db
from .helpers import cleanup_processed_order, relay_pending_orders, relay_order, get_active_meal, get_order_credits_left
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

@order_bp.route('/placeOrder', methods = ['POST'])
@jwt_required()
def place_order():
    item_name=request.json.get('item_name')
    selections=request.json.get('selections')
    user_id=get_jwt_identity()
    #timestamp = datetime.now() #+ timedelta(minutes=5) ##5min delay
    #timestamp_string = timestamp.isoformat()

    if item_name is None or not isinstance(item_name, str): 
        return jsonify({'message': 'item_name is required and must be a string'}), 400 
    
    if selections is None or not isinstance(selections, list): 
        return jsonify({'message':'selections are required even if empty, must be a list'}), 400
    
    user = User.query.get(user_id)
    if user is None: 
        return jsonify({'message': 'user not found'}), 401 
    
    user_name=f"{user.first_name} {user.last_name}"

    description = user.description

    active_meal = get_active_meal()
    if active_meal is None: 
        return jsonify({'message': 'failed to place order, no meals are active'}), 400

    order_credits_left = get_order_credits_left(user, active_meal)
    if order_credits_left == 0: 
        return jsonify({'message': 'out of mobile orders for this meal, please use the ipads to place more orders'}), 400
   
    active_menu = active_meal.active_menu
    
    if (item_name not in [i.name for i in active_menu.items]):
        return jsonify({'message': f'failed to place order, item not found in {active_menu.name}'}), 400
    
    order = Order(user_name=user_name, item_name=item_name, selections=selections, description=description, meal_name=active_meal.name, user = user)

    try:    
        db.session.add(order)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'failed to place order', 'error_message': str(e)}), 500
    
    # Emit order to the print server
    print(f'order {order.order_id} was received')
    relay_order(order)

    return jsonify({'message': 'order successfully placed', 'order_credits_left': order_credits_left}), 200