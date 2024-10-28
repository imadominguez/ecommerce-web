import { getOrders } from '@/actions/orders/get-orders';
import { auth } from '@/auth';
import { CustomLinkButton } from '@/components/button/custom-link-button';
import { PageContainer } from '@/components/layout/page-container';
import { ProductImage } from '@/components/product/product-image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { dateFormat } from '@/utils/dateFormat';
import { Search } from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Mis ordenes',
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session) {
    redirect('/login?redirect=/orders');
  }
  const { ok, orders } = await getOrders();

  if (!ok && !orders) {
    <p>No hay ordenes</p>;
  }
  return (
    <PageContainer>
      <h1 className="mb-4 text-2xl font-bold">Ordenes</h1>

      <div className="mb-4 flex items-center space-x-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Buscar"
            className="w-full py-2 pl-10 pr-4"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            size={20}
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="delivered">Entregadas</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-500">
          {orders.length} {orders.length > 1 ? 'Commpras' : 'Compra'}
        </span>
      </div>

      {orders &&
        orders.map((order) => (
          <Accordion
            type="single"
            collapsible
            className="mb-4 rounded-lg border p-4"
            key={order.id}
          >
            <AccordionItem
              value={`purchase-${order.id}`}
              className="border-none"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="text-sm text-gray-500">
                  {dateFormat(order.createdAt)}
                </span>
                <div className="text-right">
                  {order.isPaid ? (
                    <Badge variant="stock">Entregado</Badge>
                  ) : (
                    <Badge variant="warning">Pendiente</Badge>
                  )}
                </div>
              </div>
              <div className="mb-4 flex space-x-4">
                <ProductImage
                  width={80}
                  height={80}
                  src={order.OrderItem[0].product.images[0]}
                  alt={order.OrderItem[0].product.slug}
                  className="h-20 w-20 rounded object-cover"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">
                    {order.OrderItem[0].product.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {order.OrderItem[0].quantity}{' '}
                  </p>
                </div>
              </div>
              {order.OrderItem.length > 1 && (
                <AccordionTrigger className="pt-0">
                  Ver {order.OrderItem.length - 1} producto
                  {order.OrderItem.length > 2 ? 's' : ''} más
                </AccordionTrigger>
              )}
              <AccordionContent>
                {order.OrderItem.slice(1).map(({ product }, index) => (
                  <div
                    key={product.id}
                    className="mt-4 flex space-x-4 border-t pt-4"
                  >
                    <ProductImage
                      width={80}
                      height={80}
                      src={product.images[0]}
                      alt={product.slug}
                      className="h-20 w-20 rounded object-cover"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-sm text-gray-600">
                        {order.OrderItem[index].quantity}{' '}
                      </p>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <Separator />
            <div className="mt-4 flex justify-end space-x-2">
              <CustomLinkButton
                href={`/orders/${order.id}`}
                variant="outline"
                className="w-fit border-blue-600 text-blue-600"
              >
                Ver compra
              </CustomLinkButton>
              <Button variant="outline">Volver a comprar</Button>
            </div>
          </Accordion>
        ))}
    </PageContainer>
  );
}
