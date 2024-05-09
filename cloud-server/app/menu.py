from flask import Blueprint, request
from flask_login import login_required
from .extensions import db 
from .models import Item
from flask import jsonify

menu_bp = Blueprint('menu', __name__)


@menu_bp.route('/getMealLibrary')
@login_required
def getMealLibrary():
    items = Item.query.all()

    listOfMenuItems = [{
        'item_id': item.item_id, 
        'name': item.name, 
        'description': item.description, 
        'fields': item.fields
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