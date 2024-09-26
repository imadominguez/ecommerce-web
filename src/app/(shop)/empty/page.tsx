import { Metadata } from 'next';
import { ShoppingCartIcon } from 'lucide-react';
import { Title } from '@/components/title';
import { CustomLinkButton } from '@/components/button/link-to-shop';

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
        <Title title="Tu carrito está vacío" />
      </div>

      <CustomLinkButton href={'/products'} className={'mt-6'}>
        Regresar
      </CustomLinkButton>
    </div>
  );
}
