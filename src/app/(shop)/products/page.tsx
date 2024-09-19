import { Pagination } from '@/components/pagination';
import { ProductGrid } from './components/product-grid';
import { notFound } from 'next/navigation';
import { getProducts } from '@/actions/products/get-products';
import { Separator } from '@/components/ui/separator';
import { FilterProduct } from './components/filter-product';
import { getCategories } from '@/actions/categories/get-categories';
import { Title } from '@/components/title';

interface Props {
  searchParams: {
    page?: string;
    category?: string;
    pmin?: string;
    pmax?: string;
    color?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const category = searchParams.category;
  const pmin = Number(searchParams.pmin) || 0;
  const pmax = Number(searchParams.pmax) || 0;
  const color = searchParams.color || undefined;

  const { products, totalPages, ok, error } = await getProducts({
    page,
    category,
    pmin,
    pmax,
    color,
  });

  const categories = await getCategories();

  if ((!ok && error) || (!categories.ok && categories.error)) {
    notFound();
  }
  return (
    <>
      <div
        style={{ minHeight: 'calc(100dvh - 40px - 240px)' }}
        className="relative mx-auto grid max-w-7xl gap-0 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:grid-cols-4 lg:gap-8 lg:px-8"
      >
        <div className="border-r lg:col-span-1">
          <FilterProduct {...searchParams} categories={categories.categories} />
        </div>

        <div className="relative lg:col-span-3">
          <div className="sticky top-0 z-50 bg-background py-4">
            <Title title="Productos" />

            <Separator />
          </div>

          <ProductGrid
            className={
              'mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
            }
            products={products}
          />

          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
