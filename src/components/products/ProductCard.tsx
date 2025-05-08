
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <CardContent className="p-0 relative">
          {product.isNew && (
            <Badge className="absolute top-4 left-4 z-10 bg-brand hover:bg-brand">
              New
            </Badge>
          )}
          {product.discount > 0 && (
            <Badge className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600">
              -{product.discount}%
            </Badge>
          )}
          <div className="h-56 overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              size="sm"
              className="mr-2 bg-white text-foreground hover:bg-gray-100"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-current"
                  fill={i < product.rating ? "currentColor" : "none"}
                  strokeWidth={i < product.rating ? 0 : 2}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              ({product.reviewCount} reviews)
            </span>
          </div>
          <h3 className="font-medium text-base mb-1 group-hover:text-brand transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center">
            {product.salePrice ? (
              <>
                <span className="font-bold text-brand">${product.salePrice}</span>
                <span className="text-muted-foreground line-through ml-2">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="font-bold">${product.price}</span>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
