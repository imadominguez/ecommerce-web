'use client';

import { createBrand } from '@/actions/brand/create-brand';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import React, { FormEvent, useState } from 'react';

export const CreateBrandInput = () => {
  const { toast } = useToast();
  const [value, setValue] = useState('');

  const handleCreateBrand = async (event: FormEvent) => {
    event.preventDefault();
    const { ok, message } = await createBrand(value);
    if (ok) {
      toast({
        variant: 'success',
        title: message,
      });
    } else {
      toast({
        variant: 'destructive',
        title: message,
      });
    }
  };
  return (
    <Card className="col-span-2 md:col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Crear Marca</CardTitle>
        <CardDescription>Gestiona tus marcas.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex w-full items-center justify-between gap-2"
          onSubmit={handleCreateBrand}
        >
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            id="brand"
            placeholder="Nombre de la nueva marca"
          />
          <Button variant={'standard'}>
            <Plus className="mr-2 h-4 w-4" /> Crear
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
