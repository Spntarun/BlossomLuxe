export type ProductCategory = 'indo-western' | 'corsets' | 'festive-wear';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
  description: string;
  fabric: string;
  badges: string[];
  inStock?: boolean;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string; // product id + size + color
  productId: string;
  title: string;
  slug: string;
  price: number;
  mrp: number;
  size: string;
  color: ProductColor;
  image: string;
  quantity: number;
}

export interface FilterState {
  category?: string;
  subcategories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
}

