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

export const SkeletonTableProduct = () => {
  return (
    <Card className="h-full flex-1">
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
          <TableBody className="h-full flex-1">
            {[...Array(5)].map((_, index) => (
              <TableRow key={index} className="h-[101px]">
                <TableCell>
                  <div className="mr-2 h-16 w-16 animate-pulse rounded-md bg-muted-foreground" />
                </TableCell>
                <TableCell>
                  <div className="h-5 w-40 animate-pulse rounded-md bg-muted-foreground" />
                </TableCell>
                <TableCell>
                  <div className="mt-2 h-4 w-12 animate-pulse rounded-md bg-muted-foreground" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="mt-2 h-4 w-12 animate-pulse rounded-md bg-muted-foreground" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="mt-2 h-4 w-12 animate-pulse rounded-md bg-muted-foreground" />
                </TableCell>
                <TableCell>
                  <div className="mt-2 h-4 w-12 animate-pulse rounded-md bg-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="max-w-96 rounded text-xs">
          <span className="animate-pulse bg-muted-foreground text-muted-foreground">
            Mostrando{' '}
          </span>
          <strong className="animate-pulse bg-muted-foreground text-muted-foreground">
            12-12{' '}
          </strong>{' '}
          <span className="animate-pulse bg-muted-foreground text-muted-foreground">
            de
          </span>{' '}
          <strong className="animate-pulse bg-muted-foreground text-muted-foreground">
            {' '}
            12
          </strong>{' '}
          <span className="animate-pulse bg-muted-foreground text-muted-foreground">
            producto
          </span>
        </div>
        <div className="h-10 w-[395px] animate-pulse rounded bg-muted-foreground">
          &nbsp;
        </div>
      </CardFooter>
    </Card>
  );
};
