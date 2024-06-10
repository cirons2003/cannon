from flask import Blueprint, request, jsonify
from flask_login import login_required
from .extensions import db 
from .models import Item, Menu, Meal
from datetime import datetime, timezone

menu_bp = Blueprint('menu', __name__)


@menu_bp.route('/getMealLibrary')
@login_required
def getMealLibrary():
    items = Item.query.all()

    listOfMenuItems = [{
        'item_id': item.item_id, 
        'name': item.name, 
        'description': item.description, 
        'fields': item.fields, 
        'menu_count': len(item.menus)
    } for item in items]

    return jsonify({'message': 'successfully fetched menu items', 'listOfMenuItems': listOfMenuItems}), 200


@menu_bp.route('/addMenuItem', methods = ['POST'])
@login_required
def addMenuItem():
    name = request.json.get('name')
    description = request.json.get('description')
    fields = request.json.get('fields')

    ##validate name 
    if (not name or not isinstance(name, str)):
        return jsonify({'message': 'name is required and must be a string'}), 400
    
    ##validate description if included
    if (not isinstance(description, str)):
        return jsonify({'message': 'description must be a string'}), 400
    
    ##validate fields format if included
    if fields:
        if (not isinstance(fields, list)):
            return jsonify({'message': 'fields must be a list'}), 400
        
        for i in range(len(fields)):
            if (not isinstance(fields[i], dict)):
                return  jsonify({'message': 'elements of fields must be dictionaries'}), 400
            if (not fields[i]['field_name'] or not isinstance(fields[i]['field_name'], str) or 'options' not in fields[i] or not isinstance(fields[i]['options'], list) ):
                return jsonify({'message': 'elements of fields must include a string called field_name and a list called options'}), 400
            for j in range(len(fields[i]['options'])):
                if (not isinstance(fields[i]['options'][j],str)):
                    return jsonify({'message': 'elements of options must be strings'}), 400
        
    ##trim any extra properties from fields 
    formattedFields = []
    for i in range(len(fields)):
        formattedFields.append({'field_name': fields[i]['field_name'], 'options': fields[i]['options']})

    ## add new item to database
    newItem = Item(name = name, description = description, fields = formattedFields)
    try:
        db.session.add(newItem)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message':'failed to add item to database', 'error': str(e)}), 502
    
    ##success message
    return jsonify({'message': 'successfully added item to library!'}), 200 



@menu_bp.route('/editMenuItem', methods = ['POST'])
@login_required
def editMenuItem():
    item_id = request.json.get('itemId')
    name = request.json.get('name')
    description = request.json.get('description')
    fields = request.json.get('fields')

    ##validate item_id
    if (not item_id or not isinstance(item_id, int)):
        return jsonify({'message': 'itemId is required and must be an integer'}), 400
    
    ##check that item exists 
    item = Item.query.filter_by(item_id = item_id).first()
    if item is None:
        return jsonify({'message': 'specified item does not exist'}), 404

    ##validate name 
    if (not name or not isinstance(name, str)):
        return jsonify({'message': 'name is required and must be a string'}), 400
    
    ##validate description if included
    if (not isinstance(description, str)):
        return jsonify({'message': 'description must be a string'}), 400
    
    ##validate fields format if included
    if fields:
        if (not isinstance(fields, list)):
            return jsonify({'message': 'fields must be a list'}), 400
        
        for i in range(len(fields)):
            if (not isinstance(fields[i], dict)):
                return  jsonify({'message': 'elements of fields must be dictionaries'}), 400
            if (not fields[i]['field_name'] or not isinstance(fields[i]['field_name'], str) or not fields[i]['options'] or not isinstance(fields[i]['options'], list)):
                return jsonify({'message': 'elements of fields must include a string called field_name and an list called options'}), 400
            for j in range(len(fields[i]['options'])):
                if (not isinstance(fields[i]['options'][j],str)):
                    return jsonify({'message': 'elements of options must be strings'}), 400
        
    ##trim any extra properties from fields 
    formattedFields = []
    for i in range(len(fields)):
        formattedFields.append({'field_name': fields[i]['field_name'], 'options': fields[i]['options']})

    ## edit item in database
    try:
        item.name = name
        item.description = description
        item.fields = formattedFields
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message':'failed to edit item in database', 'error': str(e)}), 502
    
    ##success message
    return jsonify({'message': 'successfully edited menu item!'}), 200 


    
@menu_bp.route('/removeMenuItem', methods = ['POST'])
@login_required
def removeMenuItem():
    item_id = request.json.get('itemId')
    
    if (not item_id or not isinstance(item_id, int)):
        return jsonify({'message', 'itemId is required and must be an integer'}), 400
    
    item = Item.query.filter_by(item_id = item_id).first()
    if (item is None):
        return jsonify({'message': 'specified item not found'}), 404 
    
    try:
        db.session.delete(item)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message':'failed to remove item from database', 'error': str(e)}), 502
    
    return jsonify({'message': 'successfully removed item from database'}), 200


###FOR MENUS 

