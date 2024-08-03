import win32print
import win32ui
from win32.lib import win32con

width = 550
def print_hello_world():
    printer_name = "Star TSP143IIILAN Cutter (Copy 1)"
    # Create a device context from a named printer
    hprinter = win32print.OpenPrinter(printer_name)
    try:
        hDC = win32ui.CreateDC()
        hDC.CreatePrinterDC(printer_name)
        hDC.StartDoc("order doc")  # Start a document
        hDC.StartPage()  # Start a page
        
        # Text to print
        hDC.TextOut(100, 100, 'hello world')
        hDC.EndDoc()  # End a document
    finally:
        win32print.ClosePrinter(hprinter)

class PrintHandler(): 
    def __init__(self, printer_name):
        self.printer_name = printer_name

    def print_orders(self, order_list): 
        hprinter = win32print.OpenPrinter(self.printer_name)
        try:
            hdc = win32ui.CreateDC()
            hdc.CreatePrinterDC(self.printer_name)
            receipt_generator = OrderReceiptGenerator(hdc) 
            
            for order in order_list:
                hdc.StartDoc("order")
                hdc.StartPage()
                receipt_generator.generateReceipt(order)
                hdc.EndDoc()
        finally:
            win32print.ClosePrinter(hprinter)

    
    
class OrderReceiptGenerator(): 
    def __init__(self, device_context):
        self.device_context = device_context
        self.current_pixel = 0

        self.pixelWidth = 550
        self.section_spacing = 50
        self.line_spacing = 15
        self.top_margin = 30
        self.bottom_margin = 10
        self.side_margin = 0

    def generateReceipt(self, order):
        self.current_pixel = 0
        self.fontNormal()

        self.appendSpacing(self.top_margin)

        self.appendUserNameSection(order.user_name)

        self.appendHR()

        self.appendOrderNameSection(order.item_name)

        selections = order.selections
        for s in selections:
            self.appendSelection(s)
        self.appendSpacing(2 * self.line_spacing)

        self.appendSpecialRequestSection(order.description)
        self.appendSpacing(self.bottom_margin)

        self.device_context.TextOut(0, self.current_pixel, ".")
        

    def appendOrderIdSection(self, order_id):
        self.append_centered_text(f"order id: {order_id}")
    
    def appendUserNameSection(self, name):
        self.fontLarge()

        self.append_centered_text(name)

    def appendOrderNameSection(self, item_name):
        self.fontBoldLarge()

        self.append_centered_text(item_name)

    def appendSelection(self, selection_name):
        self.fontNormalBold()

        self.append_centered_text(f"-{selection_name}-")

    def appendSpecialRequestSection(self, special_request):
        self.fontNormal()

        self.append_centered_text(f'"{special_request}"')


    def appendSpacing(self, numPixels):
        self.current_pixel += numPixels
    
    def appendHR(self):
        width_allowed = self.pixelWidth - 2 * self.side_margin
        width, _ = self.device_context.GetTextExtent(".")
        numPeriods = int(width_allowed / width)
        for i in range(numPeriods): 
            self.device_context.TextOut(self.side_margin + i * width, self.current_pixel, ".")
        self.nextLine()

    
    def nextLine(self):
        self.current_pixel += self.line_height + self.line_spacing

    def append_centered_text(self, text_to_center: str):
        width_allowed = self.pixelWidth - 2 * self.side_margin

        words = text_to_center.split(" ")

        wordGroups = []
        currGroup = ""
        currWidth = 0
        for w in words:
            wordWidth, _ = self.device_context.GetTextExtent(currGroup + w)
            if currGroup == "":
                currGroup = w
            elif wordWidth < width_allowed:
                currGroup = currGroup + " " + w
            else:
                wordGroups.append(currGroup)
                currGroup = w
                currWidth = self.device_context.GetTextExtent(w)
        if (currGroup != ""):
            wordGroups.append(currGroup)

        for line in wordGroups:
            width, _ = self.device_context.GetTextExtent(line)

            marginSize = int((width_allowed - width) / 2 )
            self.device_context.TextOut(self.side_margin + marginSize, self.current_pixel, line)
            self.nextLine()
    

    def fontNormal(self):
        font = win32ui.CreateFont({
            "name": "Arial",
            "height": 40,
            "weight": win32con.FW_NORMAL,
        })
        self.device_context.SelectObject(font)
        self.line_height = 40

    def fontNormalBold(self):
        font = win32ui.CreateFont({
            "name": "Arial",
            "height": 40,
            "weight": win32con.FW_BOLD,
        })
        self.device_context.SelectObject(font)
        self.line_height = 40

    def fontLarge(self):
        font = win32ui.CreateFont({
            "name": "Arial",
            "height": 65,
            "weight": win32con.FW_MEDIUM,
        })
        self.device_context.SelectObject(font)
        self.line_height = 65
    
    def fontBoldLarge(self):
        font = win32ui.CreateFont({
            "name": "Arial",
            "height": 65,
            "weight": win32con.FW_BOLD,
        })
        self.device_context.SelectObject(font)
        self.line_height = 65

    def fontMedium(self):
        font = win32ui.CreateFont({
            "name": "Arial",
            "height": 50,
            "weight": win32con.FW_MEDIUM,
        })
        self.device_context.SelectObject(font)
        self.line_height = 50
