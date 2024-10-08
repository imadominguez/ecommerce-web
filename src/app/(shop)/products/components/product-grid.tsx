import { CustomLinkButton } from '@/components/button/custom-link-button';
import { ProductCard } from '@/components/product/product-card';
import { ProductImage } from '@/components/product/product-image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { currencyFormat } from '@/utils/currencyFormat';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';

interface Props {
  className?: string;
  products: Product[];
}

export const ProductGrid = ({ className, products }: Props) => {
  if (products.length === 0) {
    return (
      <div className="flex h-[50dvh] flex-col items-center justify-center">
        <Search className={`mb-4 h-16 w-16`} />
        <h2 className={`mb-2 text-xl font-semibold`}>
          No se encontraron productos
        </h2>
        <p className={`text-center`}>
          Lo sentimos, no hay productos que coincidan con los filtros aplicados.
        </p>
        <CustomLinkButton
          href="/products"
          variant={'standard'}
          className={`mt-4 max-w-xs`}
        >
          Limpiar filtros
        </CustomLinkButton>
      </div>
    );
  }

  return (
    <section className={cn('', className)}>
      {products.map((product) => {
        const discountedPrice =
          product.inDiscount && product.discount
            ? product.price * (1 - product.discount / 100)
            : product.price;
        // <ProductCard key={product.id} product={product} />
        return (
          <div
            key={product.id}
            className={`group overflow-hidden rounded-lg bg-white shadow-xl transition-transform hover:scale-105 dark:border dark:border-gray-800 dark:bg-[#1a1d21]`}
          >
            <div className="relative w-full">
              <ProductImage
                width={300}
                height={300}
                className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                src={product.images[0] || '/placeholder.svg'}
                alt={product.title}
              />
              {product.inDiscount && product.discount && (
                <Badge
                  variant={'descount'}
                  className="absolute right-2 top-2 text-base"
                >
                  {product.discount}% OFF
                </Badge>
              )}
            </div>
            <div className="p-4">
              <h3
                className={`mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100`}
              >
                {product.title}
              </h3>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  {product.inDiscount && product.discount ? (
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-lg font-bold text-blue-600 dark:text-blue-400`}
                      >
                        {currencyFormat(discountedPrice)}
                      </span>
                      <span className={`text-sm line-through`}>
                        {currencyFormat(product.price)}
                      </span>
                    </div>
                  ) : (
                    <span
                      className={`text-lg font-bold text-blue-600 dark:text-blue-400`}
                    >
                      {currencyFormat(product.price)}
                    </span>
                  )}
                </div>
                {product.color && (
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm text-gray-600 dark:text-gray-300`}
                    >
                      Color:{' '}
                      {product.color === 'black' ? 'Negro' : product.color}
                    </span>
                  </div>
                )}
              </div>
              <CustomLinkButton
                variant={'shop'}
                href={`/products/${product.slug}`}
              >
                Comprar
              </CustomLinkButton>
            </div>
          </div>
        );
      })}
    </section>
  );
};
