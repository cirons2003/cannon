from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(20), index = True, nullable = False)
    last_name = db.Column(db.String(20), index = True, nullable = False)
    email = db.Column(db.String(50), unique = True, index = True, nullable = False)
    password_hash = db.Column(db.String(128), nullable = False)
    profile_picture_url = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class MenuItem(db.Model):
    item_id = db.Column(db.Integer, primary_key = True, auto_increment = True)

