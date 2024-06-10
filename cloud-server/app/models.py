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
    placed_orders = db.Column(db.JSON)
    last_k_meals = db.Column(db.JSON)
    suspended = db.Column(db.Boolean, nullable = False, server_default = '0')  

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
    scheduled_time = db.Column(db.DateTime, server_default = 'CURRENT_TIMESTAMP', nullable = False) 
    

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
    start_time = db.Column(db.DateTime, nullable = False) #meal opens
    end_time = db.Column(db.DateTime, nullable = False) #meal closes 
    order_padding = db.Column(db.Integer, nullable = False) #number of minutes before window orders are accepted (can be negative)
    active_menu_id = db.Column(db.Integer, db.ForeignKey('menu.menu_id'))
    active_menu = db.relationship('Menu', backref = 'meals', lazy = True)


    