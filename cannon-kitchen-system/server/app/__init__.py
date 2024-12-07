from flask import Flask
from dotenv import load_dotenv
import os
#from .extensions import migrate, db   

def create_app():
    load_dotenv()
    
    ##Configure app 
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')
    #app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
    #app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['DEBUG'] = True
    
    ##configure extensions
    #db.init_app(app)
    #migrate.init_app(app, db)
    
    ##integrate socket functionality 
    from .socket import setup_socket_events
    setup_socket_events(app)

    #import schema 
    #from .models import Order

    return app 

    
