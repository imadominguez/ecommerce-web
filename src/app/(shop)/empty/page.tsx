import { Metadata } from 'next';
import { ShoppingCartIcon } from 'lucide-react';
import { Title } from '@/components/title';
import { CustomLinkButton } from '@/components/button/custom-link-button';
import { PageContainer } from '@/components/layout/page-container';

export const metadata: Metadata = {
  title: 'Carrito Vacío',
  description:
    'Tu carrito en Servicios Integrados está vacío. ¡Explora nuestra amplia selección de productos y comienza a agregar artículos emocionantes a tu carrito de compras hoy mismo!',
  keywords:
    'Carrito Vacío, Servicios Integrados, Compras en línea, Explorar Productos',
};

export default function EmptyPage() {
  return (
    <PageContainer className="flex max-w-sm flex-col items-center justify-center">
      <ShoppingCartIcon size={40} className="mx-5" />
      <div className="mt-2 flex flex-col items-center">
        <Title title="Tu carrito está vacío" />
      </div>

      <CustomLinkButton href={'/products'} className={'mt-6'}>
        Regresar
      </CustomLinkButton>
    </PageContainer>
  );
}
