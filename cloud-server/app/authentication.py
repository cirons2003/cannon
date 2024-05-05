from extensions import login_manager, db
from models import User
from flask import Blueprint
from flask_jwt_extended import create_access_token

memberAuth_bp = Blueprint('memberAuth', __name__)

@auth_bp.route('/login')
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email = email).first()
    if user is None: 
        return jsonify({'message': 'no user found with specified email'}), 404 

    allowed = user.check_password(password)
    if not allowed:
        return jsonify({'message':'invalid credentials'}), 401
    
    access_token = create_access_token(identity = user.user_id)
    return jsonify({'message': 'login successful', 'access_token': access_token}), 200



