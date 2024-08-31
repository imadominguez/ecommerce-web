import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { currencyFormat } from '@/utils/currencyFormat';

import { PaginationProductsTable } from './pagination-products-table';
import { getProducts } from '@/actions/products/get-products';

interface Props {
  query?: string;
  currentPage: number;
  isActive?: boolean;
  inStock?: number;
}

export const ProductsTable = async ({
  query,
  currentPage,
  isActive,
  inStock,
}: Props) => {
  const { products, totalPages, totalProducts } = await getProducts({
    title: query,
    page: currentPage,
    take: 10,
    isActive,
    inStock,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>
          Maneja tus productos y mira su rendimiento de ventas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>En stock</TableHead>
              <TableHead className="hidden md:table-cell">Precio</TableHead>

              <TableHead className="hidden md:table-cell">Creado el</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.inStock > 10
                        ? 'stock'
                        : product.inStock < 10 && product.inStock !== 0
                          ? 'warning'
                          : 'nostock'
                    }
                  >
                    {product.inStock}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {currencyFormat(product.price)}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {product.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <EditIcon className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <TrashIcon className="mr-2 h-4 w-4" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="w-full flex-1 text-xs text-muted-foreground">
          Mostrando{' '}
          <strong>
            {(currentPage - 1) * 10 + 1}-{currentPage * 10}
          </strong>{' '}
          de <strong>{totalProducts}</strong>{' '}
          {totalProducts > 1 ? 'productos' : 'producto'}
        </div>
        <PaginationProductsTable totalPages={totalPages} />
      </CardFooter>
    </Card>
  );
};
