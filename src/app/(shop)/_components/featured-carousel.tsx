'use client';

import { ProductCard } from '@/components/product/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types/product';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

interface Props {
  productsFeatured: Product[];
}

export const FeaturedCarousel = ({ productsFeatured }: Props) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnMouseEnter: true,
          playOnInit: true,
        }),
      ]}
      opts={{
        align: 'start',
        loop: true,
      }}
      className="mx-auto w-full max-w-xs md:max-w-2xl lg:max-w-4xl"
    >
      <CarouselContent className="-ml-1">
        {productsFeatured.map((product) => (
          <CarouselItem key={product.id} className="pl-1 md:basis-1/3">
            <div className="p-1">
              <ProductCard product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
