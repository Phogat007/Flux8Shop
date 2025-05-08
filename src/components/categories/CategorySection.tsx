
import React from "react";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop",
    itemCount: 120
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop",
    itemCount: 84
  },
  {
    id: "home",
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1000&auto=format&fit=crop",
    itemCount: 96
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?q=80&w=1000&auto=format&fit=crop",
    itemCount: 72
  }
];

const CategorySection = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
          <div>
            <h2 className="h2 mb-2">Shop by Category</h2>
            <p className="text-muted-foreground max-w-xl">
              Browse our curated collections and find products that match your style and needs.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" asChild>
            <Link to="/categories">All Categories</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              itemCount={category.itemCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
