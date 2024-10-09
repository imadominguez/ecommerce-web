import { getProductBySlug, getProducts } from '@/actions/products/get-products';
import { ProductImage } from '@/components/product/product-image';
import { StockLabel } from '@/components/product/stock-label';
import ReusableCarousel from '@/components/reusable-carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { currencyFormat } from '@/utils/currencyFormat';
import { StarIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { AddToCart } from './components/add-to-cart';
import { Product } from '@/types/product';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params: { slug } }: Props) {
  const product = await getProductBySlug({ slug });
  const relatedProducts = await getProducts({
    take: 6,
    category: product?.categoryId,
  });

  if (!product) {
    notFound();
  }
  return (
    <section
      style={{ minHeight: 'calc(100dvh - 40px - 240px)' }}
      className="container mx-auto px-4 py-8 md:px-6"
    >
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div>
          <ReusableCarousel
            autoplay
            loop
            autoplayInterval={2500}
            className="aspect-square mx-auto max-w-sm rounded-lg object-cover"
          >
            {product.images.map((img: string, index: number) => (
              <CarouselItem key={index}>
                <ProductImage
                  src={img}
                  alt="Product Image"
                  width={600}
                  height={600}
                  className="aspect-square w-full rounded-lg object-cover"
                />
              </CarouselItem>
            ))}
          </ReusableCarousel>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {product.description}
          </p>
          <StockLabel slug={product.slug} />
          <div className="mt-4 flex items-center gap-0.5">
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
          </div>
          {product.color && (
            <div className="mt-4">
              <span>
                Color: {product.color === 'black' ? 'Negro' : product.color}
              </span>
            </div>
          )}
          <h2 className="mt-4 text-4xl font-bold">
            {currencyFormat(product.price)}
          </h2>

          <div className="my-8 grid">
            <AddToCart product={product} />

            {/* <Button className="flex-1 uppercase">
              <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al carrito
            </Button> */}
            {/* Product Favorite */}
            {/* <Button variant="outline">
              <Heart className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
      </div>
      {/* Related Products Carousel */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Productos relacionados</h2>
        <ReusableCarousel autoplay loop autoplayInterval={5000}>
          {relatedProducts.products.map((product: Product, index: number) => (
            <CarouselItem key={index} className="basis-full pl-4 md:basis-1/4">
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-0">
                  <ProductImage
                    src={product.images[0]}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="mb-4 h-48 w-full rounded-md object-cover"
                  />
                  <h3 className="mb-2 text-lg font-semibold">
                    {product.title}
                  </h3>
                  <p className="opacity-80">{currencyFormat(product.price)}</p>
                  <Button className="mt-4 w-full">Ver detalles</Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </ReusableCarousel>
      </div>
    </section>
  );
}
