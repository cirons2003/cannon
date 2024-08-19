from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail

db = SQLAlchemy()
jwt = JWTManager()
socketio = SocketIO()
migrate = Migrate()
login_manager = LoginManager()
mail = Mail()
