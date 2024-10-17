import { CustomLinkButton } from '@/components/button/custom-link-button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

export const OrdersRecentCard = async () => {
  const recentOrders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      total: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return (
    <Card x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle>Ordenes</CardTitle>
          <CardDescription>Ordenes recientes de tu tienda.</CardDescription>
        </div>

        <CustomLinkButton
          size={'sm'}
          variant={'outline'}
          href="/dashboard/orders"
          className="w-max"
        >
          Ver todo
        </CustomLinkButton>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden xl:table-column">Type</TableHead>
              <TableHead className="hidden xl:table-column">Status</TableHead>
              <TableHead className="hidden xl:table-column">Date</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.user.name}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {order.user.email}
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-column">Sale</TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    Approved
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                  {dateFormat(order.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  {currencyFormat(order.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
