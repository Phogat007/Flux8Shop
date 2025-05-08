
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, Truck } from "lucide-react";

const OrderSummary = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  // For demo purposes, we'll use a static order
  // In a real app, this would be fetched from an API using the orderId parameter
  const order = {
    id: orderId || "ORD-12345",
    date: "May 5, 2025",
    status: "Confirmed",
    paymentMethod: "Visa •••• 4242",
    paymentStatus: "Paid",
    shippingMethod: "Standard Shipping",
    trackingNumber: "TRK9876543210",
    estimatedDelivery: "May 10, 2025",
    items: [
      {
        id: 1,
        name: "Wireless Noise-Canceling Headphones",
        price: 249.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Premium Fitness Tracker",
        price: 129.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b4?q=80&w=100&auto=format&fit=crop",
      }
    ],
    subtotal: 379.98,
    shipping: 9.99,
    tax: 30.40,
    total: 420.37,
    shippingAddress: {
      name: "John Doe",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
    },
    billingAddress: {
      name: "John Doe",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
    }
  };

  return (
    <Layout>
      {/* Confirmation header */}
      <section className="bg-brand/10 py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand/20 mb-6">
            <CheckCircle className="h-10 w-10 text-brand" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl mb-2">Thank you for your purchase</p>
          <p className="text-muted-foreground">
            Order #{order.id} • Placed on {order.date}
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to={`/account`}>View Order History</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Order details section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Order summary */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Order Details</span>
                    <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">{order.status}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Order items */}
                    <div>
                      <h3 className="font-medium mb-4">Items</h3>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${item.price.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Order totals */}
                    <div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>${order.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>${order.tax.toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium text-lg">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" /> 
                    <span>Shipping Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Shipping Method</h3>
                        <p className="text-muted-foreground">{order.shippingMethod}</p>
                        <p className="mt-1">Estimated Delivery: {order.estimatedDelivery}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Tracking</h3>
                        <p className="text-muted-foreground">Tracking Number: {order.trackingNumber}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Track Package
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Shipping Address</h3>
                        <div className="text-muted-foreground">
                          <p>{order.shippingAddress.name}</p>
                          <p>{order.shippingAddress.line1}</p>
                          {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Billing Address</h3>
                        <div className="text-muted-foreground">
                          <p>{order.billingAddress.name}</p>
                          <p>{order.billingAddress.line1}</p>
                          {order.billingAddress.line2 && <p>{order.billingAddress.line2}</p>}
                          <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}</p>
                          <p>{order.billingAddress.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment info and help */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Payment Method</h3>
                      <p className="text-muted-foreground">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Payment Status</h3>
                      <p className="text-green-600">{order.paymentStatus}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    If you have any questions or issues with your order, our customer service team is here to help.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OrderSummary;
