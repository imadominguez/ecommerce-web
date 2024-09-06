import { PageContainer } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Metadata } from 'next';
import { ProdcutsCart } from './ui/products-cart';

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
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Products in cart */}
        <ProdcutsCart />
        {/* <div className="lg:col-span-1">
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-lg font-medium text-gray-900">
              Order summary
            </h2>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Shipping estimate</span>
              <span className="font-medium">
                ${shippingEstimate.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Tax estimate</span>
              <span className="font-medium">${taxEstimate.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Order total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
            <Button className="mt-6 w-full" size="lg">
              Checkout
            </Button>
          </div>
        </div> */}
      </div>
    </PageContainer>
  );
}
