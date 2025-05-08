
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample order data - in a real app, this would come from an API
const orders = [
  {
    id: "ORD-12345",
    date: "May 2, 2025",
    total: 239.97,
    status: "Delivered",
    items: [
      { id: 1, name: "Running Sneakers", price: 129.99, quantity: 1 },
      { id: 2, name: "Wireless Earbuds", price: 109.98, quantity: 1 }
    ]
  },
  {
    id: "ORD-12344",
    date: "April 28, 2025",
    total: 89.99,
    status: "Processing",
    items: [
      { id: 3, name: "Fitness Tracker", price: 89.99, quantity: 1 }
    ]
  },
  {
    id: "ORD-12343",
    date: "April 15, 2025",
    total: 159.98,
    status: "Shipped",
    items: [
      { id: 4, name: "Bluetooth Speaker", price: 79.99, quantity: 2 }
    ]
  }
];

const OrderHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and manage your past orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <Badge variant={order.status === "Delivered" ? "default" : "outline"}>
                      {order.status}
                    </Badge>
                    <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-2">
                  <h4 className="font-medium mb-2 text-sm">Items</h4>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/order-details/${order.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="sm">Track Order</Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-4">Once you place an order, it will appear here.</p>
              <Button asChild>
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
