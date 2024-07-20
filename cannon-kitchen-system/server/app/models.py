from .extensions import db 


class Order(db.Model):
    order_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable = False)
    item_name = db.Column(db.String(50), nullable = False)
    selections = db.Column(db.JSON, nullable=False)
    description = db.Column(db.String(500))