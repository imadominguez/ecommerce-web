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

export const SkeletonTableProduct = () => {
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
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="h-5 w-40 rounded-md bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
