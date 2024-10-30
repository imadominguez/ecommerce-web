import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';
import { currencyFormat } from '@/utils/currencyFormat';
import { DollarSign } from 'lucide-react';

export const TotalRenueveCard = async () => {
  const totalRenueve = db.order.findMany({
    where: {
      isPaid: true,
    },
    select: {
      total: true,
    },
  });

  const totalRenuevePreviousMonth = db.order.findMany({
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

  const [renueve, renuevePreviousMonth] = await Promise.all([
    totalRenueve,
    totalRenuevePreviousMonth,
  ]);

  const renueveTotal = renueve.reduce((acc, curr) => acc + curr.total, 0);

  const renuevePrevious = renuevePreviousMonth.reduce(
    (acc, curr) => acc + curr.total,
    0
  );

  const percentage =
    ((renueveTotal - renuevePrevious) / renuevePrevious) * 100 || 0;

  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Ingresos totales</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currencyFormat(renueveTotal)}</div>
        <p className="text-xs text-muted-foreground">
          +{percentage}% desde el mes pasado
        </p>
      </CardContent>
    </Card>
  );
};
