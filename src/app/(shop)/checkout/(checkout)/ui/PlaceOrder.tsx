'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { placeOrder } from '@/actions';
import { useAddressStore } from '@/store/address/address-store';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Copy, Flag, Mail, MapPin, Phone, User } from 'lucide-react';
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
    return (
      <div>
        <Card className="h-[220px] animate-pulse bg-muted">
          <CardContent>&nbsp;</CardContent>
        </Card>
        <Card className="mt-6 h-[314px] animate-pulse bg-muted">
          <CardContent>&nbsp;</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card className="mx-auto max-w-md bg-card text-card-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            Dirección de entrega
          </CardTitle>
          {/* <Button variant="ghost" size="icon" onClick={copyAddress}>
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy address</span>
          </Button> */}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 opacity-70" />
              <span className="text-sm font-medium capitalize">
                {address.firstName} {address.lastName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 opacity-70" />
              <span className="text-sm capitalize">
                {address.street} {address.streetNumber}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Flag className="h-4 w-4 opacity-70" />
              <span className="text-sm capitalize">{address.country}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 opacity-70" />
              <span className="text-sm">CP: {address.postalCode}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 opacity-70" />
              <span className="text-sm">{address.phone}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mx-auto mt-6 max-w-md">
        <CardHeader>
          <CardTitle>Resumen de orden</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Cantidad de productos</span>
              <span>{itemsInCart}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currencyFormat(subTotal)}</span>
            </div>

            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>{currencyFormat(total)}</span>
            </div>
          </div>
          <p className="mt-4 text-xs">
            Al hacer click en &quot;Colocar Orden&quot;, aceptas nuestros
            Términos y Condiciones y política de privacidad
          </p>
          <Button className="mt-4 w-full">Colocar orden</Button>
        </CardContent>
      </Card>
    </div>
  );
};
