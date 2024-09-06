import { PageContainer } from '@/components/layout/page-container';
import { Metadata } from 'next';
import { ProdcutsCart } from './ui/products-cart';
import { OrderSummary } from './ui/order-summary';

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
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Products in cart */}
        <ProdcutsCart />
        {/* Order summary */}
        <OrderSummary />
      </div>
    </PageContainer>
  );
}
