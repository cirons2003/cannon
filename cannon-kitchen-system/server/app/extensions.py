import socketio 
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from .printer import PrintHandler

sio = socketio.Client()
db = SQLAlchemy()
migrate = Migrate()
printer = PrintHandler("Star TSP143IIILAN Cutter (Copy 1)")