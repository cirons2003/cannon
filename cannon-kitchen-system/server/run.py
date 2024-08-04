from app import create_app
from app.extensions import sio
import signal
import sys

def signal_handler(sig, frame):
    print('closing connection...')
    sio.disconnect()
    sys.exit(0)

if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    app = create_app()
    sio.connect('https://cannon-server.onrender.com')
    sio.wait()