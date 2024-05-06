from .extensions import db 


class Order(db.Model):
    order_id = db.Column(db.Integer, primary_key=True)
    order_data = db.Column(db.JSON)
    scheduled_time = db.Column(db.DateTime) 
    