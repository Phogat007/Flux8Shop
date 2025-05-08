
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { ShoppingCart, Trash2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/hooks/use-cart";

// Sample wishlisted products - in a real app, this would come from an API
const wishlistItems: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    description: "Premium headphones with active noise cancellation technology.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop",
    category: "electronics",
    rating: 4.8,
    reviewCount: 125,
    stock: 15,
    featured: true
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support and adjustable height.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1595415663347-087822973257?q=80&w=300&auto=format&fit=crop",
    category: "furniture",
    rating: 4.5,
    reviewCount: 87,
    stock: 8,
    featured: false
  }
];

const Wishlist = () => {
  const { toast } = useToast();
  const { addItem } = useCart();

  const handleRemoveFromWishlist = (productId: string) => {
    // In a real app, this would call an API
    toast({
      title: "Item removed",
      description: "Item has been removed from your wishlist."
    });
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wishlist</CardTitle>
        <CardDescription>Items you've saved for later</CardDescription>
      </CardHeader>
      <CardContent>
        {wishlistItems.length > 0 ? (
          <div className="space-y-6">
            {wishlistItems.map((product) => (
              <div key={product.id} className="flex flex-col sm:flex-row gap-4 border-b pb-6">
                <div className="w-full sm:w-24 h-24">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-medium hover:text-brand transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center text-destructive"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
              <Heart className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-4">
              Items added to your wishlist will appear here.
            </p>
            <Button asChild>
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Wishlist;
