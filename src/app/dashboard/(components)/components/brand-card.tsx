import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/lib/db';
import { Edit, Trash2 } from 'lucide-react';
import React from 'react';
import { CreateBrandInput } from './create-brand-input';
import { ScrollArea } from '@/components/ui/scroll-area';

export const BrandCard = async () => {
  const brands = await db.brand.findMany();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marcas</CardTitle>
        <CardDescription>Gestiona tus marcas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lista" className="w-full">
          <TabsList>
            <TabsTrigger value="lista">Lista de Marcas</TabsTrigger>
            <TabsTrigger value="crear">Crear Marca</TabsTrigger>
          </TabsList>
          <TabsContent value="lista">
            <ScrollArea className="h-[450px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>
                      <span className="sr-only">Acciones</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brands.map((marca) => (
                    <TableRow key={marca.id}>
                      <TableCell className="capitalize">{marca.name}</TableCell>
                      <TableCell className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Ver Productos
                        </Button>

                        <Button variant="ghost" size="icon" className="ml-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="crear">
            <CreateBrandInput />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
