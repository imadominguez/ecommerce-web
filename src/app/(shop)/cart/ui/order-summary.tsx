'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { currencyFormat } from '@/utils/currencyFormat';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  // Obtenemos información del carrito de compras desde el store
  const { itemsInCart, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  // Efecto para indicar que el componente ha cargado
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="sticky top-0 lg:col-span-1">
        <div className="rounded-lg bg-muted p-6">
          <h2 className="mb-4 text-lg font-medium">Resumen del pedido</h2>
          <div className="flex justify-between py-2">
            <span className="opacity-80">Subtotal</span>
            <span className="font-medium">Cargando...</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="opacity-80">Estimación de envío</span>
            <span className="font-medium">Cargando...</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="opacity-80">Descuento</span>
            <span className="font-medium">Cargando...</span>
          </div>
          <div className="flex justify-between py-2 font-bold">
            <span>Importe total</span>
            <span>Cargando...</span>
          </div>
          <Button className="mt-6 w-full" size="lg">
            Proceder al pago
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-10 rounded-lg bg-muted p-6">
        <h2 className="mb-4 text-lg font-medium">Resumen del pedido</h2>
        <div className="flex justify-between py-2">
          <span className="opacity-80">Subtotal</span>
          <span className="font-medium">{currencyFormat(subTotal)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="opacity-80">Estimación de envío</span>
          <span className="font-medium">{currencyFormat(0)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="opacity-80">Descuento</span>
          <span className="font-medium">{currencyFormat(0)}</span>
        </div>
        <div className="flex justify-between py-2 font-bold">
          <span>Importe total</span>
          <span>{currencyFormat(subTotal)}</span>
        </div>
        <Link
          href={'/checkout/address'}
          className={buttonVariants({
            className: 'mt-6 w-full',
            size: 'lg',
          })}
        >
          Proceder al pago
        </Link>
      </div>
    </div>
  );
};
