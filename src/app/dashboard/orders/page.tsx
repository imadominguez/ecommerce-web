import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { MoreHorizontal, Package2 } from 'lucide-react';

import { db } from '@/lib/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { currencyFormat } from '@/utils/currencyFormat';
import { dateFormat } from '@/utils/dateFormat';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DialogOrderStatus } from './components/status-order-dialog';
import { OrderStatus } from '@/types/order';
import { StatusFilter } from './components/status-filter';

interface Props {
  searchParams: {
    status?: string;
    page?: number;
    query?: string;
  };
}

export default async function OrdersPage({
  searchParams: { status, page, query },
}: Props) {
  const orders = await db.order.findMany({
    where: {
      status: (status as OrderStatus) || undefined,
      user: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      OrderItem: {
        select: {
          quantity: true,
        },
      },
    },
    take: 6,
    skip: ((page || 1) - 1) * 6,
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant={'warning'}>Pendiente</Badge>;
      case 'canceled':
        return <Badge variant="destructive">Cancelado</Badge>;
      case 'delivered':
        return <Badge variant="outline">Entregado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mb-2 flex w-full items-center justify-end gap-2">
          <StatusFilter />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Órdenes</CardTitle>
            <CardDescription>
              Gestiona las órdenes de tu tienda y visualiza su estado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="hidden md:table-cell">Total</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Productos
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Fecha</TableHead>
                  <TableHead>
                    <span className="sr-only">Acciones</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length > 0 &&
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.user.name}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {currencyFormat(order.total)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order.OrderItem.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {dateFormat(order.createdAt)}
                      </TableCell>
                      <TableCell>
                        {/* modal */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-label="Abrir menú"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>
                              Actualizar estado
                              <DialogOrderStatus
                                order_id={order.id}
                                status={'pending'}
                                name={order?.user?.name || ''}
                              />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-32 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Package2 className="mb-2 h-8 w-8 text-muted-foreground" />
                        <p className="text-lg font-medium">No hay órdenes</p>
                        <p className="text-sm text-muted-foreground">
                          No se encontraron órdenes para mostrar.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
              <span>
                Mostrando <strong>1-5</strong> de <strong>50</strong> órdenes
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
