import { getProducts } from '@/actions/products/get-products';
import { ProductCard } from '@/components/product/product-card';
import { buttonVariants } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { FeaturedCarousel } from './featured-carousel';

export const ProductsFeatured = async () => {
  const {
    products: productsFeatured,
    ok,
    totalProducts,
  } = await getProducts({
    isFeatured: true,
  });

  if (!ok) {
    return null;
  }

  if (productsFeatured.length === 0 || totalProducts < 4) {
    const { ok, products: productsAll } = await getProducts({ take: 8 });

    if (!ok) {
      return null;
    }

    return (
      <div className="mx-auto grid w-full gap-3 py-16 sm:py-16 lg:max-w-none">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Productos destacados
        </h2>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {/* Aquí se mostrarán los productos destacados */}

          <FeaturedCarousel productsFeatured={productsAll} />
        </div>
        <div className="mt-7 flex items-center justify-center">
          <Link
            className={buttonVariants({
              variant: 'standard',
              size: 'lg',
              className: 'w-1/2',
            })}
            href="/products"
          >
            Ver tienda online
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h2 className="mb-8 text-center text-xl font-bold md:text-3xl">
        Productos destacados
      </h2>
      <FeaturedCarousel productsFeatured={productsFeatured} />

      <div className="mt-10 flex items-center justify-center">
        <Link
          className={buttonVariants({
            variant: 'standard',
            size: 'lg',
            className: 'w-1/2',
          })}
          href="/products"
        >
          Ver tienda online
        </Link>
      </div>
      <Separator className="mt-16" />
    </div>
  );
};
