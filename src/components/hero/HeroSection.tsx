import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag, Star, Clock, TrendingUp, ArrowRight, Check } from "lucide-react";

// Import product images - adjust these paths according to your project structure
import WatchImage from "/1.jpg";
import SunglassesImage from "/2.jpg";
import WalletImage from "/3.png";

const HeroSection = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [animateCards, setAnimateCards] = useState(false);
  const heroRef = useRef(null);
  
  // Features data
  const features = [
    { 
      icon: <ShoppingBag className="w-5 h-5" />, 
      title: "Premium Quality", 
      description: "Crafted with the finest materials" 
    },
    { 
      icon: <Clock className="w-5 h-5" />, 
      title: "Limited Edition", 
      description: "Exclusive designs for a limited time" 
    },
    { 
      icon: <TrendingUp className="w-5 h-5" />, 
      title: "Trending Styles", 
      description: "Stay ahead with curated collections" 
    }
  ];
  
  // Products data
  const products = [
    { 
      id: 1, 
      name: "Minimalist Watch", 
      price: "$299", 
      discount: "$399",
      image: WatchImage,
      color: "bg-amber-500"
    },
    { 
      id: 2, 
      name: "Premium Sunglasses", 
      price: "$129", 
      discount: "$159",
      image: SunglassesImage,
      color: "bg-indigo-500"
    },
    { 
      id: 3, 
      name: "Designer Wallet", 
      price: "$89", 
      discount: "$119",
      image: WalletImage,
      color: "bg-emerald-500"
    }
  ];

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroElement = heroRef.current;
      
      if (heroElement) {
        const children = heroElement.querySelectorAll('.parallax-element');
        children.forEach((child, index) => {
          const speed = 0.1 + (index * 0.05);
          child.style.transform = `translateY(${scrollY * speed}px)`;
        });
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Initialize animations after component mounts
  useEffect(() => {
    setTimeout(() => {
      setAnimateCards(true);
    }, 500);
  }, []);
  
  // Auto-rotate products
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <section ref={heroRef} className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="parallax-element absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand/30 blur-3xl"></div>
          <div className="parallax-element absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand/20 blur-3xl"></div>
          <div className="parallax-element absolute top-3/4 left-1/2 w-48 h-48 rounded-full bg-amber-500/20 blur-3xl"></div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/80 to-transparent"></div>
      </div>

      {/* Diagonal split design with animated gradient border */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-50 clip-diagonal hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="absolute inset-0 animate-pulse-slow opacity-30">
          <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-b from-transparent via-brand/30 to-transparent blur-sm"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-10 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left side - Content */}
            <div className="flex flex-col justify-center space-y-8 z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
                New Collection Available
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="block">Discover Your</span>
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-brand">Perfect Style</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-brand/20 rounded-sm transform -rotate-1"></span>
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-md">
                Curated collection of modern lifestyle products designed to enhance your everyday experiences and express your unique personality.
              </p>
              
              {/* Features list with animated appearance */}
              <div className="space-y-4 pt-4">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${0.3 + index * 0.2}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center text-brand">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{feature.title}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-gray-500 text-sm">{feature.description}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA buttons with hover effects */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                <Button 
                  size="lg" 
                  className="bg-brand hover:bg-brand-dark text-white px-8 py-6 rounded-xl flex items-center gap-2 group shadow-lg hover:shadow-xl hover:shadow-brand/20 transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => window.location.href = '/shop'}
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-200 text-gray-700 hover:border-brand hover:text-brand px-8 py-6 rounded-xl transition-all duration-300"
                  onClick={() => window.location.href = '/about'}
                >
                  Learn More
                </Button>
              </div>
              
              {/* Social proof */}
              <div className="flex items-center space-x-4 pt-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-gradient-to-br from-gray-100 to-gray-300"
                      style={{ zIndex: 5 - i }}
                    ></div>
                  ))}
                </div>
                <div>
                  <div className="font-medium">2,500+ Reviews</div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="ml-1 text-xs text-gray-500">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Product showcase */}
            <div className="relative flex items-center justify-center h-full min-h-[400px] z-10">
              {/* 3D Product Carousel */}
              <div className="relative w-full h-full perspective">
                {products.map((product, index) => {
                  const isActive = index === activeProduct;
                  const previousActive = (index === ((activeProduct - 1 + products.length) % products.length));
                  const nextActive = (index === ((activeProduct + 1) % products.length));
                  
                  let positionClass = "opacity-0 scale-90";
                  let zIndex = 0;
                  let translateX = "0%";
                  
                  if (isActive) {
                    positionClass = "opacity-100 scale-100 z-30";
                    zIndex = 30;
                    translateX = "0%";
                  } else if (previousActive) {
                    positionClass = "opacity-70 scale-90 z-20";
                    zIndex = 20;
                    translateX = "-40%";
                  } else if (nextActive) {
                    positionClass = "opacity-70 scale-90 z-20";
                    zIndex = 20;
                    translateX = "40%";
                  }
                  
                  return (
                    <div 
                      key={product.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${animateCards ? positionClass : 'opacity-0'}`}
                      style={{ 
                        transform: `translateX(${translateX}) ${isActive ? 'rotateY(0deg)' : 'rotateY(10deg)'}`,
                        zIndex 
                      }}
                      onClick={() => setActiveProduct(index)}
                    >
                      <div className={`relative w-full h-full flex items-center justify-center ${isActive ? 'cursor-default' : 'cursor-pointer'}`}>
                        {/* Product card */}
                        <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
                          {/* Background circle */}
                          <div className={`absolute inset-0 rounded-full ${product.color} opacity-20 transform -translate-x-6 -translate-y-6`}></div>
                          
                          {/* Product image */}
                          <div className="absolute inset-0 rounded-xl bg-white shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300">
                            <div className="w-full h-full p-6 flex items-center justify-center">
                              <img 
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          </div>
                          
                          {/* Product info card */}
                          <div className="absolute -bottom-12 -right-12 bg-white rounded-xl shadow-xl p-4 w-48 animate-float">
                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                            <div className="flex items-center mt-1">
                              <span className="text-lg font-bold text-brand">{product.price}</span>
                              <span className="ml-2 text-sm text-gray-400 line-through">{product.discount}</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex">
                                {[1, 2, 3].map((i) => (
                                  <div 
                                    key={i}
                                    className={`w-3 h-3 rounded-full ${i-1 === index ? 'bg-brand' : 'bg-gray-200'} mr-1`}
                                  ></div>
                                ))}
                              </div>
                              <button className="w-8 h-8 rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white flex items-center justify-center transition-colors duration-300">
                                <ShoppingBag className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Decorative elements */}
                        {isActive && (
                          <>
                            <div className="absolute top-0 left-0 animate-ping-slow">
                              <div className="w-4 h-4 rounded-full bg-brand/30"></div>
                            </div>
                            <div className="absolute bottom-12 right-12 animate-ping-slow" style={{ animationDelay: '1s' }}>
                              <div className="w-6 h-6 rounded-full bg-amber-400/30"></div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Sale badge */}
              <div className="absolute top-0 right-0 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="bg-white rounded-xl shadow-lg py-3 px-5 flex items-center space-x-2 transform -rotate-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-brand">
                    <span className="text-white font-bold text-xs">%</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Up to</div>
                    <div className="text-xl font-bold text-brand">30% OFF</div>
                  </div>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeProduct ? 'w-8 bg-brand' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveProduct(index)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom styles */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .perspective {
          perspective: 1000px;
        }
        
        .clip-diagonal {
          clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;