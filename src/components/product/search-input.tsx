'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const DEBOUNCE_DELAY = 500; // Tiempo de demora para el debounce

export const SearchInput = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Crear función para manejo de cambios en el input de búsqueda con debounce
  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  }, DEBOUNCE_DELAY);

  return (
    <div
      className={cn('relative ml-auto flex-1 sm:flex-1', {
        hidden:
          // Ocultar el input de búsqueda en las rutas de la tienda que no sean las de /dashboard, /products
          !['/dashboard/products', '/dashboard/orders', '/products'].includes(
            pathname
          ),
      })}
    >
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        defaultValue={searchParams.get('query')?.toString()}
        placeholder={
          pathname === '/dashboard/products'
            ? 'Busca un producto'
            : pathname === '/dashboard/orders'
              ? 'Busca una orden'
              : 'Haz una búsqueda'
        }
        onChange={(event) => handleChange(event.target.value)}
        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
      />
    </div>
  );
};
