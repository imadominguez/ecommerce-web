import { PageContainer } from '@/components/layout/page-container';
import { Metadata } from 'next';
import { ProdcutsCart } from './ui/products-cart';
import { OrderSummary } from './ui/order-summary';
import { Title } from '@/components/title';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Carrito de compra',
  description:
    'Explora nuestro carrito de compra en Teslo SHOP y agrega más artículos a tu selección. Continúa comprando con facilidad mientras revisas tus productos. ¡Simplifica tu experiencia de compra en línea hoy mismo!',
  keywords:
    'Teslo, shop, administrador, ordenes, carrito de compra, compras en línea',
};

export default function CartPage() {
  return (
    <PageContainer>
      <Title title="Carrito de compras" />
      <Card className="mx-auto w-full max-w-lg flex-1">
        {/* Products in cart */}
        <ProdcutsCart />
        <CardContent>
          {/* Order summary */}
          <OrderSummary />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
