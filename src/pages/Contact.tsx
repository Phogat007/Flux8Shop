import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingBag, Phone, Mail, Clock, MapPin, ChevronRight } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [activeContact, setActiveContact] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Auto-rotate contact methods
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveContact((prev) => (prev + 1) % contactMethods.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      // Reset the form
      event.target.reset();
      setIsFormSubmitted(false);
    }, 1500);
  };

  // Contact methods data
  const contactMethods = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Store",
      description: "123 Shopping Avenue, San Francisco, CA 94105",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Customer Service: (555) 123-4567\nSales Inquiries: (555) 987-6543",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Customer Support: support@Flux8shop.com\nGeneral Inquiries: info@Flux8shop.com",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      description: "Monday - Friday: 9:00 AM - 8:00 PM\nSaturday - Sunday: 10:00 AM - 6:00 PM",
    }
  ];

  // FAQ items
  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available at checkout for faster delivery."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused, in their original packaging, and in resalable condition. Some restrictions apply to certain categories."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping times vary by destination, typically ranging from 7-21 business days."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also check your order status in your account dashboard."
    },
    {
      question: "Are my payment details secure?",
      answer: "Absolutely! We use industry-standard encryption and secure payment processors to ensure your data is always protected. We never store your full credit card information on our servers."
    }
  ];

  return (
    <Layout>
      {/* Hero section with animated background */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 px-4 overflow-hidden">
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

        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="inline-block w-12 h-1 bg-brand"></span>
              <span className="text-sm font-medium text-brand uppercase tracking-wider">Get in touch</span>
              <span className="inline-block w-12 h-1 bg-brand"></span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact <span className="text-brand relative">Us</span>
              <svg className="absolute -bottom-4 left-1/4 w-1/2 mx-auto" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C40 2 80 1.5 199 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
              </svg>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Have a question, feedback, or need assistance? We're here to help you get the best shopping experience!
            </p>
          </div>
        </div>
      </section>

      {/* Contact information and form section */}
      <section className="py-16 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-3xl font-bold mb-6">
                <span className="relative">
                  Get In Touch
                  <svg className="absolute -bottom-2 left-0 w-2/3" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5C40 2 80 1.5 199 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
                  </svg>
                </span>
              </h2>
              <p className="text-muted-foreground mb-10">
                Our customer support team is available to assist you with any questions or concerns you may have.
                Fill out the form and we'll get back to you as soon as possible.
              </p>

              {/* Rotating contact methods */}
              <div className="relative h-60">
                {contactMethods.map((method, i) => (
                  <div 
                    key={i}
                    className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                      i === activeContact 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}
                  >
                    <div className="p-6 rounded-xl border-2 border-brand/10 bg-white shadow-lg shadow-brand/5 hover:shadow-xl hover:shadow-brand/10 transition-shadow duration-300">
                      <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-6">
                        {method.icon}
                      </div>
                      <h3 className="text-xl font-medium mb-2">{method.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact method selectors */}
              <div className="flex justify-center mt-6 space-x-4">
                {contactMethods.map((_, i) => (
                  <button 
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeContact ? 'bg-brand w-8' : 'bg-gray-300'}`}
                    onClick={() => setActiveContact(i)}
                  ></button>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'youtube'].map((social, index) => (
                    <a 
                      key={index} 
                      href={`https://${social}.com`} 
                      className="w-10 h-10 rounded-full bg-brand/10 hover:bg-brand text-brand hover:text-white flex items-center justify-center transition-colors duration-300"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <Card className="border-0 shadow-xl shadow-brand/10 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-brand/15">
                <div className="h-2 bg-brand w-full"></div>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${isFormSubmitted ? 'opacity-50' : 'opacity-100'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                        <Input 
                          id="firstName" 
                          required 
                          className="border-gray-300 focus:border-brand focus:ring focus:ring-brand/20 transition-all"
                          disabled={isFormSubmitted}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                        <Input 
                          id="lastName" 
                          required 
                          className="border-gray-300 focus:border-brand focus:ring focus:ring-brand/20 transition-all"
                          disabled={isFormSubmitted}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        className="border-gray-300 focus:border-brand focus:ring focus:ring-brand/20 transition-all"
                        disabled={isFormSubmitted}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                      <Input 
                        id="subject" 
                        required 
                        className="border-gray-300 focus:border-brand focus:ring focus:ring-brand/20 transition-all"
                        disabled={isFormSubmitted}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="border-gray-300 focus:border-brand focus:ring focus:ring-brand/20 transition-all resize-none"
                        disabled={isFormSubmitted}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isFormSubmitted}
                      className="w-full py-6 bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/20 flex items-center justify-center gap-2 group"
                    >
                      <span>{isFormSubmitted ? 'Sending Message...' : 'Send Message'}</span>
                      {!isFormSubmitted && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                      {isFormSubmitted && (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-16 px-4 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -bottom-1/2 -left-1/4 w-full h-full rounded-full bg-brand opacity-5"
            style={{ transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.02}px)` }}
          ></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="inline-block w-8 h-1 bg-brand"></span>
              <span className="text-sm font-medium text-brand uppercase tracking-wider">Our Location</span>
              <span className="inline-block w-8 h-1 bg-brand"></span>
            </div>
            <h2 className="text-3xl font-bold">
              <span className="relative">
                Find Us
                <svg className="absolute -bottom-2 left-1/4 w-1/2 mx-auto" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C40 2 80 1.5 199 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
                </svg>
              </span>
            </h2>
          </div>
          
          <div className="h-96 rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-transform duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {/* In a real implementation, you would embed a Google Maps or other map service here */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200 relative">
              <span className="text-gray-500">Interactive map would be displayed here</span>
              
              {/* Decorative map marker */}
              <div className="absolute animate-bounce-slow" style={{ top: '40%', left: '50%' }}>
                <div className="w-16 h-16 -ml-8 -mt-8">
                  <div className="w-8 h-8 mx-auto rounded-full bg-brand shadow-lg"></div>
                  <div className="w-8 h-8 mx-auto -mt-4 rounded-b-full bg-brand transform rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="inline-block w-8 h-1 bg-brand"></span>
              <span className="text-sm font-medium text-brand uppercase tracking-wider">Help Center</span>
              <span className="inline-block w-8 h-1 bg-brand"></span>
            </div>
            <h2 className="text-3xl font-bold">
              <span className="relative">
                Frequently Asked Questions
                <svg className="absolute -bottom-2 left-1/4 w-1/2 mx-auto" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C40 2 80 1.5 199 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
                </svg>
              </span>
            </h2>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-gray-200 mb-4 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left px-6 py-4 hover:bg-gray-50">
                    <span className="text-lg font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for?
            </p>
            <Button 
              className="bg-brand hover:bg-brand-dark text-white px-8 py-6 rounded-lg flex items-center gap-2 group shadow-lg shadow-brand/20 mx-auto"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Contact Customer Support</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
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
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </Layout>
  );
};

export default ContactPage;