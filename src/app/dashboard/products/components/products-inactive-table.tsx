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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EditIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react';
import { currencyFormat } from '@/utils/currencyFormat';
import { CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { db } from '@/lib/db';

export const ProductsInactiveTable = async () => {
  const products = await db.product.findMany({
    where: {
      isActive: false,
    },
  });

  const totalProducts = products.length;

  if (totalProducts === 0) {
    return (
      <Card className="mt-4 min-h-[70dvh]">
        <CardHeader>
          <CardTitle>Productos Inactivos</CardTitle>
          <CardDescription>
            No hay productos inactivos en este momento.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-full flex-1 flex-col items-center justify-center py-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 text-gray-400"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="M7 8h10" />
            <path d="M7 12h10" />
            <path d="M7 16h10" />
          </svg>
          <p className="text-lg font-semibold text-gray-600">
            No hay productos inactivos
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Todos tus productos están activos en este momento.
          </p>
        </CardContent>
      </Card>
    );
  }

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
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};
