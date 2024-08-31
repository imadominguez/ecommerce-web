import { getAllProducts } from '@/actions/products/get-all-products';
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

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages, ok } = await getAllProducts({ page });
  if (!ok) {
    notFound();
  }
  return (
    <>
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-16 pt-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="sticky top-10">
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
              <div>
                <h4 className="mb-2 text-sm font-medium">Precio</h4>
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="Min" className="w-1/2" />
                  <span>-</span>
                  <Input type="number" placeholder="Max" className="w-1/2" />
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
          </div>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Nuestros productos
          </h2>

          <ProductGrid
            className={
              'mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'
            }
            products={products}
          />

          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
