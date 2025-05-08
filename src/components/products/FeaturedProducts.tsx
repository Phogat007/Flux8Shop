import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ChevronRight} from "lucide-react";

const FeaturedProducts = () => {
  // State for scroll effect
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get 8 featured products
  const featuredProducts = products.filter(product => product.featured).slice(0, 8);

  // Featured categories
  

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-12 md:py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-1/2 -right-1/4 w-full h-full rounded-full bg-brand opacity-5"
          style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.02}px)` }}
        ></div>
        <div 
          className="absolute top-3/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-brand-light opacity-5"
          style={{ transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.02}px)` }}
        ></div>
      </div>

      <div className="container relative z-10">
        {/* Header with animation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-12 h-1 bg-brand"></span>
              <span className="text-sm font-medium text-brand uppercase tracking-wider">Curated Selection</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="relative">
                Featured Products
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C40 2 80 1.5 199 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
                </svg>
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Discover our handpicked selection of trending items and bestsellers that define modern lifestyle.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-5 rounded-lg flex items-center gap-2 group"
            asChild
          >
            <Link to="/shop">
              <span>View All Products</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        {/* Products with animation */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <ProductGrid products={featuredProducts} />
        </div>
        
      </div>
      
      {/* Keyframes and custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;