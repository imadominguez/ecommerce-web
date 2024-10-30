export const revalidate = 300;

import { PageContainer } from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/lib/db';
import { OrderStatus } from '@/types/order';
import { currencyFormat } from '@/utils/currencyFormat';
import { timeFormat } from '@/utils/dateFormat';
import { CalendarIcon, Package2, Search } from 'lucide-react';

export default async function OrdersDayPage() {
  const ordersDay = await db.order.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
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
    <PageContainer className="!max-w-none justify-start">
      <Card className="">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Órdenes del Día</CardTitle>
              <CardDescription>
                Gestiona las órdenes recibidas hoy
              </CardDescription>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {new Date().toLocaleDateString()}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Input
                placeholder="Buscar por cliente"
                // value={searchTerm}
                // onChange={handleSearchChange}
                className="w-full"
              />
              <Search className="absolute right-2 top-2 h-5 w-5 text-muted-foreground" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="delivered">Entregado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {ordersDay.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersDay.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{currencyFormat(order.total)}</TableCell>
                    <TableCell className="text-right">
                      {timeFormat(order.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-10 text-center">
              <Package2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                No hay órdenes
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No se han recibido órdenes hoy o no hay coincidencias con tu
                búsqueda.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
