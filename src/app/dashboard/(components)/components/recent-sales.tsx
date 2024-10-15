import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { currencyFormat } from '@/utils/currencyFormat';
import { sleep } from '@/utils/sleep';
import React from 'react';

export const RecentSales = async () => {
  await sleep(2);
  const recentSales = await db.order.findMany({
    where: {
      isPaid: true,
    },
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: true },
  });
  return (
    <Card
      x-chunk="dashboard-01-chunk-5"
      className="flex flex-col justify-between"
    >
      <CardHeader>
        <CardTitle>Ventas recientes</CardTitle>
      </CardHeader>
      <CardContent className="grid flex-1 items-start gap-8">
        {recentSales.length > 0 &&
          recentSales.map((sale) => (
            <div className="flex items-center gap-4" key={sale.id}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarFallback>
                  {sale.user.name?.slice(0, 1)}{' '}
                  {sale.user.name?.split(' ')[1].slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {sale.user.name}
                </p>
                <p className="hidden text-sm text-muted-foreground 2xl:flex">
                  {sale.user.email}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {currencyFormat(sale.total)}
              </div>
            </div>
          ))}

        {!recentSales.length && (
          <div className="text-center text-muted-foreground">
            No hay ventas recientes
          </div>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="pt-2">
        <p className="w-full text-right font-bold">
          Total:{' '}
          {currencyFormat(
            recentSales.reduce((total, hola) => total + hola.total, 0)
          )}
        </p>
      </CardFooter>
    </Card>
  );
};
