from .extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    user_id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(20), nullable = False)
    last_name = db.Column(db.String(20), nullable = False)
    email = db.Column(db.String(50), unique = True, index = True, nullable = False)
    password_hash = db.Column(db.String(255), nullable = False)
    description = db.Column(db.String(500))
    suspended = db.Column(db.Boolean, nullable = False, server_default = '0')  
    orders = db.relationship('Order', back_populates='user', lazy = True, cascade='all, delete-orphan')


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
    user_name = db.Column(db.String(50), nullable = False)
    item_name = db.Column(db.String(50), nullable = False)
    selections = db.Column(db.JSON, nullable=False)
    description = db.Column(db.String(120))
    meal_name = db.Column(db.String(50), nullable = False)
    meal_date = db.Column(db.String(10), nullable = False) ##east coast based date (yyyy-mm-dd)
    status = db.Column(db.String(10)) #pending, placed, printed, expired
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable = False)
    user = db.relationship('User', back_populates='orders')
    

menu_items = db.Table(
    'menu_items', 
    db.Column('menu_id', db.Integer, db.ForeignKey('menu.menu_id', ondelete = 'CASCADE'), primary_key = True),
    db.Column('item_id', db.Integer, db.ForeignKey('item.item_id', ondelete = 'CASCADE'), primary_key = True)
)

class Item(db.Model):
    item_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(30), index = True, unique = True, nullable = False)
    description = db.Column(db.String(200))
    image_url = db.Column(db.String(255))
    fields = db.Column(db.JSON)
    menus = db.relationship('Menu', secondary=menu_items, back_populates='items')

class Menu(db.Model):
    menu_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(30), unique = True, index = True, nullable = False) 
    items = db.relationship('Item', secondary = menu_items, back_populates = 'menus')

class Meal(db.Model):
    meal_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(30), nullable = False)
    day_of_week = db.Column(db.Integer, nullable = False) #0 = sunday, 6 = saturday
    start_time = db.Column(db.String(10), nullable=False) #HH/MM in Princeton local time
    end_time = db.Column(db.String(10), nullable=False) #HH/MM in Princeton local time
    order_padding = db.Column(db.Integer, nullable = False) #number of minutes before window orders are accepted (can be negative)
    active_menu_id = db.Column(db.Integer, db.ForeignKey('menu.menu_id'))
    active_menu = db.relationship('Menu', backref = 'meals', lazy = True)


    