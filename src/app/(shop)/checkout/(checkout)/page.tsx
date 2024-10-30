import { Metadata } from 'next';
import { ProductsInCart } from './ui/ProductsInCart';
import { PageContainer } from '@/components/layout/page-container';
import { Title } from '@/components/title';
import { PlaceOrder } from './ui/PlaceOrder';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Verificar Orden',
  description:
    'Verifica y ajusta los elementos de tu orden en Servicios Integrados antes de confirmar tu compra. Edita los productos en tu carrito y revisa un resumen detallado antes de proceder al pago.',
  keywords: 'Verificar Orden, Servicios Integrados, Carrito, Confirmar Compra',
};

export default async function CheckoutPage() {
  const [shippingPrice] = await db.shippingPrice.findMany();
  return (
    <PageContainer>
      <Title title="Verificar Orden" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductsInCart />
        <PlaceOrder shippingPrice={shippingPrice} />
      </div>
    </PageContainer>
  );
}
