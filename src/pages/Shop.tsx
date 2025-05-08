import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, ChevronDown, ShoppingBag, Star, TrendingUp, Search } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types";

const categories = ["All", "Fashion", "Electronics", "Home & Living", "Accessories"];

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [animatedElements, setAnimatedElements] = useState(false);

  // Handle scroll effect for parallax and animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger animations on component mount
  useEffect(() => {
    setAnimatedElements(true);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterProducts(e.target.value, selectedCategory, priceRange, sortOption);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchQuery, category, priceRange, sortOption);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    filterProducts(searchQuery, selectedCategory, values, sortOption);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    filterProducts(searchQuery, selectedCategory, priceRange, value);
  };

  const filterProducts = (
    search: string,
    category: string,
    price: number[],
    sort: string
  ) => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || product.category === category) &&
        product.price >= price[0] &&
        product.price <= price[1]
    );

    switch (sort) {
      case "price-low-high":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered = filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        filtered = filtered.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
    }

    setFilteredProducts(filtered);
  };

  // Feature icons matching the hero section styling
  const features = [
    { 
      icon: <ShoppingBag className="w-5 h-5" />, 
      title: "Premium Quality", 
      description: "Crafted with the finest materials" 
    },
    { 
      icon: <Star className="w-5 h-5" />, 
      title: "Customer Favorites", 
      description: "Highly rated by our community" 
    },
    { 
      icon: <TrendingUp className="w-5 h-5" />, 
      title: "Trending Styles", 
      description: "Stay ahead with curated collections" 
    }
  ];

  return (
    <Layout>
      {/* Hero Banner with improved styling */}
      <div className="relative bg-gradient-to-br from-brand to-brand-dark text-white py-20 overflow-hidden">
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

        <div className="container relative">
          <div className={`space-y-6 max-w-2xl transition-all duration-700 ${animatedElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-12 h-1 bg-white opacity-70"></span>
              <span className="text-sm font-medium uppercase tracking-wider">Discover Our Collection</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="relative">
                Shop
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C20 2 40 1.5 99 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white opacity-70" />
                </svg>
              </span> Our Premium Products
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl">
              Discover our collection of premium products designed to elevate your lifestyle and express your unique personality.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-700 delay-${index * 200} ${animatedElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{feature.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop Content */}
      <div className="container py-12 relative">
        {/* Decorative circles */}
        <div className="absolute right-0 -top-20 w-40 h-40 rounded-full bg-brand/5 -z-10"></div>
        <div className="absolute left-1/4 bottom-1/4 w-60 h-60 rounded-full bg-brand/5 -z-10"></div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters for Desktop */}
          <div className={`w-full md:w-1/4 lg:w-1/5 hidden md:block transition-all duration-700 ${animatedElements ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="sticky top-24 space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-medium mb-4 flex items-center text-gray-800">
                  <Search className="w-4 h-4 mr-2 text-brand" />
                  Search
                </h3>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pr-10 border-brand/20 focus:border-brand focus:ring focus:ring-brand/20"
                  />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-medium mb-4 flex items-center text-gray-800">
                  <ShoppingBag className="w-4 h-4 mr-2 text-brand" />
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div 
                      key={category} 
                      className={`flex items-center transition-all duration-500 ${animatedElements ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} 
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="relative">
                        <Checkbox
                          id={category}
                          checked={selectedCategory === category}
                          onCheckedChange={() => handleCategoryChange(category)}
                          className="text-brand border-gray-300 focus:ring-brand"
                        />
                        {selectedCategory === category && (
                          <div className="absolute inset-0 bg-brand/10 rounded-sm scale-150 animate-pulse" style={{ animationDuration: '2s' }}></div>
                        )}
                      </div>
                      <label
                        htmlFor={category}
                        className={`ml-2 text-sm font-medium cursor-pointer transition-colors ${
                          selectedCategory === category ? 'text-brand' : 'text-gray-600'
                        }`}
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-medium mb-4 flex items-center text-gray-800">
                  <TrendingUp className="w-4 h-4 mr-2 text-brand" />
                  Price Range
                </h3>
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="text-brand"
                />
                <div className="flex justify-between mt-4 text-sm font-medium">
                  <span className="bg-brand/10 text-brand px-3 py-1 rounded-full">${priceRange[0]}</span>
                  <span className="bg-brand/10 text-brand px-3 py-1 rounded-full">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm">
                  <Filter className="w-4 h-4 mr-2 text-brand" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-brand">Shop Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product search with these filters.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center text-gray-800">
                      <Search className="w-4 h-4 mr-2 text-brand" />
                      Search
                    </h3>
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="pr-10"
                      />
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 flex items-center text-gray-800">
                      <ShoppingBag className="w-4 h-4 mr-2 text-brand" />
                      Categories
                    </h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <div className="relative">
                            <Checkbox
                              id={`mobile-${category}`}
                              checked={selectedCategory === category}
                              onCheckedChange={() => handleCategoryChange(category)}
                              className="text-brand border-gray-300"
                            />
                            {selectedCategory === category && (
                              <div className="absolute inset-0 bg-brand/10 rounded-sm scale-150 animate-pulse" style={{ animationDuration: '2s' }}></div>
                            )}
                          </div>
                          <label
                            htmlFor={`mobile-${category}`}
                            className={`ml-2 text-sm font-medium cursor-pointer ${
                              selectedCategory === category ? 'text-brand' : 'text-gray-600'
                            }`}
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 flex items-center text-gray-800">
                      <TrendingUp className="w-4 h-4 mr-2 text-brand" />
                      Price Range
                    </h3>
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="text-brand"
                    />
                    <div className="flex justify-between mt-4 text-sm font-medium">
                      <span className="bg-brand/10 text-brand px-3 py-1 rounded-full">${priceRange[0]}</span>
                      <span className="bg-brand/10 text-brand px-3 py-1 rounded-full">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Section */}
          <div className={`w-full md:w-3/4 lg:w-4/5 transition-all duration-700 ${animatedElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Sorting and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4 sm:mb-0">
                Showing <span className="font-medium text-brand">{filteredProducts.length}</span> products
              </p>

              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px] border-gray-200 hover:border-brand/50 focus:border-brand focus:ring focus:ring-brand/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Best Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              {filteredProducts.length > 0 ? (
                <div className="transition-all duration-500">
                  <ProductGrid products={filteredProducts} />
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters or search term.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                      setPriceRange([0, 1000]);
                      setSortOption("featured");
                      setFilteredProducts(products);
                    }}
                    className="bg-brand hover:bg-brand-dark text-white px-6 py-2 rounded-lg shadow-lg shadow-brand/20 transition-transform hover:scale-105"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex">
                  <Button variant="outline" className="mx-1 text-brand border-brand/20 hover:bg-brand/10 hover:text-brand">
                    1
                  </Button>
                  <Button variant="ghost" className="mx-1 text-gray-600 hover:text-brand">
                    2
                  </Button>
                  <Button variant="ghost" className="mx-1 text-gray-600 hover:text-brand">
                    3
                  </Button>
                  <Button variant="ghost" className="mx-1 text-gray-600 hover:text-brand">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Animations and Styling */}
      <style>{`
        :root {
          --brand: #4f46e5;
          --brand-dark: #4338ca;
          --brand-light: #818cf8;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .bg-brand {
          background-color: var(--brand);
        }
        
        .bg-brand-dark {
          background-color: var(--brand-dark);
        }
        
        .bg-brand-light {
          background-color: var(--brand-light);
        }
        
        .text-brand {
          color: var(--brand);
        }
        
        .border-brand {
          border-color: var(--brand);
        }
        
        .hover\:bg-brand-dark:hover {
          background-color: var(--brand-dark);
        }
        
        .shadow-brand\/20 {
          box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.2);
        }
        
        .from-brand {
          --tw-gradient-from: var(--brand);
          --tw-gradient-to: rgba(79, 70, 229, 0);
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
        }
        
        .to-brand-dark {
          --tw-gradient-to: var(--brand-dark);
        }
        
        /* Add animation class names */
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </Layout>
  );
};

export default Shop;