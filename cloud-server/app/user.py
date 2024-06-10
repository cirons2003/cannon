from flask import Blueprint, request, jsonify
from .models import User, Meal, Menu, Item
from flask_jwt_extended import jwt_required, get_jwt_identity
from .extensions import db

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
    user = get_jwt_identity()
    if user is None: 
        return jsonify({'message': 'could not decode access token'}), 401
    try: 
        user.description = description
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'failed to update database'}), 500 
    return jsonify({'message': 'successfully updated description', 'new_description': description}), 200
    