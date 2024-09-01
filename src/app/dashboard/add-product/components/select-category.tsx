'use client';

import { useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { useCategoryStore } from '@/store/category/useCategoryStore';

interface SelectCategoryProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
}

export const SelectCategory = ({ value, onChange }: SelectCategoryProps) => {
  const { categories, loading, error, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) {
    return (
      <div className="grid w-full cursor-not-allowed place-content-center rounded bg-muted py-3">
        <small>Cargando categorías...</small>
      </div>
    );
  }

  if (error) {
    if (error === 'No hay categorias creadas.') {
      return (
        <div className="grid w-full cursor-not-allowed place-content-center rounded bg-muted py-3">
          <Link href={'/dashboard/category'}>Crear categoria</Link>
        </div>
      );
    }
    return (
      <div className="grid w-full cursor-not-allowed place-content-center rounded bg-muted py-3">
        <small>{error}</small>
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={'Selecciona una categoria'} />
      </SelectTrigger>
      <SelectContent id="category">
        <SelectGroup>
          {categories.map(({ id, name }) => (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
