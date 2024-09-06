export interface Product {
  title: string;
  description: string;
  price: number;
  color?: string[];
  inStock: number;
  tags: string;
  images: string[];
  inDiscount: boolean;
  discount?: number;
  isActive: boolean;
  isFeatured: boolean;
  brandId: string;
  categoryId: string;
}

export interface CartProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  color: string;
  image: string;
  quantity: number;
}
