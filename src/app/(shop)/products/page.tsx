import { Pagination } from '@/components/pagination';
import { ProductGrid } from './components/product-grid';
import { notFound } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/actions/products/get-products';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ListFilterIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages, ok } = await getProducts({ page });
  if (!ok) {
    notFound();
  }
  return (
    <>
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-16 pt-5 sm:px-6 sm:pb-24 lg:max-w-7xl lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          {/* Filters Mobile */}
          <div className="flex items-end justify-end lg:hidden">
            {/* Filtros mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                  <ListFilterIcon className="h-5 w-5" />
                  {/* Filtros */}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Categoría</h4>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">
                            Todas las categorías
                          </SelectItem>
                          <SelectItem value="tinta">Tinta</SelectItem>
                          <SelectItem value="papel">Papel</SelectItem>
                          <SelectItem value="accesorios">Accesorios</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Precio</h4>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        className="w-1/2"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        className="w-1/2"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Color</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="negro" />
                        <Label htmlFor="negro">Negro</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cian" />
                        <Label htmlFor="cian">Cian</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="magenta" />
                        <Label htmlFor="magenta">Magenta</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="amarillo" />
                        <Label htmlFor="amarillo">Amarillo</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Aplicar filtros</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* Filters Desktop */}
          <div className="sticky top-10 hidden lg:block">
            <h3 className="mb-4 text-lg font-semibold">Filtros</h3>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium">Categoría</h4>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="tinta">Tinta</SelectItem>
                      <SelectItem value="papel">Papel</SelectItem>
                      <SelectItem value="accesorios">Accesorios</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2 text-sm font-medium">Precio</h4>
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="Min" className="w-1/2" />
                  <span>-</span>
                  <Input type="number" placeholder="Max" className="w-1/2" />
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2 text-sm font-medium">Color</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="negro" />
                    <Label htmlFor="negro">Negro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cian" />
                    <Label htmlFor="cian">Cian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="magenta" />
                    <Label htmlFor="magenta">Magenta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="amarillo" />
                    <Label htmlFor="amarillo">Amarillo</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <Button className="w-full">Aplicar filtros</Button>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-3">
          <div className="sticky top-0 z-50 bg-background py-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Nuestros productos
            </h2>

            <Separator />
          </div>

          <ProductGrid
            className={
              'mt-6 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 2xl:gap-x-8'
            }
            products={products}
          />

          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
