
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, ShoppingCart, Heart, Share, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import { products } from "@/data/products";
import ProductGrid from "@/components/products/ProductGrid";
import { Product } from "@/types";
import NotFound from "./NotFound";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct || null);
    
    if (foundProduct) {
      // Reset selections when product changes
      setQuantity(1);
      setSelectedSize(foundProduct.sizes?.[0]);
      setSelectedColor(foundProduct.colors?.[0]);
      setSelectedImage(0);
      
      // Find related products in the same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.sizes && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    if (product.colors && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    addItem({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!product) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
              <img
                src={product.images ? product.images[selectedImage] : product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                  -{product.discount}% OFF
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                      selectedImage === index ? "border-brand" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-amber-500 mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                    fill={i < product.rating ? "currentColor" : "none"}
                    strokeWidth={i < product.rating ? 0 : 2}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mb-6">
              {product.salePrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-brand mr-3">${product.salePrice}</span>
                  <span className="text-xl text-muted-foreground line-through">${product.price}</span>
                </div>
              ) : (
                <span className="text-2xl font-bold">${product.price}</span>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color ? "ring-2 ring-brand ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color: ${color}`}
                    >
                      {selectedColor === color && (
                        <Check className="h-4 w-4 text-white m-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Size</h3>
                  <Button variant="link" className="text-xs p-0 h-auto">
                    Size Guide
                  </Button>
                </div>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 mx-2 text-center"
                />
                <Button variant="outline" size="icon" onClick={incrementQuantity}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <span className="ml-3 text-sm text-muted-foreground">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="secondary" size="lg" className="flex-1">
                Buy Now
              </Button>
              <Button variant="outline" size="icon" aria-label="Add to Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Share">
                <Share className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Meta */}
            <div className="border-t pt-6 space-y-2">
              <p className="text-sm">
                <span className="font-medium">SKU:</span>{" "}
                <span className="text-muted-foreground">{product.sku}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Category:</span>{" "}
                <Link to={`/categories/${product.category.toLowerCase()}`} className="text-muted-foreground hover:text-brand">
                  {product.category}
                </Link>
              </p>
              <p className="text-sm">
                <span className="font-medium">Tags:</span>{" "}
                {product.tags && product.tags.map((tag, index) => (
                  <span key={tag}>
                    <Link to={`/tag/${tag.toLowerCase()}`} className="text-muted-foreground hover:text-brand">
                      {tag}
                    </Link>
                    {index < product.tags.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="space-y-4">
              <p>
                {product.fullDescription || product.description}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer lacinia dui eu felis eleifend, a congue justo facilisis. Morbi auctor diam in mi condimentum, eget volutpat justo tincidunt. Duis bibendum enim non ante finibus, id commodo urna ullamcorper.
              </p>
              <p>
                Donec vel orci est. Vivamus vel justo ac erat convallis gravida. Proin lobortis, nunc nec imperdiet bibendum, quam mi aliquam nisi, ac efficitur enim leo in dolor.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">10 x 5 x 3 inches</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Weight</h4>
                  <p className="text-sm text-muted-foreground">0.5 kg</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Material</h4>
                  <p className="text-sm text-muted-foreground">Premium Cotton</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Made In</h4>
                  <p className="text-sm text-muted-foreground">Italy</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-8">
              {/* Review Summary */}
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold">{product.rating.toFixed(1)}</div>
                  <div className="flex items-center justify-center text-amber-500 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current"
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        strokeWidth={i < Math.floor(product.rating) ? 0 : 2}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based on {product.reviewCount} reviews
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center">
                      <div className="w-12 text-sm font-medium">{star} stars</div>
                      <div className="w-full h-2 mx-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-amber-500 rounded-full"
                          style={{ width: `${star * 20}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-sm text-right text-muted-foreground">
                        {Math.round((star * 20) / 100 * product.reviewCount)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center md:text-left">
                  <Button>Write a Review</Button>
                </div>
              </div>
              
              {/* Review List */}
              <div className="space-y-8">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border-b pb-8">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">John Doe</h4>
                      <span className="text-sm text-muted-foreground">
                        3 days ago
                      </span>
                    </div>
                    <div className="flex items-center text-amber-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-current"
                          fill={i < 4 + (index % 2) ? "currentColor" : "none"}
                          strokeWidth={i < 4 + (index % 2) ? 0 : 2}
                        />
                      ))}
                    </div>
                    <p className="text-sm mb-3">
                      Excellent product! The quality exceeded my expectations. Very comfortable and durable.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Helpful
                      </Button>
                      <Button variant="ghost" size="sm">
                        Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">You may also like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
