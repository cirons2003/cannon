from .extensions import login_manager, db
from .models import User, Admin
from flask import Blueprint, jsonify, request, session
from flask_jwt_extended import create_access_token, jwt_required 
from flask_login import login_user, logout_user, login_required
from flask_jwt_extended.exceptions import NoAuthorizationError
from werkzeug.exceptions import Unauthorized, UnprocessableEntity


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
    
    access_token = create_access_token(identity = user.user_id, expires_delta=False)
    return jsonify({'message': 'login successful', 'first_name': user.first_name, 'last_name': user.last_name, 'access_token': access_token, 'description': user.description}), 200

@memberAuth_bp.route('/confirmToken')
@jwt_required()
def confirmToken():
    return jsonify({'message': 'You are logged in!', 'is_logged_in': True}), 200

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


##Error Handling 
error_bp = Blueprint('error', __name__)
@error_bp.errorhandler(NoAuthorizationError)
def handle_no_authorization_error(e):
    return jsonify({"msg": "Missing or invalid token"}), 401

@error_bp.errorhandler(Unauthorized)
def handle_unauthorized(e):
    return jsonify({"msg": "Unauthorized"}), 401

@error_bp.app_errorhandler(UnprocessableEntity)
def handle_unprocessable_entity(e):
    return jsonify({"msg": "Missing or invalid token"}), 401
