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
import { EditIcon } from 'lucide-react';
import { currencyFormat } from '@/utils/currencyFormat';
import { PaginationProductsTable } from './pagination-products-table';
import { getProducts } from '@/actions/products/get-products';
import { ProductImage } from '@/components/product/product-image';
import { ButtonDeleteProduct } from './button-delete-product';
import { CustomLinkButton } from '@/components/button/custom-link-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
              <TableHead className="hidden w-[100px] md:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden sm:table-cell">En stock</TableHead>
              <TableHead className="hidden md:table-cell">
                En descuento
              </TableHead>
              <TableHead>Precio</TableHead>
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
                  <TableCell className="hidden md:table-cell">
                    <ProductImage
                      src={images[0]}
                      alt={title}
                      width={80}
                      height={80}
                      className="aspect-square aspect-1 h-16 w-16 rounded-md"
                    />
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell className="hidden sm:table-cell">
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
                  <TableCell>{currencyFormat(price)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CustomLinkButton
                              href={`/dashboard/products/${slug}`}
                              variant="outline"
                              className="w-fit"
                            >
                              <EditIcon className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </CustomLinkButton>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar producto</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ButtonDeleteProduct
                              slug={slug}
                            ></ButtonDeleteProduct>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar producto</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
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
