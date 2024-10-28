import { getOrderById } from '@/actions/orders/get-order-by-id';
import { PageContainer } from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { currencyFormat } from '@/utils/currencyFormat';
import { dateFormat } from '@/utils/dateFormat';
import { Calendar, Mail, Package, Truck, User } from 'lucide-react';

import { redirect } from 'next/navigation';
import { ButtonMp } from './component/button-mp';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderConfirmation({ params: { id } }: Props) {
  const { user, OrderAddress, OrderItem, order } = await getOrderById(id);

  if (!order) {
    redirect('/orders');
  }

  const isPaid = order.isPaid;
  return (
    <PageContainer
      className={`flex min-h-screen w-full max-w-none items-center justify-center p-4 transition-colors duration-300`}
    >
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="space-y-1 bg-muted/80">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Orden #{order.id.slice(0, 8)}
            </CardTitle>
            <Badge variant={isPaid ? 'stock' : 'warning'}>
              {isPaid ? 'Pago realizado' : 'Pendiente de pago'}
            </Badge>
          </div>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {dateFormat(order.createdAt)}
          </p>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <div>
            <h3 className="mb-2 flex items-center gap-2 font-semibold">
              <Package className="h-5 w-5" />
              Detalles de la orden
            </h3>
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {OrderItem.map((product, i) => (
                  <TableRow
                    className={cn('', {
                      'bg-muted/80': i % 2 !== 0,
                    })}
                    key={product.product.slug}
                  >
                    <TableCell>{product.product.title}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell className="text-right">
                      {currencyFormat(product.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Separator />
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currencyFormat(order.subTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>{currencyFormat(order.envio)}</span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{currencyFormat(order.total)}</span>
          </div>
          <div>
            <h3 className="mb-2 flex items-center gap-2 font-semibold">
              <Truck className="h-5 w-5" />
              Información de Envío
            </h3>
            <p className="text-sm">
              {OrderAddress!.firstName} {OrderAddress!.lastName}
              <br />
              {OrderAddress!.street} {OrderAddress!.streetNumber}
              <br />
              Argentina, CP {OrderAddress!.postalCode}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col-reverse items-center justify-between gap-4 border-t bg-muted/80 px-6 py-3">
          <div className="flex items-center justify-center gap-1 pb-4 text-center text-xs text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Actualizado{' '}
            <time dateTime="2023-11-23">
              {dateFormat(new Date(order.updatedAt || ''))}
            </time>
          </div>
          {order.isPaid ? (
            <div className="w-full rounded-md bg-green-700 p-2 text-center text-white">
              <span>Pago realizado</span>
            </div>
          ) : (
            <ButtonMp
              products={OrderItem.map((product) => ({
                title: product.product.title,
                quantity: product.quantity,
                unit_price: product.price,
              }))}
              order_id={order.id}
            />
          )}
        </CardFooter>
      </Card>
    </PageContainer>
  );
}
