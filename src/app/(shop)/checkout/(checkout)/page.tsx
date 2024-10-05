import { Metadata } from 'next';
import { ProductsInCart } from './ui/ProductsInCart';
import { PageContainer } from '@/components/layout/page-container';
import { Title } from '@/components/title';
import { PlaceOrder } from './ui/PlaceOrder';

export const metadata: Metadata = {
  title: 'Verificar Orden - Teslo | SHOP',
  description:
    'Verifica y ajusta los elementos de tu orden en Teslo SHOP antes de confirmar tu compra. Edita los productos en tu carrito y revisa un resumen detallado antes de proceder al pago.',
  keywords: 'Verificar Orden, Teslo, SHOP, Carrito, Confirmar Compra',
};

export default function CheckoutPage() {
  return (
    <PageContainer>
      <Title title="Verificar Orden" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductsInCart />
        <PlaceOrder />
      </div>
    </PageContainer>
  );
}
