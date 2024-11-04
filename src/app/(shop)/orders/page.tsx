import { getOrders } from '@/actions/orders/get-orders';
import { auth } from '@/auth';
import { PageContainer } from '@/components/layout/page-container';
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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { currencyFormat } from '@/utils/currencyFormat';
import { dateFormat } from '@/utils/dateFormat';
import type { StatusOrder } from '@prisma/client';
import {
  CreditCard,
  MoreHorizontal,
  Package,
  Search,
  Truck,
} from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ProductImage } from '@/components/product/product-image';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Mis ordenes',
};
type BadgeVariant =
  | 'default'
  | 'warning'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'stock'
  | 'nostock'
  | 'descount'
  | null
  | undefined;
export default async function OrdersPage() {
  const session = await auth();
  if (!session) {
    redirect('/login?redirect=/orders');
  }
  const { ok, orders } = await getOrders();

  if (!ok && !orders) {
    <p>No hay ordenes</p>;
  }

  const getStatusBadge = (status: StatusOrder) => {
    const variants: Record<StatusOrder, BadgeVariant> = {
      pending: 'warning',
      delivered: 'stock',
      canceled: 'destructive',
    };

    const labels: Record<StatusOrder, string> = {
      pending: 'Pendiente',
      delivered: 'Entregado',
      canceled: 'Cancelado',
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };
  return (
    <PageContainer>
      <h1 className="mb-4 text-2xl font-bold">Ordenes</h1>

      {/* <div className="mb-4 flex items-center space-x-4">
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
          {orders.length} {orders.length > 1 ? 'Compras' : 'Compra'}
        </span>
      </div> */}

      <div className="grid gap-8">
        {orders &&
          orders.map((order) => (
            <Card
              key={order.id}
              className="overflow-hidden transition-shadow hover:shadow-md"
            >
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Orden #{order.id.slice(0, 8)}
                  </CardTitle>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {dateFormat(order.createdAt)}
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-5 w-5" />
                      <span>{order.itemsInOrder} productos</span>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck className="h-5 w-5" />
                      <span>
                        {order.OrderAddress
                          ? order.OrderAddress.city
                          : 'No especificado'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span
                      className={
                        order.isPaid ? 'text-green-600' : 'text-yellow-600'
                      }
                    >
                      {order.isPaid ? 'Pagado' : 'Pendiente de pago'}
                    </span>
                  </div>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="items">
                    <AccordionTrigger>
                      <span className="font-semibold">Detalles del pedido</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead className="text-right">Precio</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.OrderItem.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                  <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                                    <ProductImage
                                      width={200}
                                      height={200}
                                      src={
                                        item.product.images[0] ||
                                        '/placeholder.svg'
                                      }
                                      alt={item.product.title}
                                    />
                                  </div>
                                  <span>{item.product.title}</span>
                                </div>
                              </TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell className="text-right">
                                {currencyFormat(item.price)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                  {order.OrderAddress && (
                    <AccordionItem value="address">
                      <AccordionTrigger>
                        <span className="font-semibold">
                          Dirección de envío
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {order.OrderAddress.firstName}{' '}
                            {order.OrderAddress.lastName}
                          </p>
                          <p>
                            {order.OrderAddress.street}{' '}
                            {order.OrderAddress.streetNumber}
                          </p>
                          <p>{order.OrderAddress.city}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </CardContent>
              <CardFooter className="flex flex-col items-start justify-between gap-4 bg-muted/50 p-6 sm:flex-row sm:items-center">
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-2xl font-bold">
                          {currencyFormat(order.total)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Subtotal: {currencyFormat(order.subTotal)}</p>
                        <p>Envío: {currencyFormat(order.envio)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="text-sm text-muted-foreground">
                    {order.isPaid
                      ? `Pagado el ${dateFormat(order.paidAt!)}`
                      : 'Pago pendiente'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/orders/${order.id}`}>Ver detalles</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* <DropdownMenuLabel>Acciones</DropdownMenuLabel> */}
                      {/* <DropdownMenuItem>Descargar factura</DropdownMenuItem> */}
                      {/* <DropdownMenuItem>Contactar soporte</DropdownMenuItem> */}
                      {/* <DropdownMenuSeparator /> */}
                      <DropdownMenuItem className="text-red-600">
                        Cancelar orden
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </PageContainer>
  );
}
