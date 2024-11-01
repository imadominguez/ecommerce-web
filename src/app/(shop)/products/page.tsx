import { Paginations } from '@/components/pagination';
import { ProductGrid } from './components/product-grid';
import { notFound } from 'next/navigation';
import { getProducts } from '@/actions/products/get-products';
import { FilterProduct } from './components/filter-product';
import { getCategories } from '@/actions/categories/get-categories';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SkeletonCard } from '@/components/skeleton-card';

interface Props {
  searchParams: {
    page?: string;
    query?: string;
    category?: string;
    pmin?: string;
    pmax?: string;
    color?: string;
  };
}

export const metadata: Metadata = {
  title: 'Cartuchos de Tinta, Tóneres y Accesorios de PC',
  description:
    'En Servicios Integrados en Olavarría, encuentra cartuchos de tinta y tóner para impresoras Epson y HP, además de una amplia gama de accesorios de PC como USBs y discos externos. Calidad y cercanía para todas tus necesidades tecnológicas',
  keywords: [
    'cartuchos de tinta Epson Olavarría',
    'cartuchos de tinta HP Olavarría',
    'tóners para impresoras',
    'accesorios de PC',
    'USB',
    'cartuchos de impresora',
    'suministros de impresión',
    'tienda de tecnología',
  ],
};

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const category = searchParams.category || undefined;
  const pmin = Number(searchParams.pmin) || 0;
  const pmax = Number(searchParams.pmax) || 0;
  const color = searchParams.color || undefined;
  const title = searchParams.query || undefined;

  const { products, totalPages, ok, error } = await getProducts({
    page,
    category,
    pmin,
    pmax,
    color,
    title,
  });

  const categories = await getCategories();

  if ((!ok && error) || (!categories.ok && categories.error)) {
    notFound();
  }
  return (
    <>
      <div
        style={{ minHeight: 'calc(100dvh - 40px - 240px)' }}
        className="relative mx-auto grid max-w-7xl gap-0 bg-background px-4 pt-5 sm:px-6 lg:max-w-7xl lg:grid-cols-4 lg:gap-8 lg:px-8"
      >
        <div className="lg:col-span-1">
          <FilterProduct {...searchParams} categories={categories.categories} />
        </div>

        <div className="relative lg:col-span-3">
          <Suspense key={title} fallback={<SkeletonCard />}>
            <ProductGrid
              className={'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'}
              products={products}
            />
          </Suspense>

          <Paginations totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
