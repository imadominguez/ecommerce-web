import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/lib/db';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const CategoryCard = async () => {
  const categories = await db.category.findMany();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
        <CardDescription>Gestiona tus categorias.</CardDescription>
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
              {categories.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell className="capitalize">{brand.name}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    {/* <ProductList {...brand} /> */}

                    {/* <DeleteBrand key={brand.id} {...brand} /> */}
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
