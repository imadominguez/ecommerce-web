'use client';
import { createCategory } from '@/actions/categories/create-category';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import React, { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export const CreateCategoryForm = () => {
  const [value, setValue] = useState('');

  const handleCreateBrand = async (event: FormEvent) => {
    event.preventDefault();
    const { ok, message } = await createCategory(value);
    if (ok) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <form
        className="flex w-full items-center justify-between gap-2"
        onSubmit={handleCreateBrand}
      >
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="categorie"
          placeholder="Nombre de la categoria"
        />
        <Button size={'sm'} variant={'standard'}>
          <Plus className="mr-2 h-4 w-4" /> Crear
        </Button>
      </form>
    </div>
  );
};