from app import create_app
from app.extensions import sio

app = create_app()

if __name__ == '__main__':
    sio.connect('http://localhost:5000')
    sio.wait()  