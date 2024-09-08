'use client';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { ProductItemCartSkeleton } from '@/components/product/skeleton/product-item-cart.skeleton';
import { ProductImage } from '@/components/product/product-image';
import { currencyFormat } from '@/utils/currencyFormat';

// Componente para mostrar los productos en el carrito
export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Si el componente no ha cargado aún, mostrar esqueletos de carga
  if (!loaded) {
    return Array.from({ length: 3 }, (_, i) => (
      <ProductItemCartSkeleton key={i} />
    ));
  }

  // Si no hay productos en el carrito, redirigir a la página vacía
  // if (productsInCart.length === 0) {
  //   redirect('/empty');
  // }

  return (
    <>
      {/* Iterar sobre los productos en el carrito */}
      {productsInCart.map((product) => (
        <div key={`${product.slug}`} className="mb-5 flex">
          {/* Imagen del producto */}
          <ProductImage
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            style={{ width: '100px', height: '100px' }}
            className="mr-5 rounded"
            priority
          />

          <div className="flex flex-1 flex-col justify-between">
            <span className="text-sm font-bold tracking-tighter">
              {product.title}
            </span>
            {/* Precio por unidad */}
            <p className="text-xs font-semibold">
              Cantidad: {product.quantity}
            </p>
            {/* Precio por unidad */}
            <p className="text-xs font-semibold">Color: {product.color}</p>

            {/* Precio total */}
            <p className="text-right text-xs font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
