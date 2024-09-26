'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { X } from 'lucide-react';
import { ProductImage } from '@/components/product/product-image';
import { QuantitySelector } from '@/components/product/quantity-selector.product';
import { ProductItemCartSkeleton } from '@/components/product/skeleton/product-item-cart.skeleton';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { currencyFormat } from '@/utils/currencyFormat';
import Link from 'next/link';

export const ProdcutsCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  // ?? Si no hay productos en el carrito, redirigimos a la pagina de carrito vacio
  if (productsInCart.length === 0) {
    redirect('/empty');
  }

  const clearCart = useCartStore((state) => state.clearCart);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );
  const updatedProductQuantity = useCartStore(
    (state) => state.updateProductQuantiity
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Si el componente no ha cargado aún, mostrar esqueletos de carga
  if (!loaded) {
    return (
      <div className="lg:col-span-2">
        {Array.from({ length: 3 }, (_, i) => (
          <ProductItemCartSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="scroll overflow-y-scroll pr-4 lg:col-span-2 lg:max-h-[80dvh]">
      {productsInCart.map((item) => (
        <div key={item.id} className="flex border-b py-2 lg:py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 lg:h-32 lg:w-32">
            <ProductImage
              src={item.image}
              alt={item.title}
              width={192}
              height={192}
            />
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium">
                <Link
                  href={`/product/${item.slug}`}
                  className="hover:underline"
                >
                  <h3 className="text-sm">{item.title}</h3>
                </Link>
                <Button
                  type="button"
                  onClick={() => removeProductFromCart(item)}
                  variant="ghost"
                  className="h-fit lg:py-2"
                  size={'icon'}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {item.color && (
                <p className="text-sm uppercase opacity-90">{item.color}</p>
              )}
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <div className="flex items-center">
                <QuantitySelector
                  quantity={item.quantity}
                  onQuantityChange={(value) =>
                    updatedProductQuantity(item, value)
                  }
                />
              </div>

              <p className="ml-4 text-lg">{currencyFormat(item.price)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
