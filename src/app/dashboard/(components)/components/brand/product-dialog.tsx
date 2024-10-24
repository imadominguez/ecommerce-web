'use client';

import { CustomLinkButton } from '@/components/button/custom-link-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/types/product';
import { currencyFormat } from '@/utils/currencyFormat';
import { useState } from 'react';

interface ProductDialogProps {
  products: Product[] | undefined;
}

export const ProductDialog = ({ products }: ProductDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Ver productos</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Productos de la marca</DialogTitle>
        </DialogHeader>

        {products && products.length > 0 ? (
          <ScrollArea className="h-[400px] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Nombre</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>
                    <span className="sr-only">Acciones</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{currencyFormat(product.price)}</TableCell>
                    <TableCell>
                      <CustomLinkButton
                        size={'sm'}
                        variant={'link'}
                        href={`/dashboard/products/${product.slug}`}
                      >
                        Ver producto
                      </CustomLinkButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <p>No hay productos disponibles para esta marca.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
