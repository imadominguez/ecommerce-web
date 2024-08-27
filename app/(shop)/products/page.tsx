import { getAllProducts } from '@/actions/products/get-all-products';
import { Pagination } from '@/components/pagination';
import { ProductGrid } from './components/product-grid';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getAllProducts({ page });
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <ProductGrid
          className={
            'mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
          }
          products={products}
        />

        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
