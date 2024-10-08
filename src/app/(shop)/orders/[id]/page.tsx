import { getOrderById } from '@/actions/orders/get-order-by-id';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { currencyFormat } from '@/utils/currencyFormat';
import { dateFormat } from '@/utils/dateFormat';
import {
  Copy,
  CreditCard,
  MapPin,
  Phone,
  ShoppingBag,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderConfirmation({ params: { id } }: Props) {
  const { user, OrderAddress, OrderItem, order } = await getOrderById(id);

  if (!order) {
    notFound();
  }
  return (
    <PageContainer
      className={`flex min-h-screen w-full max-w-none items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 transition-colors duration-300 dark:from-gray-900 dark:to-gray-800`}
    >
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start bg-muted/80">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Orden #{id.slice(0, 8)}
              <Button size="icon" variant="outline" className="h-6 w-6">
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Order ID</span>
              </Button>
            </CardTitle>
            <CardDescription>
              {dateFormat(new Date(order.createdAt || ''))}
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Badge variant={order.isPaid ? 'default' : 'warning'}>
              {order.isPaid ? 'Pago' : 'Pendiente de pago'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <span className="font-semibold">Detalles de la orden</span>
            <ul className="grid gap-3">
              {OrderItem.map((product, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    <strong>{product.product.title}</strong> x{' '}
                    <span>{product.quantity}</span>
                  </span>
                  <span className="flex-1 text-end">
                    {currencyFormat(product.price)}
                  </span>
                  <Separator orientation="vertical" className="mx-3" />
                  <span>
                    {currencyFormat(product.price * product.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{currencyFormat(order.subTotal || 0)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Envio</span>
                <span>{currencyFormat(order.envio || 0)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>$25.00</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>{currencyFormat(order.total || 0)}</span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <div className="font-semibold">Información de Envío</div>
              <address className="grid gap-0.5 not-italic text-muted-foreground">
                <span>
                  {OrderAddress?.firstName} {OrderAddress?.lastName}
                </span>
                <span>
                  {OrderAddress?.street} {OrderAddress?.streetNumber}
                </span>
                <span>Argentina, CP {OrderAddress?.postalCode}</span>
              </address>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Información del Cliente</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Cliente</dt>
                <dd>{user.name}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href="mailto:">{user.email}</a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>
                  <a href="tel:">{OrderAddress?.phone}</a>
                </dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/80 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Actualizado{' '}
            <time dateTime="2023-11-23">
              {dateFormat(new Date(order.updatedAt || ''))}
            </time>
          </div>
        </CardFooter>
      </Card>
    </PageContainer>
  );
}
