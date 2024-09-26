'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import type { CartProduct, Product } from '@/types/product';
import { ShoppingCart } from 'lucide-react';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const productToCart: CartProduct = {
    id: product.id,
    title: product.title,
    slug: product.slug,
    price: product.price,
    color: product.color || 'black',
    image: product.images[0],
    quantity: 1,
  };
  return (
    <Button
      onClick={() => addProductToCart(productToCart, product.inStock)}
      className="flex-1 uppercase"
    >
      <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al carrito
    </Button>
  );
};