@menu_bp.route('/createMenu', methods = ['POST'])
@login_required
def createMenu():
    name = request.json.get('name')

    if (name is None):
        return jsonify({'message':'name is required'})

    menu = Menu.query.filter_by(name = name).first()
    if not menu is None:
        return jsonify({'message': 'name already taken'})
    
    try:
        new_menu = Menu(name = name)
        db.session.add(new_menu)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'failed to add to db', 'error': str(e)}), 502
    
    return jsonify({'message':'successfully created new menu'}), 200


@menu_bp.route('/addItemToMenu', methods = ['POST'])
@login_required
def addItemToMenu():
    item_id = request.json.get('item_id')
    menu_id = request.json.get('menu_id')


    if item_id is None or menu_id is None:
        return jsonify({'message':'item_id and menu_id are required'}), 400
    
    
    item = Item.query.get(item_id)
    if item is None:
        return jsonify({'message': 'item not found'}), 404
    
    menu = Menu.query.get(menu_id)
    if menu is None:
        return jsonify({'message': 'menu not found'}), 404

    try:
        menu.items.append(item)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'failed to add to db', 'error': str(e)}), 502
    
    return jsonify({'message':'successfully added item to menu'}), 200


@menu_bp.route('/removeItemFromMenu', methods = ['POST'])
@login_required
def removeItemFromMenu():
    item_id = request.json.get('item_id')
    menu_id = request.json.get('menu_id')

    if (menu_id is None or item_id is None):
        return jsonify({'message':'item_id and menu_id are required'}), 400
    
    item = Item.query.get(item_id)
    if item is None:
        return jsonify({'message':'item not found'}), 404 
    
    menu = Menu.query.get(menu_id)
    if menu is None: 
        return jsonify({'message':'menu not found'}), 404 
    
    try: 
        menu.items.remove(item)
        db.session.commit()
    except ValueError:
        return jsonify({'message': 'Item not found in menu'}), 404 
    except Exception as e:
        return jsonify({'message': 'failed to remove from db', 'error': str(e)}), 500 
    
    return jsonify({'message': 'successfully removed item from database'}), 200


@menu_bp.route('/getMenus')
@login_required
def getMenus():
    menus = Menu.query.all()
    if menus is None:
        return jsonify({'message': 'couldnt find menus'}), 404 
    
    list_of_menus = [{
        'name': m.name,
        'menu_id': m.menu_id,
        'item_count': len(m.items),
        'items': [{'item_id': i.item_id, 'name': i.name} for i in m.items]
    } for m in menus]

    return jsonify({'message': 'successfully fetched menu items', 'list_of_menus': list_of_menus}), 200  



@menu_bp.route('/removeMenu', methods = ['POST'])
@login_required
def removeMenu():
    menu_id = request.json.get('menu_id')

    if not menu_id:
        return jsonify({'message': 'menu_id is required'}), 400
    
    menu = Menu.query.get(menu_id)
    if menu is None: 
        return jsonify({'message': 'No Menu found'}), 404
    
    try: 
        db.session.delete(menu)
        db.session.commit()
    except Exception as e: 
        db.session.rollback()
        return jsonify({'message': 'failed to remove menu from database', 'error': str(e)}), 500
    
    return jsonify({'message': 'successfully removed menu'}), 200 


@menu_bp.route('/changeMenuName', methods = ['POST'])
@login_required
def changeMenuName():
    menu_id = request.json.get('menu_id')
    name = request.json.get('name')

    if not menu_id or not name:
        return jsonify({'message': 'menu_id and name are required'}), 400
    
    menu = Menu.query.get(menu_id)
    if menu is None: 
        return jsonify({'message': 'No Menu found'}), 404
    
    try: 
        menu.name = name
        db.session.commit()
    except Exception as e: 
        db.session.rollback()
        return jsonify({'message': 'failed to change menu name in database', 'error': str(e)}), 500
    
    return jsonify({'message': 'successfully changed menu name'}), 200 


@menu_bp.route('/changeMenuItems', methods = ['POST'])
@login_required
def changeMenuItems():
    menu_id = request.json.get('menu_id')
    indices = request.json.get('indices')
    print(indices)

    if menu_id is None or indices is None: 
        return jsonify({'message': 'menu_id and indices are required'}), 400 
    
    if not isinstance(indices, list):
        return jsonify({'message': 'indices must be a list'}), 400 
    
    menu = Menu.query.get(menu_id)
    if menu is None:
        return jsonify({'message': 'menu not found'}), 404 
    
    try: 
        itemQuery = [Item.query.get(i) for i in indices]
        menu.items = itemQuery
        db.session.commit()
    except Exception as e: 
        return jsonify({'message': 'failed due to db error or invalid indices', 'error':str(e)}), 500
    
    return jsonify({'message': 'successfully changed items in menu'}), 200 



##Endpoints for meal calendar

