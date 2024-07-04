from app import create_app
from app.extensions import sio

if __name__ == '__main__':
    app = create_app()
    sio.connect('https://cannon-server.onrender.com')
    sio.wait()  