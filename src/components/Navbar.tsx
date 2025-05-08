import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu,

  ShoppingCart,
  User,
  X,
  Heart,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur shadow-md supports-[backdrop-filter]:bg-white/60" 
        : "bg-transparent"
    }`}>
      {/* Announcement bar */}
      <div className="hidden md:block w-full bg-brand/10 py-2">
        <div className="container text-center text-sm font-medium text-brand">
          <span className="animate-pulse">Free Shipping on Orders Over $50</span>
        </div>
      </div>
      
      <div className="container flex h-20 items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <div className="relative mr-2">
              <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                <div className="w-5 h-5 rounded-md bg-brand"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand transform origin-center scale-0 group-hover:scale-100 transition-transform"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">
                Flux8<span className="text-brand">Shop</span>
              </span>
              <span className="hidden md:block text-xs uppercase tracking-widest text-gray-500 -mt-1">Lifestyle Collection</span>
            </div>
          </Link>
        </div>
        
        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { path: "/", label: "Home" },
            { path: "/shop", label: "Shop" },
            { path: "/categories", label: "Categories"},
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" }
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`relative text-sm font-medium transition-colors hover:text-brand group ${
                isActive(item.path) 
                  ? 'text-brand' 
                  : scrolled ? 'text-gray-900' : 'text-gray-800'
              }`}
            >
              <div className="flex items-center space-x-1">
                <span>{item.label}</span>
              </div>
              
              {/* Animated underline */}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full ${
                isActive(item.path) ? 'w-full' : ''
              }`}></span>
            </Link>
          ))}
        </nav>

        {/* Utility Navigation */}
        <div className="flex items-center space-x-3">
          
         
          {/* Account */}
          <Link to="/account">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Account"
              className={`hover:bg-brand/10 transition-colors ${
                isActive('/account') ? 'bg-brand/10 text-brand' : ''
              }`}
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          {/* Cart */}
          <Link to="/cart">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Shopping Cart" 
              className={`relative hover:bg-brand/10 transition-colors ${
                isActive('/cart') ? 'bg-brand/10 text-brand' : ''
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-brand text-white animate-pulse-subtle">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMenu} 
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden animate-drawer-right">
          <div className="container h-full flex flex-col">
            <div className="flex items-center justify-between h-20 border-b">
              <Link to="/" className="flex items-center" onClick={toggleMenu}>
                <div className="relative mr-2">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-md bg-brand"></div>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  Flux8<span className="text-brand">Shop</span>
                </span>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu} 
                aria-label="Close Menu"
                className="hover:bg-brand/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-1 mt-6">
              {[
                { path: "/", label: "Home" },
                { path: "/shop", label: "Shop" },
                { path: "/categories", label: "Categories" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
                { path: "/account", label: "My Account" }
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  onClick={toggleMenu} 
                  className={`flex items-center justify-between text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                    isActive(item.path) 
                      ? 'text-brand bg-brand/10' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <span>{item.label}</span>
                  
                </Link>
              ))}
            </nav>
            
            {/* Mobile menu footer */}
            <div className="mt-auto border-t border-gray-100 py-6">
              <div className="flex flex-col space-y-4">
                <div className="text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-6 h-1 bg-brand"></span>
                    <span className="uppercase tracking-wider font-medium text-xs">Customer Service</span>
                  </div>
                  <div className="mt-3 font-medium text-lg text-gray-900">1-800-Flux8SHOP</div>
                </div>
                
                <Button className="bg-brand hover:bg-brand-dark text-white rounded-lg flex items-center gap-2">
                  <span>Shop Now</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Global Animation and Style Definitions */}
      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes drawer-right {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-drawer-right {
          animation: drawer-right 0.3s ease-out forwards;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite;
        }
        
        /* Define brand colors */
        :root {
          --color-brand: #6366f1; /* Adjust to match your hero section color */
          --color-brand-dark: #4f46e5;
          --color-brand-light: #818cf8;
        }
        
        .text-brand { color: var(--color-brand); }
        .bg-brand { background-color: var(--color-brand); }
        .bg-brand-dark { background-color: var(--color-brand-dark); }
        .bg-brand-light { background-color: var(--color-brand-light); }
        .border-brand { border-color: var(--color-brand); }
        .hover\:bg-brand-dark:hover { background-color: var(--color-brand-dark); }
        .hover\:text-brand:hover { color: var(--color-brand); }
        .hover\:bg-brand\/10:hover { background-color: rgb(99 102 241 / 0.1); }
        .bg-brand\/10 { background-color: rgb(99 102 241 / 0.1); }
        .bg-brand\/20 { background-color: rgb(99 102 241 / 0.2); }
      `}</style>
    </header>
  );
};

export default Navbar;