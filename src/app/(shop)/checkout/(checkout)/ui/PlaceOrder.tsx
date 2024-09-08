'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { placeOrder } from '@/actions';

import clsx from 'clsx';
import { useAddressStore } from '@/store/address/address-store';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { currencyFormat } from '@/utils/currencyFormat';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const address = useAddressStore((state) => state.address);
  const clearCart = useCartStore((state) => state.clearCart);
  // Obteniendo información del carrito desde el store
  const { itemsInCart, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
        color: product.color,
      };
    });

    //! Server Action
    // const res = await placeOrder(productsToOrder, address);

    // if (!res.ok) {
    //   setIsPlacingOrder(false);
    //   setErrorMessage(res.message);
    //   return;
    // }

    //* Todo salio bien
    setIsPlacingOrder(false);

    // Limpiamos el carrito y redireccionamos al usuario
    clearCart();
    // router.replace('/orders/' + res.order?.id);
  };

  if (loaded === false) {
    return <span className="text-3xl font-bold">Cargando...</span>;
  }

  return (
    <div className="dark:bg-dark-second dark:shadow-dark-second flex flex-col justify-between rounded-xl bg-gray-200 p-7 shadow-lg">
      <h2 className="mb-2 text-lg font-semibold md:text-2xl">
        Direccion de entrega
      </h2>
      <div className="mb-5 flex flex-col text-sm">
        <p className="">
          {address.firstName} {address.lastName}
        </p>
        <span>{address.address}</span>
        <span>{address.address2}</span>
        <span>{address.country}</span>
        <span>CP: {address.postalCode}</span>
        <span>{address.phone}</span>
      </div>

      {/* Divider */}

      <div className="mb-5 h-0.5 w-full rounded bg-gray-200" />

      <h2 className="mb-2 text-lg font-semibold">Resumen de orden</h2>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <span>No Productos</span>
        {/* Cantidad de productos en el carrito */}
        <span className="text-right">
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        {/* Subtotal de la orden */}
        <span className="text-right font-semibold">
          {currencyFormat(subTotal)}
        </span>

        {/* <span>Impuestos {'15%'}</span> */}
        {/* Impuestos aplicados a la orden */}
        {/* <span className="text-right font-semibold">{currencyFormat(tax)}</span> */}

        <span className="mt-5">Total: </span>
        {/* Total de la orden */}
        <span className="mt-5 text-right font-semibold">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mb-2 mt-5 w-full">
        <p className="mb-5 mt-5 text-pretty text-xs">
          {/* Disclaimer */}
          Al hacer click en Colocar Orden, aceptas nuestros{' '}
          <a href="" className="underline">
            Terminos y Condiciones
          </a>{' '}
          y{' '}
          <a href="" className="underline">
            politica de privacidad
          </a>
        </p>
        <p className="text-red-500">{errorMessage}</p>
        <button
          // href={'/orders/123'}
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          className={clsx('flex w-full justify-center', {
            'btn-disable': isPlacingOrder,
            'btn-primary': !isPlacingOrder,
          })}
        >
          {isPlacingOrder ? 'Colocando orden' : 'Colocar orden'}
        </button>
      </div>
    </div>
  );
};
