import { Suspense } from 'react';
import Link from 'next/link';
import { Loader2, PlusCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { PageContainer } from '@/components/layout/page-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductsTable } from './components/products-table';
import { SkeletonTableProduct } from '@/components/product/skeleton/skeleton-table-product';

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || undefined;
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <PageContainer>
      <Tabs defaultValue="all">
        {/* Tabs */}
        <div className="flex items-center justify-between">
          <TabsList className="grid w-max grid-cols-3">
            <TabsTrigger className="text-xs uppercase" value="all">
              Todos
            </TabsTrigger>
            <TabsTrigger className="text-xs uppercase" value="stock-0">
              Sin stock
            </TabsTrigger>
            <TabsTrigger className="text-xs uppercase" value="disabled">
              Inactivos
            </TabsTrigger>
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

        {/* All Products */}
        <TabsContent value="all">
          <Suspense
            key={query ?? '' + currentPage}
            fallback={<SkeletonTableProduct />}
          >
            <ProductsTable query={query} currentPage={currentPage} />
          </Suspense>
        </TabsContent>

        {/* Stock 0 */}
        <TabsContent value="stock-0">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p>Cargando...</p>
              </div>
            }
          >
            <ProductsTable
              inStock={0}
              query={query}
              currentPage={currentPage}
            />
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
            <ProductsTable
              isActive={false}
              query={query}
              currentPage={currentPage}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
