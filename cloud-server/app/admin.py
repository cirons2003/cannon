from flask import Blueprint, jsonify, request
from flask_login import login_required
from .models import User
from .extensions import db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/getMembers')
@login_required
def getMembers(): 
    members = User.query.all()

    if members is None: 
        return jsonify({'message': 'no users found'}), 404

    memberList = [{'member_id': m.user_id, 'first_name': m.first_name, 'last_name': m.last_name, 'email': m.email, 'suspended': m.suspended } for m in members]

    return jsonify({'message': 'successfully grabbed members', 'memberList': memberList}), 200


@admin_bp.route('/addMember', methods = ['POST'])
@login_required
def addMember():
    email = request.json.get('email')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    password = request.json.get('password')

    if email is None or first_name is None or last_name is None or password is None:
        return jsonify({'message': 'Invalid input'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email already in use'}), 409

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
    )
    new_user.set_password(password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()  
        return jsonify({'message': 'Registration failed', 'error': str(e)}), 500

    return jsonify({'message': 'Successfully added member', 'email': new_user.email}), 200


@admin_bp.route('/changePassword', methods = ['POST'])
@login_required 
def changePassword(): 
    new_password = request.json.get('new_password')
    email = request.json.get('email')

    if new_password is None or email is None:
        return jsonify({'message': 'Invalid input'}), 400
    
    user = User.query.filter_by(email = email).first()
    if user is None: 
        return jsonify({'message': 'couldnt find user'}), 404
    
    try:
        user.set_password(new_password)
        db.session.commit()
    except Exception as e: 
        db.session.rollback()
        return jsonify({'message': 'failed to change password', 'error': str(e)}), 500
    
    return jsonify({'message': 'successfuly changed password'}), 200

@admin_bp.route('removeMember', methods=['POST'])
@login_required
def removeMember():
    email = request.json.get('email')
     
    if email is None: 
        return jsonify({'message': 'email required'}), 400 
    
    user = User.query.filter_by(email=email).first()
    if user is None: 
        return jsonify({'message': 'couldngt find user with that email'}), 404
    
    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e: 
        db.session.rollback()
        return jsonify({'message':'failed to remove member'}), 500 

    return jsonify({'message': 'successfully removed member'}), 290