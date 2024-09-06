import { ProductCard } from '@/components/product/product-card';
import { cn } from '@/lib/utils';
import { Product } from '@prisma/client';

interface Props {
  className?: string;
  products: Product[];
}

export const ProductGrid = ({ className, products }: Props) => {
  if (products.length === 0) {
    return (
      <div className="flex h-[50dvh] flex-col items-center justify-center">
        <p className="mt-4 text-lg font-semibold">No hay productos</p>
      </div>
    );
  }

  return (
    <section className={cn('', className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};
