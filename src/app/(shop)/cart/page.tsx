import { PageContainer } from '@/components/layout/page-container';
import { Metadata } from 'next';
import { ProdcutsCart } from './ui/products-cart';
import { OrderSummary } from './ui/order-summary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Carrito de compra',
  description:
    'Explora nuestro carrito de compra en Servicios Integrados y agrega más artículos a tu selección. Continúa comprando con facilidad mientras revisas tus productos. ¡Simplifica tu experiencia de compra en línea hoy mismo!',
  keywords:
    'Servicios Integrados, administrador, ordenes, carrito de compra, compras en línea',
};

export default function CartPage() {
  return (
    <PageContainer>
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>Carrito de compras</CardTitle>
        </CardHeader>

        {/* Products in cart */}
        <ProdcutsCart />
        <CardContent className="h-full flex-1">
          {/* Order summary */}
          <OrderSummary />
        </CardContent>
      </Card>
      {/* <ConsultaEnvio /> */}
    </PageContainer>
  );
}
