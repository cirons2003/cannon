class OrderCache():
    def __init__(self):
        self.orderIds = set()
        self.numOrders = 0
        
    def addOrder(self, orderId):
        if (orderId in self.orderIds):
            return 
        print(f"Order {orderId} added to cache")
        self.orderIds.add(orderId)
        self.numOrders += 1
    
    def removeOrder(self, orderId):
        if (orderId not in self.orderIds):
            return
        print(f"Order {orderId} removed from cache")
        self.orderIds.remove(orderId)
        self.numOrders -= 1

    def containsOrder(self, orderId): 
        return orderId in self.orderIds