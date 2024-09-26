import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { Package2Icon } from 'lucide-react';

import { db } from '@/lib/db';
import { OrdersEmpty } from './components/orders-empty';
import { CustomLinkButton } from '@/components/button/link-to-shop';

export default async function OrdersPage() {
  const orders = await db.order.findMany();
  if (orders.length === 0) {
    return (
      <div className="grid h-full flex-1 place-content-center">
        <OrdersEmpty />
      </div>
    );
  }
  return (
    <div className="container flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
        <CustomLinkButton variant={'link'} className="lg:hidden" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </CustomLinkButton>
        <h1 className="text-lg font-semibold md:text-2xl">Ordenes</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">#3210</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Product A</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Completed
                  </span>
                </TableCell>
                <TableCell className="text-right">$50.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3209</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Product B</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    Pending
                  </span>
                </TableCell>
                <TableCell className="text-right">$75.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3208</TableCell>
                <TableCell>Bob Johnson</TableCell>
                <TableCell>Product C</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    Cancelled
                  </span>
                </TableCell>
                <TableCell className="text-right">$100.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
