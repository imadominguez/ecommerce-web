'use client';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { ProductItemCartSkeleton } from '@/components/product/skeleton/product-item-cart.skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { currencyFormat } from '@/utils/currencyFormat';
import { ProductImage } from '@/components/product/product-image';
import { CustomLinkButton } from '@/components/button/custom-link-button';
// Componente para mostrar los productos en el carrito
export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Si el componente no ha cargado aún, mostrar esqueletos de carga
  if (!loaded) {
    return (
      <div className="grid">
        <ProductItemCartSkeleton />
        <ProductItemCartSkeleton />
        <ProductItemCartSkeleton />
      </div>
    );
  }

  // Si no hay productos en el carrito, redirigir a la página vacía
  // if (productsInCart.length === 0) {
  //   redirect('/empty');
  // }

  return (
    <div className="space-y-2">
      <CustomLinkButton href={'/cart'}>Editar carrito</CustomLinkButton>
      {productsInCart.map((product) => (
        <Card key={product.id} className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between space-x-4">
              <ProductImage
                src={product.image}
                alt={product.title}
                width={80}
                height={80}
                className="rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm">Cantidad: {product.quantity}</p>
                {product.color && (
                  <p className="text-sm">Color: {product.color}</p>
                )}
              </div>
              <div className="ml-auto">
                <p className="font-semibold">{currencyFormat(product.price)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
