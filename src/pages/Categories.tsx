import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Star, Filter, Search } from "lucide-react";

const categoriesData = [
  {
    id: "fashion",
    name: "Fashion",
    image: "/api/placeholder/600/350",
    description: "Discover the latest trends in clothing, footwear, and accessories for all seasons.",
    itemCount: 120,
    subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Jewelry"]
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "/api/placeholder/600/350",
    description: "Explore cutting-edge gadgets, devices, and accessories for work and entertainment.",
    itemCount: 84,
    subcategories: ["Smartphones", "Laptops", "Audio", "Cameras", "Accessories"]
  },
  {
    id: "home",
    name: "Home & Living",
    image: "/api/placeholder/600/350",
    description: "Transform your space with stylish furniture, decor, and home essentials.",
    itemCount: 96,
    subcategories: ["Furniture", "Decor", "Kitchenware", "Bedding", "Bath"]
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/api/placeholder/600/350",
    description: "Complete your look with the perfect accessories for any occasion.",
    itemCount: 72,
    subcategories: ["Bags", "Watches", "Sunglasses", "Hats", "Belts"]
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    image: "/api/placeholder/600/350",
    description: "Discover premium skincare, makeup, and personal care products.",
    itemCount: 65,
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrance", "Bath & Body"]
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    image: "/api/placeholder/600/350",
    description: "Find the gear you need for your active lifestyle and outdoor adventures.",
    itemCount: 58,
    subcategories: ["Fitness", "Camping", "Team Sports", "Water Sports", "Cycling"]
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "/api/placeholder/600/350",
    description: "Browse fun and educational toys for kids of all ages.",
    itemCount: 43,
    subcategories: ["Action Figures", "Board Games", "Educational Toys", "Outdoor Play", "Puzzles"]
  },
  {
    id: "books",
    name: "Books & Stationery",
    image: "/api/placeholder/600/350",
    description: "Explore a vast collection of books, journals, and stationery supplies.",
    itemCount: 89,
    subcategories: ["Fiction", "Non-Fiction", "Children's Books", "Journals", "Art Supplies"]
  }
];

const featuredCollections = [
  {
    id: "summer",
    name: "Summer Essentials",
    description: "Stay cool with our summer collection",
    image: "/api/placeholder/400/500"
  },
  {
    id: "new-arrivals",
    name: "New Arrivals",
    description: "The latest additions to our catalog",
    image: "/api/placeholder/400/500"
  },
  {
    id: "best-sellers",
    name: "Best Sellers",
    description: "Our most popular products",
    image: "/api/placeholder/400/500"
  }
];

const popularTags = [
  "Trending", "Sale", "New Arrivals", "Eco-Friendly", "Limited Edition", 
  "Best Sellers", "Premium", "Handcrafted", "Exclusive", "Clearance",
  "Gift Ideas", "Organic", "Sustainable", "Luxury", "Budget-Friendly",
  "Top Rated"
];

const CategoriesPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [visibleCategories, setVisibleCategories] = useState([]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Extract the category ID from the element's data attribute
            const categoryId = (entry.target as HTMLElement).dataset.categoryId;
            if (categoryId) {
              setVisibleCategories(prev => [...prev, categoryId]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all category cards
    document.querySelectorAll('.category-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Hero section with animated background */}
      <section className="relative bg-gradient-to-br from-brand/10 to-brand/5 overflow-hidden py-24 px-4">
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
          <div className="inline-flex items-center space-x-2 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="inline-block w-12 h-1 bg-brand"></span>
            <span className="text-sm font-medium text-brand uppercase tracking-wider">Explore Our</span>
            <span className="inline-block w-12 h-1 bg-brand"></span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <span className="text-gray-900">Shop by </span>
            <span className="text-brand relative">
              Category
              <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C40 2 80 1.5 199 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand" />
              </svg>
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
            Explore our extensive range of products across multiple categories.
            Find exactly what you're looking for with ease and elevate your shopping experience.
          </p>
          
          <div className="flex justify-center space-x-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button 
              className="bg-brand hover:bg-brand-dark text-white px-6 flex items-center gap-2 group shadow-lg shadow-brand/20"
              size="lg"
            >
              <Search className="w-4 h-4" />
              <span>Search Products</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 px-6 flex items-center gap-2"
              size="lg"
            >
              <Filter className="w-4 h-4" />
              <span>Filter Categories</span>
            </Button>
          </div>
          
          {/* Floating stats */}
          <div className="absolute transform -translate-x-1/2 animate-float" style={{ animationDelay: "1s" }}>
            <div className="bg-white rounded-xl shadow-lg py-3 px-6 flex items-center space-x-8">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-brand">8</span>
                <span className="text-xs text-gray-500">Categories</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-brand">500+</span>
                <span className="text-xs text-gray-500">Products</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-brand">24/7</span>
                <span className="text-xs text-gray-500">Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories grid with animations */}
      <section className="py-24 px-4 mt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesData.map((category, index) => (
              <Card 
                key={category.id} 
                className={`category-card overflow-hidden transition-all duration-500 hover:shadow-xl group h-full border-0 shadow-lg ${
                  visibleCategories.includes(category.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                data-category-id={category.id}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link to={`/categories/${category.id}`}>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                      <h2 className="text-2xl font-bold mb-1 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">{category.name}</h2>
                      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-sm opacity-90">{category.itemCount} items</span>
                        <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                    
                    {/* Badge indicator */}
                    <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-xs font-medium shadow-md transform -translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-brand">
                      {category.subcategories.length} subcategories
                    </div>
                  </div>
                </Link>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.subcategories.map((subcategory, idx) => (
                      <div 
                        key={idx}
                        className={`${
                          activeCategory === category.id 
                            ? 'bg-brand/10 text-brand' 
                            : 'bg-gray-100 text-gray-700'
                        } text-sm px-3 py-1 rounded-full transition-colors duration-300 hover:bg-brand/20 hover:text-brand`}
                      >
                        {subcategory}
                      </div>
                    ))}
                  </div>
                  <Button 
                    className={`w-full mt-2 transition-all duration-300 ${
                      activeCategory === category.id 
                        ? 'bg-brand text-white hover:bg-brand-dark' 
                        : 'bg-white text-brand border-2 border-brand hover:bg-brand/5'
                    }`}
                  >
                    <Link to={`/categories/${category.id}`} className="flex items-center justify-center w-full">
                      <span>View All {category.name}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured collections with parallax effect */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-10"></div>
        
        {/* Animated background elements */}
        <div 
          className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full bg-brand/5"
          style={{ transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.01}px)` }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-brand/5"
          style={{ transform: `translate(${scrollY * -0.02}px, ${scrollY * 0.01}px)` }}
        ></div>
        
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="inline-block w-8 h-1 bg-brand"></span>
              <span className="text-sm font-medium text-brand uppercase tracking-wider">Curated For You</span>
              <span className="inline-block w-8 h-1 bg-brand"></span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Featured Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collections designed to inspire and elevate your lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <Link key={collection.id} to={`/shop?collection=${collection.id}`}>
                <div 
                  className="group relative h-96 overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${collection.image})`,
                      transform: `translateY(${scrollY * 0.05 * (index + 1)}px)`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {index === 0 && (
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-yellow-400">
                          <Star className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-yellow-400">Featured</span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                    <p className="mb-4 text-white/80">{collection.description}</p>
                    <Button className="bg-white text-brand hover:bg-gray-100 group-hover:shadow-lg transition-all duration-300">
                      <span>Shop Now</span>
                      <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                  
                  {/* Animated overlay */}
                  <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 rounded-2xl transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by tags with animation */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="inline-block w-8 h-1 bg-brand"></span>
            <span className="text-sm font-medium text-brand uppercase tracking-wider">Quick Navigation</span>
            <span className="inline-block w-8 h-1 bg-brand"></span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Browse by Tags</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Find exactly what you're looking for with our popular tags. Each tag represents a curated selection of our most sought-after products.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {popularTags.map((tag, index) => (
              <Link 
                key={index} 
                to={`/shop?tag=${tag.toLowerCase().replace(" ", "-")}`}
                className="animate-fade-in"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <div className="bg-white hover:bg-brand hover:text-white text-gray-700 transition-all duration-300 px-5 py-2 rounded-full text-sm shadow-md hover:shadow-lg border border-gray-200 hover:border-brand transform hover:-translate-y-1">
                  {tag}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with animation */}
      <section className="relative bg-gradient-to-r from-brand to-brand-dark text-white py-20 px-4 overflow-hidden">
        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white opacity-5 animate-pulse"
            style={{ animationDuration: "8s" }}
          ></div>
          <div 
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white opacity-5 animate-pulse"
            style={{ animationDuration: "12s", animationDelay: "2s" }}
          ></div>
        </div>
        
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl opacity-90 mb-8">
            Our customer service team is here to help you find exactly what you need.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-brand hover:bg-gray-100 px-8 py-6 rounded-lg shadow-lg transform transition-transform hover:-translate-y-1" 
            asChild
          >
            <Link to="/contact" className="flex items-center gap-2">
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Keyframes and custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.1); opacity: 0.1; }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </Layout>
  );
};

export default CategoriesPage;