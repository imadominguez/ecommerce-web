import { ShoppingCartIcon } from 'lucide-react';
import React from 'react';

export const OrdersEmpty = () => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
      <ShoppingCartIcon className="mb-4 h-16 w-16 text-gray-400" />
      <h2 className="mb-2 text-2xl font-semibold text-gray-700">
        No hay órdenes
      </h2>
      <p className="max-w-md text-gray-500">
        Parece que aún no se han realizado pedidos. Las órdenes aparecerán aquí
        una vez que los clientes comiencen a comprar.
      </p>
    </div>
  );
};
