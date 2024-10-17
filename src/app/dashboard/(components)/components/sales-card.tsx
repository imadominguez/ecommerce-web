import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';
import { currencyFormat } from '@/utils/currencyFormat';
import { CreditCard } from 'lucide-react';

export const SalesCard = async () => {
  const totalSalesActualMonth = db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth())),
        lt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
    },
    select: {
      total: true,
    },
  });

  const totalSalesPreviousMonth = db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        lt: new Date(new Date().setMonth(new Date().getMonth())),
      },
    },
    select: {
      total: true,
    },
  });

  const [salesMonth, salesPreviousMonth] = await Promise.all([
    totalSalesActualMonth,
    totalSalesPreviousMonth,
  ]);

  const sales = salesMonth.reduce((acc, curr) => acc + curr.total, 0);

  const salesPrevious = salesPreviousMonth.reduce(
    (acc, curr) => acc + curr.total,
    0
  );

  const percentage = ((sales - salesPrevious) / salesPrevious) * 100;

  return (
    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Ventas del mes</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currencyFormat(sales)}</div>
        <p className="text-xs text-muted-foreground">
          {percentage}% desde el mes pasado
        </p>
      </CardContent>
    </Card>
  );
};
