
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

const CategoryCard = ({ id, name, image, itemCount }: CategoryCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <Link to={`/categories/${id}`}>
        <CardContent className="p-0 relative">
          <div className="h-48 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 text-white">
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-90">{itemCount} items</span>
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CategoryCard;
