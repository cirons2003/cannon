from flask_socketio import join_room, emit, disconnect, rooms
from flask import Blueprint, request, jsonify
import os
from .models import Order
from datetime import datetime, timezone
from .extensions import db, socketio
from .helpers import cleanup_processed_order, relay_pending_orders, relay_order


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

fakeOrderData = {'name': 'Carson', 'order': 'Turkey Shoot'}
fakeOrderTime = datetime.now(timezone.utc).isoformat()

##accept utc times only 
@order_bp.route('/placeOrder', methods = ['POST'])
def place_order():
    order_data = fakeOrderData#request.json.get('order_data')
    scheduled_time = fakeOrderTime#request.json.get('scheduled_time')
    ##relays order and generates response
    response = relay_order(order_data, scheduled_time)
    return jsonify(response)

    

    