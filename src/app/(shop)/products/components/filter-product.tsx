'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Category } from '@prisma/client';

import { ListFilterIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  category?: string;
  pmin?: string;
  pmax?: string;
  color?: string;
  categories: Category[];
}

export const FilterProduct = ({
  category,
  pmin,
  pmax,
  color,
  categories,
}: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [filters, setFilters] = useState({
    category: category || '',
    pmin: pmin || '',
    pmax: pmax || '',
    color: color || '',
  });

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (key === 'category' && value === 'null') {
      params.delete('category');
      replace(`${pathname}?${params.toString()}`);
      setFilters((prev) => ({ ...prev, [key]: value }));
      return;
    }
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    params.delete('pmin');
    params.delete('pmax');
    params.delete('color');
    replace(`${pathname}?${params.toString()}`);
    setFilters({
      category: '',
      pmin: '',
      pmax: '',
      color: '',
    });
  };

  useEffect(() => {
    setFilters({
      category: category || '',
      pmin: pmin || '',
      pmax: pmax || '',
      color: color || '',
    });
  }, [category, color, pmax, pmin, searchParams]);

  return (
    <>
      <div className="flex items-end justify-end lg:hidden">
        {/* Filtros mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'outline'} size={'icon'}>
              <ListFilterIcon className="h-5 w-5" />
              {/* Filtros */}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <Filters
              categories={categories}
              filters={filters}
              handleFilter={handleFilter}
              clearFilters={clearFilters}
            />
          </SheetContent>
        </Sheet>
      </div>
      <div className="sticky top-10 hidden p-4 lg:block">
        <Filters
          filters={filters}
          categories={categories}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
        />
      </div>
    </>
  );
};

interface PropsFilters {
  filters: {
    category: string;
    pmin: string;
    pmax: string;
    color: string;
  };
  categories: Category[];
  handleFilter: (k: string, v: string) => void;
  clearFilters: () => void;
}

const Filters = ({
  filters,
  handleFilter,
  clearFilters,
  categories,
}: PropsFilters) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium">Categoría</h4>
        <Select
          value={filters.category}
          onValueChange={(e) => handleFilter('category', e)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="null">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Precio</h4>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={filters.pmin}
            onChange={(e) => handleFilter('pmin', e.target.value)}
            placeholder="Min"
            className="w-1/2"
          />

          <span>-</span>
          <Input
            type="number"
            value={filters.pmax}
            onChange={(e) => handleFilter('pmax', e.target.value)}
            placeholder="Max"
            className="w-1/2"
          />
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Color</h4>
        <Select
          value={filters.color}
          onValueChange={(e) => handleFilter('color', e)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un color" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="null">Todos</SelectItem>
              <SelectItem value="black">Negro</SelectItem>
              <SelectItem value="cyan">Cyan</SelectItem>
              <SelectItem value="magenta">MAgenta</SelectItem>
              <SelectItem value="yellow">Amarillo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        size={'sm'}
        className="w-full uppercase"
        variant={'outline'}
        onClick={clearFilters}
      >
        Limpiar filtros
      </Button>
    </div>
  );
};
