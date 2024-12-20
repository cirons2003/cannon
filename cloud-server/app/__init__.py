from flask import Flask 
from dotenv import load_dotenv
import os 
from .extensions import db, jwt, socketio, migrate, login_manager, mail
from .authentication import memberAuth_bp, adminAuth_bp, error_bp
from flask_cors import CORS
import logging

def create_app():

    #Configure app 
    app = Flask(__name__)
    CORS(app, supports_credentials = True)

    load_dotenv()

    configuration = os.getenv('CONFIGURATION')

    app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY') 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
   
    if configuration == 'development':
        app.config['DEBUG'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI_DEVELOPMENT')
    elif configuration == 'production':
        app.config['DEBUG'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI_PRODUCTION')
        app.config['SESSION_COOKIE_SAMESITE'] = 'None'
        app.config['SESSION_COOKIE_SECURE'] = True
        gunicorn_logger = logging.getLogger("gunicorn.error")
        app.logger.handlers = gunicorn_logger.handlers
        app.logger.setLevel(gunicorn_logger.level)
    else: 
        raise ValueError('Invalid configuration setting')
    
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'carsonirons@gmail.com'
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = ('Cannon Club', 'carsonirons@gmail.com')

    #initialize extensions
    db.init_app(app)
    socketio.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

    ##Integrate authorization endpoints 
    app.register_blueprint(memberAuth_bp, url_prefix = '/memberAuth')
    app.register_blueprint(adminAuth_bp, url_prefix = '/adminAuth')
    app.register_blueprint(error_bp)

    ##import socket functionality 
    from .socket import setup_socket_functionality, order_bp
    setup_socket_functionality()
    app.register_blueprint(order_bp, url_prefix = '/order')

    ##import menu endpoints 
    from .menu import menu_bp
    app.register_blueprint(menu_bp, url_prefix = '/menu')

    ##import user endpoints
    from .user import user_bp
    app.register_blueprint(user_bp, url_prefix = '/user')

    ##register admin endpoints
    from .admin import admin_bp
    app.register_blueprint(admin_bp, url_prefix='/admin')

    #return app object 
    return app
    