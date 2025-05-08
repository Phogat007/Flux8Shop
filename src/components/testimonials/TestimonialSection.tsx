import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Enhanced TestimonialCard component
const TestimonialCard = ({ 
  name, 
  image, 
  role, 
  content, 
  rating, 
  isActive = false,
  style = {}
}) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-xl transition-all duration-500 h-full ${
        isActive 
          ? "bg-white shadow-xl scale-105 z-20" 
          : "bg-white/80 shadow-md"
      }`}
      style={style}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 rounded-full bg-brand opacity-5"></div>
        <div className="absolute -bottom-1/3 -left-1/3 w-1/2 h-1/2 rounded-full bg-brand-light opacity-5"></div>
      </div>
      
      {/* Quote icon */}
      <div className="absolute top-4 right-4 text-brand/10">
        <Quote className="w-12 h-12" />
      </div>
      
      <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="mb-6 flex-grow">
          <p className="text-gray-600 italic">"{content}"</p>
        </div>
        
        {/* Author */}
        <div className="flex items-center mt-auto">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{name}</h4>
            <p className="text-sm text-brand">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Fashion Enthusiast",
      content: "I'm absolutely in love with the quality and style of Flux8Shop products. The attention to detail and customer service is unmatched. Highly recommend their clothing line!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      role: "Tech Blogger",
      content: "Fast shipping, excellent packaging, and the products exceeded my expectations. The electronics I ordered were exactly as described and arrived in perfect condition.",
      rating: 4,
    },
    {
      id: 3,
      name: "Emma Williams",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      role: "Interior Designer",
      content: "Flux8Shop's home collection has transformed my living space. Their items are beautiful, functional, and surprisingly affordable. Will definitely shop here again!",
      rating: 5,
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if section is visible
      const section = document.getElementById('testimonial-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length, isVisible]);
  
  // Navigation handlers
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  // Calculate transform for carousel items on smaller screens
  const getTransformX = (idx) => {
    // For mobile/tablet view
    const distanceFromActive = idx - activeIndex;
    // Make it circular
    if (distanceFromActive > testimonials.length / 2) return (distanceFromActive - testimonials.length) * 110;
    if (distanceFromActive < -testimonials.length / 2) return (distanceFromActive + testimonials.length) * 110;
    return distanceFromActive * 110;
  };

  return (
    <section id="testimonial-section" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-brand opacity-5"
          style={{ transform: `translate(${scrollY * 0.04}px, ${scrollY * -0.02}px)` }}
        ></div>
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-brand-light opacity-5"
          style={{ transform: `translate(${scrollY * -0.04}px, ${scrollY * 0.02}px)` }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transform transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="inline-block w-12 h-1 bg-brand"></span>
            <span className="text-sm font-medium text-brand uppercase tracking-wider">Testimonials</span>
            <span className="inline-block w-12 h-1 bg-brand"></span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-brand relative">
              Customers
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C20 2 40 1.5 99 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
              </svg>
            </span> Say
          </h2>
          
          <p className="text-gray-600">
            Don't just take our word for it. Here's what people who have shopped with us have to say about their experience.
          </p>
        </div>
        
        {/* Desktop View: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8 mt-8">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={testimonial.id}
              className={`transform transition-all duration-1000 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: `${idx * 0.2}s` }}
            >
              <TestimonialCard
                name={testimonial.name}
                image={testimonial.image}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
                isActive={idx === activeIndex}
              />
            </div>
          ))}
        </div>
        
        {/* Mobile/Tablet View: Carousel */}
        <div className="md:hidden relative">
          <div className="relative min-h-[340px]">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={testimonial.id}
                className="absolute top-0 left-1/2 w-full max-w-sm transition-all duration-500"
                style={{ 
                  transform: `translateX(calc(-50% + ${getTransformX(idx)}px))`,
                  opacity: idx === activeIndex ? 1 : (Math.abs(idx - activeIndex) === 1 ? 0.7 : 0.4),
                  zIndex: testimonials.length - Math.abs(idx - activeIndex)
                }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  image={testimonial.image}
                  role={testimonial.role}
                  content={testimonial.content}
                  rating={testimonial.rating}
                  isActive={idx === activeIndex}
                />
              </div>
            ))}
          </div>
          
          {/* Mobile navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-brand hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'bg-brand w-6' : 'bg-gray-300'
                  }`}
                  onClick={() => setActiveIndex(i)}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-brand hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex justify-center mt-12">
          <div className="flex space-x-3">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'bg-brand w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setActiveIndex(i)}
              ></button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Social proof badges - floating */}
      <div className={`absolute bottom-6 right-6 md:bottom-12 md:right-12 animate-float transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
        <div className="bg-white rounded-xl shadow-lg py-3 px-5 flex items-center space-x-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-500 text-xs font-bold">G</div>
            <div className="w-8 h-8 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center text-yellow-700 text-xs font-bold">Y</div>
            <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center text-red-500 text-xs font-bold">T</div>
          </div>
          <div className="text-sm">
            <span className="font-bold">4.9</span> 
            <span className="text-gray-500"> on trusted platforms</span>
          </div>
        </div>
      </div>
      
      {/* Keyframes and custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        :root {
          --brand-color: #3b82f6;
          --brand-light: #60a5fa;
        }
        
        .bg-brand {
          background-color: var(--brand-color);
        }
        
        .text-brand {
          color: var(--brand-color);
        }
        
        .bg-brand-light {
          background-color: var(--brand-light);
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;