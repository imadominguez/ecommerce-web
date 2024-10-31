'use client';

import { QuantitySelector } from '@/components/product/quantity-selector.product';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import type { CartProduct, Product } from '@/types/product';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const productToCart: CartProduct = {
    id: product.id,
    title: product.title,
    slug: product.slug,
    price: product.price,
    color: product.color || undefined,
    image: product.images[0],
    quantity,
  };
  return (
    <>
      <QuantitySelector
        quantity={quantity}
        quantityTotal={product.inStock}
        onQuantityChange={setQuantity}
      />
      <Button
        variant={'shop'}
        onClick={() => {
          addProductToCart(productToCart, product.inStock);
          toast({
            variant: 'success',
            title: 'Producto agregado',
          });
          setQuantity(1);
        }}
        disabled={productToCart.quantity > product.inStock}
        className="mt-4 uppercase"
      >
        <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al carrito
      </Button>
    </>
  );
};
