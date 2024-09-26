import { getProducts } from '@/actions/products/get-products';
import { Separator } from '@/components/ui/separator';
import { FeaturedCarousel } from './featured-carousel';
import { CustomLinkButton } from '@/components/button/link-to-shop';

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
        <h2 className="mb-4 text-2xl font-bold md:text-2xl">
          Productos destacados
        </h2>
        <div>
          {/* Aquí se mostrarán los productos destacados */}

          <FeaturedCarousel productsFeatured={productsAll} />
        </div>
        <div className="mt-7 flex items-center justify-center">
          <CustomLinkButton size={'lg'} className={'w-1/2'} href="/products">
            Ver tienda online
          </CustomLinkButton>
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
        <CustomLinkButton size={'lg'} className={'w-1/2'} href="/products">
          Ver tienda online
        </CustomLinkButton>
      </div>
      <Separator className="mt-16" />
    </div>
  );
};
