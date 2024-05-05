from flask import Flask 
from dotenv import load_dotenv
import os 
from extensions import db, jwt, socketio, migrate
from authentication import memberAuth_bp

configuration = 'development' ##production or development

def create_app():

    #Configure app 
    app = Flask(__name__)

    if configuration == 'development':
        load_dotenv()

    app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY') 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

    if configuration == 'development':
        app.config['DEBUG'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI_DEVELOPMENT')
    elif configuration == 'production':
        app.config['DEBUG'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI_PRODUCTION')
    else: 
        raise ValueError('Invalid configuration setting')

    #initialize extensions
    db.init_app(app)
    socketio.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    ##register route blueprints
    app.register_blueprint(memberAuth_bp, url_prefix = '/memberAuth')

    #return app object 
    return app
    