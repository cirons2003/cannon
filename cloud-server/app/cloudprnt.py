from flask import Blueprint, request, jsonify, send_file, abort
from PIL import Image, ImageDraw, ImageFont
from datetime import datetime
import pytz
import io
import os
from .models import Order
from .extensions import db
from .helpers import expire_if_stale

## Star CloudPRNT endpoint: the printer polls POST every few seconds, GETs the job
## when one is ready, then DELETEs to report whether it printed.

cloudprnt_bp = Blueprint('cloudprnt', __name__)


# printers allowed to pull tickets; more can be added via the CLOUDPRNT_MAC env var (comma separated)
PRINTER_MACS = {'00:11:62:55:13:21'}

def printer_allowed(mac):
    allowed = PRINTER_MACS | {m.strip().lower() for m in os.getenv('CLOUDPRNT_MAC', '').split(',') if m.strip()}
    return (mac or '').strip().lower() in allowed


def get_next_order():
    orders = Order.query.filter(Order.status == 'pending').order_by(Order.order_id).all()
    for o in orders:
        if not expire_if_stale(o):
            return o
    return None


##printer asks "any jobs?"
@cloudprnt_bp.route('', methods = ['POST'])
def poll():
    data = request.get_json(silent = True) or {}
    if not printer_allowed(data.get('printerMAC')):
        abort(403)

    order = get_next_order()
    if order is None:
        return jsonify({'jobReady': False}), 200

    return jsonify({'jobReady': True, 'mediaTypes': ['image/png'], 'jobToken': str(order.order_id)}), 200


##printer downloads the ticket
@cloudprnt_bp.route('', methods = ['GET'])
def get_job():
    if not printer_allowed(request.args.get('mac')):
        abort(403)

    order = Order.query.get(request.args.get('token', type = int))
    if order is None or order.status != 'pending':
        abort(404)

    png = io.BytesIO()
    render_ticket(order).save(png, format = 'PNG')
    png.seek(0)

    response = send_file(png, mimetype = 'image/png')
    response.headers['X-Star-Cut'] = 'full; feed=true'
    return response


##printer reports the result, code starting with 2 means it printed
@cloudprnt_bp.route('', methods = ['DELETE'])
def finish_job():
    if not printer_allowed(request.args.get('mac')):
        abort(403)

    code = request.args.get('code', '')
    order = Order.query.get(request.args.get('token', type = int))
    if order is None:
        return '', 200

    if not code.startswith('2'):
        ##leave it pending so the next poll retries it
        print(f'order {order.order_id} failed to print: {code}')
        return '', 200

    try:
        order.status = 'placed'
        db.session.commit()
        print(f'order {order.order_id} printed')
    except Exception as e:
        db.session.rollback()
        print(f'failed to mark order {order.order_id} printed: {e}')
    return '', 200


## ticket rendering, same layout as the old local print server (80mm paper = 576 dots wide)
WIDTH = 576
SIDE_MARGIN = 12
TOP_MARGIN = 50
BOTTOM_MARGIN = 35
MIN_HEIGHT = 600
LINE_SPACING = 15

NORMAL = 40
LARGE = 65


class TicketRenderer():
    def __init__(self):
        self.image = Image.new('1', (WIDTH, 4000), 1)
        self.draw = ImageDraw.Draw(self.image)
        self.y = TOP_MARGIN

    def text(self, text, size, bold = False):
        font = ImageFont.load_default(size = size)
        stroke = 1 if bold else 0
        for line in self.wrap(text, font, stroke):
            width = self.draw.textlength(line, font = font) + 2 * stroke
            self.draw.text(((WIDTH - width) / 2, self.y), line, font = font, fill = 0, stroke_width = stroke, stroke_fill = 0)
            self.y += size + LINE_SPACING

    def wrap(self, text, font, stroke):
        width_allowed = WIDTH - 2 * SIDE_MARGIN
        lines = []
        for word in text.split():
            candidate = f'{lines[-1]} {word}' if lines else word
            if lines and self.draw.textlength(candidate, font = font) + 2 * stroke <= width_allowed:
                lines[-1] = candidate
            else:
                lines.append(word)
        return lines or ['']

    def hr(self):
        self.draw.line((SIDE_MARGIN, self.y + NORMAL // 2, WIDTH - SIDE_MARGIN, self.y + NORMAL // 2), fill = 0, width = 2)
        self.y += NORMAL + LINE_SPACING

    def finish(self):
        height = max(self.y + BOTTOM_MARGIN, MIN_HEIGHT)
        return self.image.crop((0, 0, WIDTH, height))


def render_ticket(order: Order):
    ticket = TicketRenderer()

    ticket.text(order.user_name, LARGE)
    ticket.text(datetime.now(pytz.timezone('America/New_York')).strftime('%I:%M %p'), NORMAL)
    ticket.hr()
    ticket.text(order.item_name, LARGE, bold = True)
    for s in order.selections:
        ticket.text(f'-{s}-', NORMAL, bold = True)
    ticket.y += 2 * LINE_SPACING
    if order.description:
        ticket.text(f'"{order.description}"', NORMAL)

    return ticket.finish()
