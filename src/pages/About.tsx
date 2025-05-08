import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, Headphones, Leaf, Users } from "lucide-react";

const AboutPage = () => {
  // State for scroll effect
  const [scrollY, setScrollY] = useState(0);
  const [activeValue, setActiveValue] = useState(0);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Auto-rotate values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Team members data
  const team = [
    {
      name: "Emma Thompson",
      role: "Founder & CEO",
      bio: "With over 15 years of experience in retail, Emma founded Flux8Shop to bring quality products to customers worldwide.",
      image: "https://randomuser.me/api/portraits/women/23.jpg"
    },
    {
      name: "James Wilson",
      role: "Chief Design Officer",
      bio: "James leads our product design team, ensuring every item meets our high quality and aesthetic standards.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Chen",
      role: "Head of Customer Experience",
      bio: "Sarah is passionate about creating exceptional shopping experiences for every customer.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Rodriguez",
      role: "Operations Director",
      bio: "Michael ensures all our logistics run smoothly, from warehousing to delivery, so you get your items fast.",
      image: "https://randomuser.me/api/portraits/men/55.jpg"
    }
  ];

  // Values data with icons
  const values = [
    {
      title: "Quality",
      description: "We never compromise on quality. Every product undergoes rigorous testing and evaluation before making it to our shelves.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Customer Service",
      description: "We believe in creating experiences, not just transactions. Our friendly support team is always ready to help.",
      icon: <Headphones className="w-6 h-6" />
    },
    {
      title: "Sustainability",
      description: "We strive to minimize our environmental impact through eco-friendly packaging and sustainable sourcing practices.",
      icon: <Leaf className="w-6 h-6" />
    }
  ];

  // Partner brands
  const partners = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Adidas_2022_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png"
  ];

  return (
    <Layout>
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-brand to-brand-dark text-white py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-1/2 -right-1/4 w-full h-full rounded-full bg-white opacity-5"
            style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.02}px)` }}
          ></div>
          <div 
            className="absolute top-3/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white opacity-5"
            style={{ transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.02}px)` }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="inline-block w-12 h-1 bg-white"></span>
              <span className="text-sm font-medium text-white uppercase tracking-wider">About Us</span>
              <span className="inline-block w-12 h-1 bg-white"></span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="relative">
                Our Story
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C40 2 80 1.5 199 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg mb-8 text-white/90">
              Founded in 2020, Flux8Shop is dedicated to bringing high-quality, stylish products 
              to our customers while providing exceptional shopping experiences.
            </p>
            
            {/* Floating stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-float" style={{ animationDelay: "0s" }}>
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-sm uppercase tracking-wider">Happy Customers</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-float" style={{ animationDelay: "0.3s" }}>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm uppercase tracking-wider">Premium Products</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-float" style={{ animationDelay: "0.6s" }}>
                <div className="text-3xl font-bold mb-2">30+</div>
                <div className="text-sm uppercase tracking-wider">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-1/3 -right-1/4 w-2/3 h-2/3 rounded-full bg-brand opacity-5"
            style={{ transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.01}px)` }}
          ></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center space-x-2 mb-4">
                <span className="inline-block w-12 h-1 bg-brand"></span>
                <span className="text-sm font-medium text-brand uppercase tracking-wider">Why We Exist</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                At Flux8Shop, we believe everyone deserves access to high-quality products that enhance their everyday life. 
                Our mission is to curate the best selection of items across fashion, technology, home goods, and lifestyle categories, 
                all while maintaining our commitment to quality, sustainability, and customer satisfaction.
              </p>
              
              <p className="text-lg text-gray-700 mb-8">
                Every product in our catalog is carefully selected by our expert team, ensuring it meets our rigorous standards 
                for quality, design, and value. We work directly with manufacturers to bring you premium products at fair prices.
              </p>
              
              <Button 
                className="bg-brand hover:bg-brand-dark text-white px-6 py-2 rounded-lg flex items-center gap-2 group shadow-md shadow-brand/20"
                asChild
              >
                <Link to="/shop">
                  <span>Explore Our Products</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=600&auto=format&fit=crop" 
                  alt="Our mission" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg py-2 px-4 animate-float">
                <div className="text-brand font-medium">Est. 2020</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/2 -left-1/4 w-1/2 h-1/2 rounded-full bg-brand opacity-5"
            style={{ transform: `translate(${scrollY * -0.04}px, ${scrollY * 0.01}px)` }}
          ></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="inline-block w-12 h-1 bg-brand"></span>
              <span className="text-sm font-medium text-brand uppercase tracking-wider">What We Stand For</span>
              <span className="inline-block w-12 h-1 bg-brand"></span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">
              <span className="relative">
                Our Values
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C40 2 80 1.5 199 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
                </svg>
              </span>
            </h2>
            
            <p className="text-lg text-gray-700">
              Our core values guide everything we do, from product selection to customer interactions.
            </p>
          </div>
          
          {/* Value cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-lg animate-fade-in" style={{ animationDelay: `${0.2 + i * 0.2}s` }}>
                <CardContent className="p-0">
                  <div className="h-1 bg-gradient-to-r from-brand to-brand-light"></div>
                  <div className="p-6">
                    <div className="h-16 w-16 mx-auto bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center mb-4">
                      <div className="text-white">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-center">{value.title}</h3>
                    <p className="text-gray-600 text-center">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Interactive value selector */}
          <div className="mt-20 py-8 max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="px-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-gray-800">Our Core Principles</h3>
                <div className="flex space-x-2">
                  {values.map((_, i) => (
                    <button 
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeValue ? 'bg-brand w-6' : 'bg-gray-300'}`}
                      onClick={() => setActiveValue(i)}
                    ></button>
                  ))}
                </div>
              </div>
              
              <div className="relative h-24">
                {values.map((value, i) => (
                  <div 
                    key={i}
                    className={`absolute top-0 left-0 w-full flex items-start space-x-4 transition-all duration-500 ${
                      i === activeValue 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{value.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-20 px-4 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-brand opacity-5"
            style={{ transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.01}px)` }}
          ></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="inline-block w-12 h-1 bg-brand"></span>
              <span className="text-sm font-medium text-brand uppercase tracking-wider">The People Behind</span>
              <span className="inline-block w-12 h-1 bg-brand"></span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">
              <span className="relative">
                Meet Our Team
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C40 2 80 1.5 199 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
                </svg>
              </span>
            </h2>
            
            <p className="text-lg text-gray-700">
              Our passionate team of experts is dedicated to bringing you the best shopping experience possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 animate-fade-in" 
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                <div className="p-6 text-center space-y-4">
                  <div className="relative mx-auto">
                    <div className="h-40 w-40 mx-auto rounded-full overflow-hidden border-4 border-gray-100 shadow-inner">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-brand text-white text-xs py-1 px-3 rounded-full">
                        <Users className="w-3 h-3 inline-block mr-1" />
                        {member.role.includes("Chief") ? "Leadership" : "Team"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h3 className="text-xl font-medium">{member.name}</h3>
                    <p className="text-brand font-medium">{member.role}</p>
                    <div className="w-12 h-1 bg-gray-200 mx-auto my-3"></div>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-1/2 left-1/4 w-1/3 h-1/3 rounded-full bg-brand opacity-5"
            style={{ transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.02}px)` }}
          ></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="inline-block w-12 h-1 bg-brand"></span>
              <span className="text-sm font-medium text-brand uppercase tracking-wider">Trusted By</span>
              <span className="inline-block w-12 h-1 bg-brand"></span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">
              <span className="relative">
                Our Partners
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C40 2 80 1.5 199 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
                </svg>
              </span>
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((logo, index) => (
              <div 
                key={index} 
                className="h-12 max-w-[120px] grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img 
                  src={logo} 
                  alt="Partner brand logo" 
                  className="h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand to-brand-dark text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-1/2 -right-1/4 w-full h-full rounded-full bg-white opacity-5"
            style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.02}px)` }}
          ></div>
          <div 
            className="absolute top-3/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white opacity-5"
            style={{ transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.02}px)` }}
          ></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Ready to Shop with Us?</h2>
            <p className="text-lg mb-8 text-white/90">
              Experience the Flux8Shop difference today with our curated collection of premium products.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-brand hover:bg-gray-100 px-8 py-6 rounded-lg flex items-center gap-2 group shadow-lg" 
                asChild
              >
                <Link to="/shop">
                  <span>Shop Now</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-brand hover:bg-white/10 px-8 py-6 rounded-lg"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
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
    </Layout>
  );
};

export default AboutPage;