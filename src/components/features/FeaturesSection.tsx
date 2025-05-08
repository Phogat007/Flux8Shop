import React, { useState, useEffect } from "react";
import { Truck, ShieldCheck, PackageOpen, CreditCard } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, isActive, onMouseEnter }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
        isActive 
          ? "bg-gradient-to-br from-brand-light to-brand shadow-lg shadow-brand/20 text-white scale-105 z-10" 
          : "bg-white shadow-md hover:shadow-lg"
      }`}
      onMouseEnter={onMouseEnter}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-1/2 -right-1/4 w-full h-full rounded-full ${
          isActive ? "bg-white opacity-10" : "bg-brand opacity-5"
        }`}></div>
      </div>
      
      <div className="p-6 flex flex-col items-center text-center relative z-10 h-full">
        <div className={`w-14 h-14 rounded-lg ${
          isActive ? "bg-white/20" : "bg-brand/10"
        } flex items-center justify-center mb-4 transition-transform duration-500 transform ${
          isActive ? "rotate-12" : ""
        }`}>
          <Icon className={`w-7 h-7 ${isActive ? "text-white" : "text-brand"}`} />
        </div>
        
        <h3 className={`text-lg font-semibold mb-2 ${isActive ? "text-white" : "text-gray-800"}`}>
          {title}
        </h3>
        
        <p className={`text-sm ${isActive ? "text-white/90" : "text-gray-600"}`}>
          {description}
        </p>
        
        {isActive && (
          <div className="absolute -bottom-1 -right-1">
            <div className="w-20 h-20 rounded-full bg-white/10"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Features data
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50. Fast delivery to your doorstep."
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "All payments are processed securely with end-to-end encryption."
    },
    {
      icon: PackageOpen,
      title: "Easy Returns",
      description: "Not satisfied? Return within 30 days for a full refund."
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Multiple payment options including credit cards and digital wallets."
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => 
        prev === null ? 0 : (prev + 1) % features.length
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="relative py-16 md:py-24 border-t overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-brand opacity-5"
          style={{ transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.01}px)` }}
        ></div>
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-brand-light opacity-5"
          style={{ transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.01}px)` }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="inline-block w-12 h-1 bg-brand"></span>
            <span className="text-sm font-medium text-brand uppercase tracking-wider">Why Choose Us</span>
            <span className="inline-block w-12 h-1 bg-brand"></span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shopping Made <span className="text-brand relative">
              Simple
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C20 2 40 1.5 99 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
              </svg>
            </span>
          </h2>
          
          <p className="text-gray-600 max-w-lg mx-auto">
            We're committed to providing the best shopping experience with features designed to make your life easier.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="transform transition-all duration-500 animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transform: `translateY(${scrollY > 100 ? '0' : '20'}px)`,
                opacity: scrollY > 100 ? 1 : 0.5
              }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isActive={activeFeature === index}
                onMouseEnter={() => setActiveFeature(index)}
              />
            </div>
          ))}
        </div>
        
        {/* Feature selector dots */}
        <div className="flex items-center justify-center mt-10 space-x-2">
          {features.map((_, i) => (
            <button 
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeFeature ? 'bg-brand w-6' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setActiveFeature(i)}
            ></button>
          ))}
        </div>
      </div>
      
      {/* Keyframes and custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        :root {
          --brand-color: #3b82f6;
          --brand-light: #60a5fa;
          --brand-dark: #2563eb;
        }
        
        .bg-brand {
          background-color: var(--brand-color);
        }
        
        .bg-brand-light {
          background-color: var(--brand-light);
        }
        
        .text-brand {
          color: var(--brand-color);
        }
        
        .from-brand-light {
          --tw-gradient-from: var(--brand-light);
        }
        
        .to-brand {
          --tw-gradient-to: var(--brand-color);
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;