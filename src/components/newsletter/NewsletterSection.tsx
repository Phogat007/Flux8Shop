import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Gift, Shield, Sparkles, ChevronRight } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { toast } = useToast();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "You've been added to our newsletter.",
      });
      setEmail("");
      setIsLoading(false);
      setIsSubscribed(true);
      
      // Reset subscription success message after delay
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1000);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-1/3 -right-1/4 w-2/3 h-2/3 rounded-full bg-brand opacity-5"
          style={{ transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.01}px)` }}
        ></div>
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-brand-light opacity-5"
          style={{ transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.01}px)` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Top curved line */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-brand/10 text-brand px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Join our community</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Stay Informed with Our Newsletter
            </h2>
            <div className="flex justify-center mb-12">
            <svg className="w-32 h-6" viewBox="0 0 128 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 15C32 5 80 1 127 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
            </svg>
          </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Subscribe to get special offers, free giveaways, and first access to our latest collections.
            </p>
          </div>

          {/* Card with form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12 relative overflow-hidden animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {/* Background decoration */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-brand/5 rounded-full"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-brand/5 rounded-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Left column - Form */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Subscribe Now</h3>
                <p className="text-gray-600 mb-6">Get the latest updates delivered straight to your inbox.</p>
                
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-gray-50 border-gray-200 focus:border-brand focus:ring-brand h-12 pl-4 pr-10 rounded-lg"
                      />
                      <Mail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-brand hover:bg-brand-dark text-white font-medium h-12 px-6 rounded-lg shadow-md shadow-brand/20 flex items-center gap-2 group transition-all duration-300"
                    >
                      <span>{isLoading ? "Subscribing..." : "Subscribe"}</span>
                      {!isLoading && (
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </Button>
                  </div>

                  {isSubscribed && (
                    <div className="text-sm text-brand bg-brand/10 py-2 px-3 rounded-lg flex items-center gap-2 animate-fade-in">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Thank you for subscribing!</span>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    By subscribing you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </div>
              
              {/* Right column - Benefits */}
              <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
                <h4 className="font-medium text-gray-800 mb-4">Benefits</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Exclusive Offers</h5>
                      <p className="text-sm text-gray-600">Early access to sales and promotions</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">New Arrivals</h5>
                      <p className="text-sm text-gray-600">Be first to see our latest products</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">VIP Content</h5>
                      <p className="text-sm text-gray-600">Style guides and curated collections</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {[
              { label: "Subscribers", value: "12K+" },
              { label: "Weekly Updates", value: "1" },
              { label: "Special Offers", value: "24/yr" },
              { label: "Satisfaction", value: "99.8%" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes and custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default NewsletterSection;