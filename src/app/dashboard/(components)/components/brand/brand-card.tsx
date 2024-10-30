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
import { db } from '@/lib/db';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DeleteBrand } from './delete-brand';
import ProductList from './product-list';

export const BrandCard = async () => {
  const brands = await db.brand.findMany();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marcas</CardTitle>
        <CardDescription>Gestiona tus marcas.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px]">
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
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell className="capitalize">{brand.name}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <ProductList {...brand} />

                    <DeleteBrand key={brand.id} {...brand} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
