import { getProductBySlug, getProducts } from '@/actions/products/get-products';
import { PageContainer } from '@/components/layout/page-container';
import { ProductImage } from '@/components/product/product-image';
import { StockLabel } from '@/components/product/stock-label';
import ReusableCarousel from '@/components/reusable-carousel';
import { Title } from '@/components/title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/lib/db';
import { currencyFormat } from '@/utils/currencyFormat';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
  params: {
    slug: string;
  };
}

const relatedProducts = [
  { name: 'Producto Relacionado 1', price: '$24.99' },
  { name: 'Producto Relacionado 2', price: '$29.99' },
  { name: 'Producto Relacionado 3', price: '$19.99' },
  { name: 'Producto Relacionado 4', price: '$34.99' },
  { name: 'Producto Relacionado 5', price: '$27.99' },
  { name: 'Producto Relacionado 6', price: '$22.99' },
];

export default async function ProductDetailPage({ params: { slug } }: Props) {
  const product = await getProductBySlug({ slug });

  if (!product) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images Carousel */}
        <div className="relative">
          <ReusableCarousel
            className="mx-auto max-w-lg"
            autoplay
            loop
            autoplayInterval={4000}
          >
            {product.images.map((img, index) => (
              <CarouselItem key={index} className="basis-full">
                <ProductImage
                  width={500}
                  height={500}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-96 w-full object-cover"
                />
              </CarouselItem>
            ))}
          </ReusableCarousel>
          <div className="mt-4 flex justify-center space-x-4">
            {product.images.map((img, index) => (
              <button key={index}>
                <ProductImage
                  width={500}
                  height={500}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-28 w-28 object-cover md:h-44 md:w-44"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <Title title={product.title} />
          {/* Valoracion estrellas */}
          {/* <div className="mb-4 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-current text-yellow-400"
                />
              ))}
            </div>
            <span className="ml-2 opacity-80">(150 reseñas)</span>
          </div> */}
          <p className="mb-4 text-2xl font-bold">
            {currencyFormat(product.price)}
          </p>
          <Suspense
            fallback={
              <div className="max-w-[60px] animate-pulse rounded-md bg-muted">
                &nbsp;
              </div>
            }
          >
            <StockLabel slug={slug} />
          </Suspense>
          <p className="mb-6 opacity-80">{product.description}</p>
          {/* Color */}
          {product.color && (
            <div className="mb-6">
              <h3 className="mb-2 font-semibold">Color</h3>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blanco">Blanco</SelectItem>
                  <SelectItem value="negro">Negro</SelectItem>
                  <SelectItem value="gris">Gris</SelectItem>
                  <SelectItem value="azul">Azul</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="mb-8 flex space-x-4">
            <Button className="flex-1 uppercase">
              <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al carrito
            </Button>
            {/* Product Favorite */}
            {/* <Button variant="outline">
              <Heart className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <p className="opacity-80">{product.fullDescription}</p>
          </TabsContent>
          <TabsContent value="specifications">
            <ul className="list-disc pl-5 opacity-80">
              <li>Material: 100% Algodón</li>
              <li>Peso: 180g/m²</li>
              <li>Cuello: Redondo reforzado</li>
              <li>Costuras: Dobles en mangas y dobladillo</li>
              <li>Cuidado: Lavado a máquina, secado en tendedero</li>
              <li>Origen: Fabricado en España</li>
            </ul>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="mb-2 flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-current text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm opacity-80">Juan P.</span>
                </div>
                <p className="opacity-80">
                  Excelente calidad, muy cómoda y el color es exactamente como
                  se muestra en la imagen. Definitivamente compraré más.
                </p>
              </div>
              <div className="border-b pb-4">
                <div className="mb-2 flex items-center">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-current text-yellow-400"
                      />
                    ))}
                    {[...Array(1)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm opacity-80">María L.</span>
                </div>
                <p className="opacity-80">
                  Buena camiseta, aunque esperaba que fuera un poco más gruesa.
                  Aun así, la calidad es buena y el ajuste es perfecto.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products Carousel */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Productos relacionados</h2>
        {/* <Carousel className="mx-auto w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          <CarouselContent>
            {relatedProducts.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <Image
                        src={`/placeholder.svg?height=200&width=200&text=Related+Product+${index + 1}`}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="mb-4 h-48 w-full rounded-md object-cover"
                      />
                      <h3 className="mb-2 text-lg font-semibold">
                        {product.name}
                      </h3>
                      <p className="opacity-80">{product.price}</p>
                      <Button className="mt-4 w-full">Ver detalles</Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel> */}
        <ReusableCarousel autoplay loop autoplayInterval={2000}>
          {relatedProducts.map((product, index) => (
            <CarouselItem key={index} className="basis-full pl-4 md:basis-1/4">
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=Related+Product+${index + 1}`}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="mb-4 h-48 w-full rounded-md object-cover"
                  />
                  <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
                  <p className="opacity-80">{product.price}</p>
                  <Button className="mt-4 w-full">Ver detalles</Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </ReusableCarousel>
      </div>
    </div>
  );
}
