'use client';

import { CustomLinkButton } from '@/components/button/custom-link-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { currencyFormat } from '@/utils/currencyFormat';
import React, { useEffect, useState } from 'react';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  // Obtenemos información del carrito de compras desde el store
  const { itemsInCart, subTotal, total, envio } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  // Efecto para indicar que el componente ha cargado
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
     
      <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
      {['Subtotal', 'Envío', 'Descuento', 'Importe total'].map((item, i) => (
        <div key={i} className="flex justify-between items-center mb-2">
          <Skeleton className="h-4 w-1/4 bg-muted animate-pulse" />
          <Skeleton className="h-4 w-1/6 bg-muted animate-pulse" />
        </div>
      ))}
        {/* Checkout button skeleton */}
      <Skeleton className="h-12 w-full mt-6 bg-muted animate-pulse" />
    </div>
     
    );
  }
  return (
    
      <div className=" rounded-lg">
        <h2 className="mb-4 text-lg font-medium">Resumen del pedido</h2>
        <div className="flex justify-between py-2">
          <span className="opacity-80">Subtotal</span>
          <span className="font-medium">{currencyFormat(subTotal)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="opacity-80">Envio</span>
          <span className="font-medium">{currencyFormat(envio)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="opacity-80">Descuento</span>
          <span className="font-medium">{currencyFormat(0)}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-2 font-bold">
          <span>Importe total</span>
          <span>{currencyFormat(subTotal + envio)}</span>
        </div>
        <CustomLinkButton
          href={'/checkout/address'}
          size={'lg'}
          className="mt-6 w-full"
        >
          Proceder al pago
        </CustomLinkButton>
      </div>
 
  );
};
