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
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react';
import { currencyFormat } from '@/utils/currencyFormat';

import { PaginationProductsTable } from './pagination-products-table';
import { getProducts } from '@/actions/products/get-products';
import { ProductImage } from '@/components/product/product-image';
import Link from 'next/link';
import { ButtonDeleteProduct } from './button-delete-product';
import { CustomLinkButton } from '@/components/button/link-to-shop';

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
    take: 5,
    isActive,
    inStock,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Productos</CardTitle>
        <CardDescription className="text-xs">
          Maneja tus productos y mira su rendimiento de ventas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>En stock</TableHead>
              <TableHead className="hidden md:table-cell">
                En descuento
              </TableHead>
              <TableHead className="hidden md:table-cell">Precio</TableHead>

              <TableHead className="hidden md:table-cell">Creado el</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(
              ({
                id,
                images,
                title,
                inStock,
                inDiscount,
                price,
                createdAt,
                slug,
              }) => (
                <TableRow key={id}>
                  <TableCell>
                    <ProductImage
                      src={images[0]}
                      alt={title}
                      width={80}
                      height={80}
                      className="aspect-square h-full w-full rounded-md"
                    />
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        inStock > 10
                          ? 'stock'
                          : inStock < 10 && inStock !== 0
                            ? 'warning'
                            : 'nostock'
                      }
                    >
                      {inStock}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {inDiscount ? (
                      <Badge variant="stock">Sí</Badge>
                    ) : (
                      <Badge variant="nostock">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {currencyFormat(price)}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {createdAt.toLocaleDateString()}
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
                        <DropdownMenuItem className="p-0">
                          <CustomLinkButton
                            href={`/dashboard/products/${slug}`}
                            className={'w-full !justify-start'}
                            variant={'secondary'}
                          >
                            <EditIcon className="mr-2 h-4 w-4" />
                            Editar
                          </CustomLinkButton>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-0">
                          <ButtonDeleteProduct slug={slug} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            )}
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
