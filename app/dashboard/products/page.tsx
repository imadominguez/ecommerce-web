import { Suspense } from 'react';
import Link from 'next/link';
import { Loader2, PlusCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { PageContainer } from '@/components/layout/page-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductsAllTable } from './components/products-all-table';
import { ProductsInstockTable } from './components/products-instock-table';
import { ProductsInactiveTable } from './components/products-inactive-table';

export default function ProductsPage() {
  return (
    <PageContainer>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-max grid-cols-3">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="stock-0">Sin stock</TabsTrigger>
            <TabsTrigger value="disabled">Inactivos</TabsTrigger>
          </TabsList>
          <Link
            href={'/dashboard/add-product'}
            className={buttonVariants({
              size: 'sm',
            })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Producto
            </span>
          </Link>
        </div>

        <TabsContent value="all">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p>Cargando...</p>
              </div>
            }
          >
            <ProductsAllTable />
          </Suspense>
        </TabsContent>
        <TabsContent value="stock-0">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p>Cargando...</p>
              </div>
            }
          >
            <ProductsInstockTable />
          </Suspense>
        </TabsContent>

        <TabsContent value="disabled">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p>Cargando...</p>
              </div>
            }
          >
            <ProductsInactiveTable />
          </Suspense>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
