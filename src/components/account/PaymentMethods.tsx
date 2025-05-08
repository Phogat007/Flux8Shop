
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample payment methods - in a real app, this would come from an API
const paymentMethods = [
  {
    id: 1,
    type: "Credit Card",
    cardBrand: "Visa",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    isDefault: true,
  },
  {
    id: 2,
    type: "Credit Card",
    cardBrand: "Mastercard",
    last4: "5555",
    expiryMonth: "09",
    expiryYear: "2026",
    isDefault: false,
  }
];

const PaymentMethods = () => {
  const { toast } = useToast();

  const handleDeleteCard = (id: number) => {
    // In a real app, this would call an API
    toast({
      title: "Card deleted",
      description: "Your payment method has been removed successfully."
    });
  };

  const handleSetDefault = (id: number) => {
    // In a real app, this would call an API
    toast({
      title: "Default payment updated",
      description: "Your default payment method has been updated."
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your saved payment methods</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Payment Method</DialogTitle>
              <DialogDescription>
                Fill in your card details to add a new payment method.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              toast({
                title: "Payment method added",
                description: "Your new payment method has been added successfully."
              });
            }}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth">Expiry Month</Label>
                    <Input id="expiryMonth" placeholder="MM" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryYear">Expiry Year</Label>
                    <Input id="expiryYear" placeholder="YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="defaultPayment"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="defaultPayment">Set as default payment method</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Payment Method</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div 
              key={method.id} 
              className={`border rounded-lg p-4 ${method.isDefault ? 'border-primary' : ''} relative`}
            >
              {method.isDefault && (
                <span className="absolute top-2 right-2 text-xs bg-primary text-white px-2 py-1 rounded-md">Default</span>
              )}
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gray-100 h-10 w-14 flex items-center justify-center rounded">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {method.cardBrand} •••• {method.last4}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {!method.isDefault && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteCard(method.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
          
          {paymentMethods.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No payment methods</h3>
              <p className="text-muted-foreground mb-4">Add a payment method to make checkout faster.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
