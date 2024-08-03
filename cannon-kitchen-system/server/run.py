from app import create_app
from app.extensions import sio, printer
import time

if __name__ == '__main__':
    sio.connect('https://cannon-server.onrender.com')
    sio.wait()  