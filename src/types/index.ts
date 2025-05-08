
export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  salePrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags?: string[];
  colors?: string[];
  sizes?: string[];
  sku?: string;
  featured: boolean;
  isNew?: boolean;
  discount?: number;
  selectedSize?: string;
  selectedColor?: string;
}
