import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Heart 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
      setIsLoading(false);
    }, 800);
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-brand opacity-5"></div>
        <div className="absolute bottom-12 -left-12 w-48 h-48 rounded-full bg-brand opacity-5"></div>
      </div>
      
      {/* Pre-footer highlight */}
      <div className="bg-gradient-to-r from-brand/10 via-brand/5 to-brand/10 py-6 border-y border-gray-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Global Shipping</h4>
                <p className="text-xs text-gray-500">Delivery to over 100 countries</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">24/7 Support</h4>
                <p className="text-xs text-gray-500">Call us anytime: (123) 456-7890</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Email Us</h4>
                <p className="text-xs text-gray-500">support@Flux8shop.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer */}
      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/" className="inline-block transform transition-transform hover:scale-105">
              <span className="text-3xl font-bold text-gray-900">
                Flux8<span className="text-brand">Shop</span>
              </span>
            </Link>
            
            <p className="text-gray-600">
              Premium quality products for your lifestyle. Discover the latest trends in fashion, tech, and home decor.
            </p>
            
            <div className="flex space-x-2">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Youtube, label: "Youtube" }
              ].map((social, index) => (
                <Button 
                  key={social.label}
                  variant="outline" 
                  size="icon" 
                  aria-label={social.label}
                  className="rounded-full border-gray-200 bg-white hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <social.Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
          
          {/* Shop column */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-semibold text-lg mb-5 flex items-center text-gray-900">
              <span className="inline-block w-6 h-0.5 bg-brand mr-2"></span>
              Shop
            </h3>
            <ul className="space-y-3">
              {[
                { label: "All Products", path: "/shop" },
                { label: "Fashion", path: "/categories/fashion" },
                { label: "Electronics", path: "/categories/electronics" },
                { label: "Home & Living", path: "/categories/home" },
                { label: "Accessories", path: "/categories/accessories" },
                { label: "All Categories", path: "/categories" }
              ].map((item, index) => (
                <li key={item.path} className="group">
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-brand transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support column */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="font-semibold text-lg mb-5 flex items-center text-gray-900">
              <span className="inline-block w-6 h-0.5 bg-brand mr-2"></span>
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Contact Us", path: "/contact" },
                { label: "FAQs", path: "/faqs" },
                { label: "Shipping & Returns", path: "/shipping" },
                { label: "Terms & Conditions", path: "/terms" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "About Us", path: "/about" }
              ].map((item) => (
                <li key={item.path} className="group">
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-brand transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter column */}
          <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <h3 className="font-semibold text-lg mb-5 flex items-center text-gray-900">
              <span className="inline-block w-6 h-0.5 bg-brand mr-2"></span>
              Newsletter
            </h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transform transition-transform hover:shadow-md">
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter to get updates on our latest offers!
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="bg-gray-50 border-gray-200 pl-10 focus:border-brand focus:ring-brand/30"
                    required
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-brand hover:bg-brand-dark text-white flex items-center justify-center gap-2 group relative overflow-hidden shadow-md shadow-brand/20"
                >
                  <span className="relative z-10">{isLoading ? "Subscribing..." : "Subscribe"}</span>
                  {!isLoading && (
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  )}
                  <span className="absolute inset-0 w-0 bg-brand-dark group-hover:w-full transition-all duration-300"></span>
                </Button>
              </form>
              
              <div className="mt-4 flex items-center justify-center text-xs text-gray-500 gap-1">
                <Heart className="w-3 h-3 text-brand" />
                <span>No spam, we promise!</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-16 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            &copy; {new Date().getFullYear()} Flux8Shop. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-1 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <p>Made with ❤️ By</p>
            <Link to="https://flux8labs.com/" className="hover:text-brand transition-colors duration-300">Flux8labs</Link>
          </div>
        </div>
      </div>

      {/* Keyframes and custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;