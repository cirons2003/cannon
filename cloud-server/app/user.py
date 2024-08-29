from flask import Blueprint, request, jsonify
from .models import User, Meal, Menu, Item
from flask_jwt_extended import jwt_required, get_jwt_identity
from .extensions import db, mail
from .helpers import get_active_meal, get_meal_date_now
import os
from flask_mail import Message
import random

user_bp = Blueprint('user', __name__)

@user_bp.route('/secret')
@jwt_required()
def secret():
    return jsonify({'message':'secret message'})    

@user_bp.route('/changeDescription', methods = ['POST'])
@jwt_required()
def changeDescription():
    description = request.json.get('description')
    if description is None: 
        return jsonify({'message': 'description is a required field'}), 403
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None: 
        return jsonify({'message': 'could not decode access token'}), 401
    try: 
        user.description = description
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'failed to update database', 'error_message':str(e)}), 500 
    return jsonify({'message': 'successfully updated description', 'new_description': description}), 200
    
@user_bp.route('/getMenuItems')
@jwt_required()
def getMenuItems():
    current_meal = get_active_meal()

    #FLAGS: -1 means no active meal, 0 means no active menu but yes active meal, 1 means active meal and active menu
    if current_meal is None: 
        return jsonify({'message': 'no meal is active', 'display_message': 'Sorry, no meals are active right now', 'flag': -1}), 200 
    
    sh, sm = current_meal.start_time.split(':')
    eh, em = current_meal.end_time.split(':')
    sh = int(sh)
    eh = int(eh)
    sAmPm = 'AM' if sh % 12 == 0 else 'PM'
    eAmPm = 'AM' if eh % 12 == 0 else 'PM'
    sh = int(sh % 12) if sh % 12 != 0 else 12
    eh = int(eh % 12) if eh % 12 != 0 else 12
    duration_string = f"{sh}:{sm}{sAmPm} - {eh}:{em}{eAmPm}"

    if current_meal.active_menu_id == -1 or current_meal.active_menu_id == None:
        return jsonify({'message': 'no menu is active for this meal', 'active_meal_name': current_meal.name, 'display_message': f'Sorry, {current_meal.name} does not have an active menu', 'duration_string': duration_string, 'flag': 0}), 200 
    
    menu = Menu.query.get(current_meal.active_menu_id)
    if menu is None: 
        return jsonify({'message': 'invalid active menu id', 'active_meal_name': current_meal.name, 'display_message': f'Sorry, {current_meal.name} does not have an active menu', 'duration_string': duration_string, 'flag': 0}), 200 

    menu_items = [{
        'item_id': item.item_id,
        'name': item.name,
        'description': item.description,
        'image_url': item.image_url,
        'fields': item.fields,
    } for item in menu.items]

    return jsonify({'message': 'successfully fetched meals', 'menu_items': menu_items, 'active_meal_name': current_meal.name, 'duration_string': duration_string, 'flag': 1}), 200 


@user_bp.route('/getPastOrders')
@jwt_required()
def getPastOrders(): 
    user = User.query.get(get_jwt_identity())
    if (user is None): 
        return jsonify({'message':'user not found'}), 403

    k = int(os.getenv('NUMBER_OF_PAST_ORDERS'))

    last_k_orders = user.orders[-k:]
    orders_to_remove = user.orders[:-k]

    try:
        active_meal = get_active_meal()
        meal_date = get_meal_date_now()
        
        for o in orders_to_remove:
            db.session.delete(o)

        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f'failed to remove stale orders: {e}')
        return jsonify({'message': f'failed to remove stale orders: {e}'}), 500


    try:
        for o in last_k_orders:
            if o.status == 'pending' and (active_meal is None or o.meal_name != active_meal.name or str(o.meal_date) != str(meal_date)):
                o.status = 'expired'
        db.session.commit()
    except Exception as e: 
        db.session.rollback()
        print(f'failed to update order statuses: {e}')
        return jsonify({'message': f'failed to update order statuses: {e}'}), 500 
                
    last_k_orders.reverse()

    last_k_orders = [{
        'order_id': o.order_id, 
        'item_name': o.item_name, 
        'selections': o.selections, 
        'meal_name': o.meal_name, 
        'status': o.status, 
        'meal_date': o.meal_date
    } for o in last_k_orders]

    return jsonify({'message': 'successfully fetched past orders', 'orders': last_k_orders}), 200 


@user_bp.route('/resetPassword', methods=['POST'])
def resetPassword():
    email = request.json.get('email')
    user = User.query.filter_by(email = email).first()
    if user is None:
        return jsonify({'message':'user not found'}), 404
    try:
        while True:
            temp = '1'
            for i in range(5):
                temp+= str(int(random.random() * 10))
            if User.query.filter_by(password_reset = temp).first() is None:
                break

        user.password_reset = temp
        db.session.commit()
        print(f"sending {temp}")
        msg = Message(
            subject=f"Your temporary password is {temp}",
            recipients=[user.email],
            body=f"You successfully reset your password for Cannon Mobile. Your temporary password is: {temp}. Use this in the app to reset your password! "
        )
        mail.send(msg)
        return jsonify({'message':'successfully reset password'}), 200
    except Exception as e:
        db.session.rollback()
        print(str(e))
        return jsonify({'message': 'failed to reset password'}), 500
    
@user_bp.route('/changePassword', methods=["POST"])
def changePassword():
    temp = request.json.get('temporary_password')
    new_pw = request.json.get('new_password')

    if len(temp) != 6:
        return jsonify({'message':'invalid temporary password (should be 6 digits)'}), 400

    user = User.query.filter_by(password_reset = temp).first()
    if user is None:
        return jsonify({'message':'invalid code'}), 400

    try:
        user.password_reset = ''
        user.set_password(new_pw)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'failed to change password, please try again'})
    return jsonify({'message': f'successfully changed password for {user.email}'})