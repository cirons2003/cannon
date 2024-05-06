from .extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    user_id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(20), nullable = False)
    last_name = db.Column(db.String(20), nullable = False)
    email = db.Column(db.String(50), unique = True, index = True, nullable = False)
    password_hash = db.Column(db.String(255), nullable = False)
    profile_picture_url = db.Column(db.String(256))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    
class Admin(db.Model, UserMixin):
    admin_id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(40), unique = True, nullable = False)
    password_hash = db.Column(db.String(255), nullable = False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def get_id(self):
        return str(self.admin_id)



class Order(db.Model):
    order_id = db.Column(db.Integer, primary_key=True)
    order_data = db.Column(db.JSON)
    scheduled_time = db.Column(db.DateTime) 
    
