
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { cartItems, removeItem, updateItemQuantity, clearCart } = useCart();
  const { toast } = useToast();

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.salePrice || item.price;
    return total + price * (item.quantity || 1);
  }, 0);

  const shippingCost = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + tax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Invalid coupon code",
      description: "The coupon code you entered is invalid or expired.",
      variant: "destructive",
    });
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-12 md:py-24">
          <div className="text-center max-w-md mx-auto">
            <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-8 text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="mx-auto">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Cart Headers - Desktop only */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b font-medium text-sm">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-6 mt-6">
              {cartItems.map((item) => {
                const price = item.salePrice || item.price;
                const itemTotal = price * (item.quantity || 1);

                return (
                  <div key={item.id} className="grid grid-cols-12 gap-4 py-4 border-b">
                    {/* Product Image & Info */}
                    <div className="col-span-12 md:col-span-6 flex">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden mr-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link to={`/products/${item.id}`} className="font-medium hover:text-brand">
                          {item.name}
                        </Link>
                        {(item.selectedSize || item.selectedColor) && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {item.selectedSize && (
                              <span className="mr-2">Size: {item.selectedSize}</span>
                            )}
                            {item.selectedColor && (
                              <div className="flex items-center">
                                <span className="mr-1">Color:</span>
                                <span
                                  className="inline-block w-3 h-3 rounded-full"
                                  style={{ backgroundColor: item.selectedColor }}
                                ></span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Mobile Price */}
                        <div className="md:hidden mt-2">
                          <span className="font-medium">${price.toFixed(2)}</span>
                        </div>

                        {/* Mobile Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="md:hidden text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-auto mt-2"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    {/* Price - Desktop */}
                    <div className="hidden md:flex col-span-2 items-center justify-center">
                      <span className="font-medium">${price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-12 md:col-span-2 flex items-center md:justify-center">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 rounded-none"
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                          disabled={(item.quantity || 1) <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity || 1}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 rounded-none"
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Mobile Subtotal */}
                      <div className="md:hidden ml-auto">
                        <span className="font-medium">${itemTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Subtotal - Desktop */}
                    <div className="hidden md:flex col-span-2 items-center justify-end">
                      <span className="font-medium">${itemTotal.toFixed(2)}</span>
                    </div>

                    {/* Remove Button - Desktop */}
                    <div className="hidden md:flex items-center justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Actions */}
            <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
              <Button variant="outline" asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>

              <Button variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 border-b pb-3 mb-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <form onSubmit={handleApplyCoupon} className="mb-6">
                <div className="flex gap-2">
                  <Input placeholder="Coupon code" className="flex-1" />
                  <Button type="submit" variant="outline">
                    Apply
                  </Button>
                </div>
              </form>

              <Button className="w-full" size="lg" asChild>
              <Link to="/order-summary">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
