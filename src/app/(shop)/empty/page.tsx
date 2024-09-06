import Link from 'next/link';

import { Metadata } from 'next';
import { ShoppingCartIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Carrito Vacío - Teslo | SHOP',
  description:
    'Tu carrito en Teslo SHOP está vacío. ¡Explora nuestra amplia selección de productos y comienza a agregar artículos emocionantes a tu carrito de compras hoy mismo!',
  keywords: 'Carrito Vacío, Teslo, SHOP, Compras en línea, Explorar Productos',
};

export default function EmptyPage() {
  return (
    <div className="mx-auto flex h-[80dvh] w-full max-w-xs flex-col items-center justify-center">
      <ShoppingCartIcon size={40} className="mx-5" />
      <div className="mt-2 flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito esta vacio</h1>
      </div>

      <Link
        href={'/products'}
        className={buttonVariants({
          variant: 'default',
          className: 'mt-6 w-full',
        })}
      >
        Regresar
      </Link>
    </div>
  );
}
