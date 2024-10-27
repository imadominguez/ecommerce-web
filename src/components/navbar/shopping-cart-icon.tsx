'use client';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { ChevronRight, ShoppingBag, ShoppingCartIcon, X } from 'lucide-react';
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
import { ScrollArea } from '../ui/scroll-area';

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
  const { subTotal, total } = useCartStore((state) =>
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
      <SheetContent className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Carrito de compra
          </SheetTitle>
        </SheetHeader>
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <ShoppingBag size={16} className="mr-2" />
          {cartItems.length} {cartItems.length === 1 ? 'artículo' : 'artículos'}
        </div>
        <ScrollArea className="mb-6 mt-6 h-[calc(100vh-24rem)] flex-grow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="mb-6 flex items-center justify-between rounded-lg bg-accent/50 p-4"
            >
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.color}</p>
                <p className="text-sm text-muted-foreground">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <div className="flex items-center">
                <p className="mr-4 font-semibold text-foreground">
                  ${(item.price * item.quantity).toLocaleString('es-CO')}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProductFromCart(item.id)}
                  className="text-destructive hover:text-destructive/90"
                >
                  <X size={20} />
                  <span className="sr-only">Eliminar artículo</span>
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="space-y-4">
          {/* <Separator /> */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{currencyFormat(subTotal)}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="text-lg font-semibold">
              {currencyFormat(total)}
            </span>
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
            <Button variant="link" className="w-full text-foreground">
              Continuar Comprando <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
