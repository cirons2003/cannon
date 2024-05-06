from .extensions import login_manager, db
from .models import User, Admin
from flask import Blueprint, jsonify, request, session
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import login_user, logout_user, login_required


memberAuth_bp = Blueprint('memberAuth', __name__)
adminAuth_bp = Blueprint('adminAuth', __name__)

##
###MEMBER
##

@memberAuth_bp.route('/login', methods = ['POST'])
def member_login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email = email).first()
    if user is None: 
        return jsonify({'message': 'no user found with specified email'}), 404 

    allowed = user.check_password(password)
    if not allowed:
        return jsonify({'message':'invalid credentials'}), 401
    
    access_token = create_access_token(identity = user.user_id)
    return jsonify({'message': 'login successful', 'email': user.email, 'access_token': access_token}), 200

@memberAuth_bp.route('/register', methods = ['POST'])
def member_register():
    email = request.json.get('email')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    password = request.json.get('password')

    if not email or not first_name or not last_name or not password:
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

    access_token = create_access_token(identity = new_user.user_id)
    return jsonify({'message': 'User registered successfully', 'email': new_user.email, 'access_token': access_token}), 200


@memberAuth_bp.route('/secret')
@jwt_required()
def secret():
    return jsonify({'message':'secret message'})


##
###ADMIN
##


#TODO: REMOVE this route... only for development 
@adminAuth_bp.route('/register', methods=['POST'])
def admin_register():
    username = request.json.get('username')
    password = request.json.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    try:
        admin = Admin.query.filter_by(username=username).first()
        if admin:
            return jsonify({'message': 'Username already taken'}), 409

        new_admin = Admin(username=username)
        new_admin.set_password(password)
        db.session.add(new_admin)
        db.session.commit()
        login_user(new_admin)
        return jsonify({'message': 'Admin registered', 'username': username}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to register admin', 'error': str(e)}), 500


##Handles Admin Logout 
@adminAuth_bp.route('/logout')
@login_required
def admin_logout():
    logout_user()
    return jsonify({'message':'logged out user'}), 200 


##Handles Admin login
@adminAuth_bp.route('/login', methods = ['POST'])
def admin_login():
    username = request.json.get('username')
    password = request.json.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and Password required'}), 400

    user = Admin.query.filter_by(username = username).first()
    if not user: 
        return jsonify({'message':'no user found'}), 404
    
    if user.check_password(password):
        login_user(user)
        return jsonify({'message':'logged in', 'username':username}), 200
    else:
        return jsonify({'message':'Invalid credentials'})

##Provides method to get current_user for admins 
@login_manager.user_loader
def load_user(admin_id):
    return Admin.query.get(admin_id)