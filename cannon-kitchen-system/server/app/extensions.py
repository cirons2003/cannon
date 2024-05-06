import socketio 
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


sio = socketio.Client()
db = SQLAlchemy()
migrate = Migrate()

