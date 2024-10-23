export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  price: number;
  color: Color | null;
  inStock: number;
  tags: string[];
  images: string[];
  inDiscount: boolean;
  discount: number | null;
  isActive: boolean;
  isFeatured: boolean;
  isAvailableOnline: boolean;
  brandId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  color?: string;
  image: string;
  quantity: number;
}

export type Color = 'cyan' | 'yellow' | 'black' | 'magenta';
