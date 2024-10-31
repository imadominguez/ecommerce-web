import { PageContainer } from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/lib/db';
import { currencyFormat } from '@/utils/currencyFormat';
import { dateFormat } from '@/utils/dateFormat';
import {
  CalendarDays,
  ClipboardList,
  MapPin,
  Package2,
  PhoneIcon,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    id?: string;
  };
}

export default async function OrderDetailPage({ params: { id } }: Props) {
  if (!id) {
    redirect('/dashboard/orders');
  }

  const order = await db.order.findUnique({
    where: {
      id,
    },
    include: {
      OrderAddress: true,
      OrderItem: {
        include: {
          product: {
            select: {
              price: true,
              brand: true,
              category: true,
              color: true,
              discount: true,
              inDiscount: true,
              title: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    redirect('/dashboard/orders');
  }

  return (
    <PageContainer className="justify-start">
      <h1 className="mb-3 flex items-center gap-2 text-3xl font-bold">
        {' '}
        <ClipboardList className="h-8 w-8" />
        Resumen de la orden
      </h1>
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5" />
              Detalle de la orden
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Orden ID:</span>
                <span className="rounded bg-muted px-2 py-1 font-mono text-sm">
                  {order.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <Badge
                  variant={
                    order.status === 'delivered'
                      ? 'default'
                      : order.status === 'canceled'
                        ? 'destructive'
                        : 'secondary'
                  }
                >
                  {order.status === 'delivered'
                    ? 'Entregado'
                    : order.status === 'canceled'
                      ? 'Cancelado'
                      : 'Pendiente'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado de pago:</span>
                <Badge variant={order.isPaid ? 'default' : 'secondary'}>
                  {order.isPaid ? 'Pagado' : 'Pendiente de pago'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Fecha:
                </span>
                <span>{dateFormat(order.createdAt)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <ShoppingCart className="h-4 w-4" />
                  Cantidad de productos:
                </span>
                <span>{order.itemsInOrder}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>{currencyFormat(order.subTotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  Envío:
                </span>
                <span>{currencyFormat(order.envio)}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2 font-semibold">
                <span>Total:</span>
                <span className="text-lg">{currencyFormat(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Dirección de la orden
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-4">
            <div className="font-medium">{`${order?.OrderAddress?.firstName} ${order?.OrderAddress?.lastName}`}</div>
            <div>{`${order?.OrderAddress?.street} ${order?.OrderAddress?.streetNumber}`}</div>
            {order.OrderAddress?.address2 && (
              <div>{order?.OrderAddress?.address2}</div>
            )}
            {order.OrderAddress?.isApartment && (
              <div>{`Floor: ${order.OrderAddress.floor}, Apt: ${order.OrderAddress.apartment}`}</div>
            )}
            <div>{`${order.OrderAddress?.city}, ${order.OrderAddress?.postalCode}`}</div>
            <div>{order.OrderAddress?.countryId}</div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" />
              {order.OrderAddress?.phone}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Productos de la orden
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.OrderItem.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.product.title}</TableCell>
                  <TableCell className="text-right">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {currencyFormat(product.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {currencyFormat(product.price * product.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
