from flask import Blueprint, request, jsonify
from .models import User, Meal, Menu, Item
from flask_jwt_extended import jwt_required, get_jwt_identity
from .extensions import db
from datetime import datetime
import pytz

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
    now = datetime.now(pytz.timezone('America/New_York'))

    now_day = (now.weekday() + 1) % 7
    
    meals = Meal.query.filter_by(day_of_week = now_day).all()
     
    current_meal = None
    for m in meals: 
        start_hour_str, start_min_str = m.start_time.split(':') 
        start_hour = int(start_hour_str)
        start_min = int(start_min_str)
        print(f'meal with minute:{start_min}, hour:{start_hour}')
        end_hour_str, end_min_str = m.end_time.split(':')
        end_hour = int(end_hour_str)
        end_min = int(end_min_str)
        if (now.hour < start_hour or (now.hour == start_hour and now.minute < start_min)):
            continue
        if (now.hour > end_hour or (now.hour == end_hour and now.minute > end_min)):
            continue
        current_meal = m
        break

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

