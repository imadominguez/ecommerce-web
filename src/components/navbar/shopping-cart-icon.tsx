'use client';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { ShoppingCartIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { currencyFormat } from '@/utils/currencyFormat';
import { Separator } from '../ui/separator';

import { useRouter } from 'next/navigation';

export const ShoppingCart = () => {
  // Estado para manejar el componente Sheet abierto/cerrado
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  // Obtener el total de elementos en el carrito utilizando el estado global
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  // Obtener los elementos del carrito utilizando el estado global
  const cartItems = useCartStore((state) => state.cart);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );
  const { subTotal, envio, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  // Estado para rastrear si la página ha cargado
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Marcar como cargado después de que el componente se monta
    setLoaded(true);
  }, []);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size={'sm'} className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
          {loaded && totalItemsInCart > 0 && (
            <Badge
              variant={'default'}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
            >
              {totalItemsInCart}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Carrito de compra
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems.map((item, index) => (
            <>
              <div key={item.id} className="flex items-center space-x-4">
                {/* <ProductImage
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="rounded-md"
              /> */}
                <div className="flex-1">
                  <h3 className="font-base font-semibold">{item.title}</h3>
                  {item.color && (
                    <p className="text-sm uppercase opacity-80">
                      {item.color === 'black' ? 'Negro' : item.color}
                    </p>
                  )}
                  <span className="text-xs">Cantidad {item.quantity}</span>
                </div>
                <div className="flex flex-col items-end justify-between gap-3">
                  <Button
                    variant="destructive"
                    size={'icon'}
                    className="h-auto w-auto p-1"
                    onClick={() => removeProductFromCart(item.id)}
                  >
                    <X className="!h-4 !w-4" />
                  </Button>

                  <span className="font-medium">${item.price.toFixed(2)}</span>
                </div>
              </div>
              {cartItems.length + 1 !== index && <Separator />}
            </>
          ))}
        </div>
        <div className="mt-4 space-y-4">
          {/* <Separator /> */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Subtotal</span>
            <span className="font-medium">{currencyFormat(subTotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Envio</span>
            <span className="font-medium">{currencyFormat(envio)}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="font-medium">Total</span>
            <span className="font-medium">{currencyFormat(total)}</span>
          </div>

          <Button
            onClick={() => {
              setIsOpen(false);
              router.push('/cart');
            }}
            variant="default"
            className="w-full"
          >
            Comprar carrito
          </Button>
          <div className="text-center">
            <Button variant="link" className="text-foreground">
              Continuar Comprando →
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
