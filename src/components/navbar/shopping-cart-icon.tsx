'use client';
import { useCartStore } from '@/store/shopping-cart/shopping-cart.store';
import { ShoppingCartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';

export const ShoppingCart = () => {
  // Obtener el total de elementos en el carrito utilizando el estado global
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  // Estado para rastrear si la página ha cargado
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Marcar como cargado después de que el componente se monta
    setLoaded(true);
  }, []);
  return (
    <Link href={`${totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}`}>
      <div className="relative">
        <ShoppingCartIcon className="h-5 w-5" />
        {loaded && totalItemsInCart > 0 && (
          <Badge
            variant={'default'}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
          >
            {totalItemsInCart}
          </Badge>
        )}
      </div>
    </Link>
  );
};