@menu_bp.route('/getMealSchedule')
@login_required
def getMealSchedule():
    
    meals = Meal.query.all()

    meal_schedule = [[{
    'meal_id': meal.meal_id,
    'name': meal.name,
    'start_time': meal.start_time,
    'end_time': meal.end_time,
    'order_padding': meal.order_padding,
    'active_menu_present': meal.active_menu is not None,
    'active_menu_name': meal.active_menu.name if meal.active_menu else 'No active menu',
    'active_menu_id': meal.active_menu_id
    } for meal in meals if meal.day_of_week == i] for i in range(7)]

    return jsonify({'message': 'successfully fetched meal schedule', 'meal_schedule': meal_schedule}), 200 


@menu_bp.route('/addMealToSchedule', methods = ['POST'])
@login_required
def addMealToSchedule():
    day_of_the_week = request.json.get('day_of_the_week')
    name = request.json.get('name')
    start_time = request.json.get('start_time')
    end_time = request.json.get('end_time')
    order_padding = request.json.get('order_padding')
    active_menu_id = request.json.get('active_menu_id')

    if day_of_the_week is None or name is None or start_time is None or end_time is None: 
        return jsonify({'message': 'must include mandatory inputs'}), 400
    
    if order_padding is None:
        order_padding = 0

    if not (isinstance(day_of_the_week, int) and isinstance(name, str) and isinstance(order_padding, int) and (active_menu_id is None or isinstance(active_menu_id, int))):
        return jsonify({'message': 'invalid types for int and string inputs '}), 400
    
    start_time = start_time.replace('Z', '+00:00')
    start_datetime = datetime.fromisoformat(start_time) 
    if start_datetime.tzinfo != timezone.utc:
        return jsonify({'message': 'start time should be a utc iso string'}), 400
    
    end_time = end_time.replace('Z', '+00:00')
    end_datetime = datetime.fromisoformat(end_time)
    if end_datetime.tzinfo != timezone.utc:
        return jsonify({'message': 'end time should be a utc iso string'}), 400
    
    if active_menu_id == -1: 
        active_menu_id = None

    try:
        newMeal = Meal(name = name, day_of_week = day_of_the_week, start_time = start_datetime, end_time = end_datetime, order_padding = order_padding, active_menu_id = active_menu_id)
        db.session.add(newMeal) 
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'failed to create new meal in db', 'error': str(e)}), 500 
    
    return jsonify({'message': 'successfully added meal to database'}), 200 
    


@menu_bp.route('/editMealInSchedule', methods = ['POST'])
@login_required
def editMealInSchedule():
    meal_id = request.json.get('meal_id')
    day_of_the_week = request.json.get('day_of_the_week')
    name = request.json.get('name')
    start_time = request.json.get('start_time')
    end_time = request.json.get('end_time')
    order_padding = request.json.get('order_padding')
    active_menu_id = request.json.get('active_menu_id')

    if day_of_the_week is None or name is None or start_time is None or end_time is None: 
        return jsonify({'message': 'must include mandatory inputs'}), 400
    
    if order_padding is None:
        order_padding = 0

    if not isinstance(day_of_the_week, int):
       return jsonify({'message': 'day of week must be an int'}), 400     
    if not isinstance(name, str):
        return jsonify({'message': 'name must be a string'}), 400
    if not isinstance(order_padding, int):
        return jsonify({'message': 'padding must be an int'}), 400
    if not (active_menu_id is None or isinstance(active_menu_id, int)):
        return jsonify({'message': 'menu_id if included must be an int'}), 400
    
    start_time = start_time.replace('Z', '+00:00')
    start_datetime = datetime.fromisoformat(start_time) 
    if start_datetime.tzinfo != timezone.utc:
        return jsonify({'message': 'start time should be a utc iso string'}), 400
    
    end_time = end_time.replace('Z', '+00:00')
    end_datetime = datetime.fromisoformat(end_time)
    if end_datetime.tzinfo != timezone.utc:
        return jsonify({'message': 'end time should be a utc iso string'}), 400
    
    if active_menu_id == -1: 
        active_menu_id = None

    if meal_id is None or not isinstance(meal_id, int):
        return jsonify({'message': 'meal_id is required and must be an int'}), 400

    meal = Meal.query.get(meal_id)
    if meal is None:
        return jsonify({'message': 'could not find specified meal', 'meal_id': meal_id}), 404

    try:
        meal.name = name
        meal.start_time = start_datetime
        meal.end_time = end_datetime
        meal.order_padding = order_padding
        meal.active_menu_id = active_menu_id
        meal.day_of_week = day_of_the_week
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'failed to create new meal in db', 'error': str(e)}), 500 
    
    return jsonify({'message': 'successfully edited meal in database'}), 200 
    

@menu_bp.route('/removeMealFromSchedule', methods = ['POST'])
@login_required
def deleteMealFromSchedule(): 
    meal_id = request.json.get('meal_id') 

    if meal_id is None or not isinstance(meal_id, int): 
        return jsonify({'message': 'meal_id is required and must be an int'}), 400

    meal = Meal.query.get(meal_id)
    if meal is None: 
        return jsonify({'message': 'unable to find meal'}), 404

    try: 
        db.session.delete(meal) 
        db.session.commit() 
    except Exception as e:
        db.session.rollback() 
        return jsonify({'message': 'failed to remove meal from database'}), 500 

    return jsonify({'message': 'successfully removed meal from schedule'}), 200 