'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

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

    replace(`${pathname}?${params.toString()}`);
  }, DEBOUNCE_DELAY);

  return (
    <div className="relative ml-auto flex-1 sm:flex-initial">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        defaultValue={searchParams.get('query')?.toString()}
        placeholder={
          // Ejemplo de hacer validaciones para un placeholder para cada pagina del dashboard
          // pathname === '/dashboard/products'
          //   ? 'Busca un producto'
          //   : 'Busca un cliente'
          'Haz una busqueda'
        }
        onChange={(event) => handleChange(event.target.value)}
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
      />
    </div>
  );
};
