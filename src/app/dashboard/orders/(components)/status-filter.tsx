'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OrderStatus } from '@/types/order';
import { ListFilter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const StatusFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const status = params.get('status') as OrderStatus;

  const handleFilter = (status: OrderStatus) => {
    if (status === params.get('status')) {
      params.delete('status');
      params.set('page', '1');
      return router.replace(`${pathname}?${params.toString()}`);
    }
    params.set('status', status);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Estado</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={status === 'delivered'}
          onClick={() => handleFilter('delivered')}
        >
          Enviado
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={status === 'pending'}
          onClick={() => handleFilter('pending')}
        >
          Pendiente
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={status === 'canceled'}
          onClick={() => handleFilter('canceled')}
        >
          Cancelado
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
