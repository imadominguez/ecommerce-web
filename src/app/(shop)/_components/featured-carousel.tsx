'use client';

import { ProductCard } from '@/components/product/product-card';
import ReusableCarousel from '@/components/reusable-carousel';
import { CarouselItem } from '@/components/ui/carousel';
import type { Product } from '@/types/product';
import React from 'react';

interface Props {
  productsFeatured: Product[];
}

export const FeaturedCarousel = ({ productsFeatured }: Props) => {
  return (
    <ReusableCarousel
      autoplay
      loop
      autoplayInterval={2000}
      className="max-w-sm pr-3 md:max-w-3xl lg:max-w-full"
    >
      {productsFeatured.map((product) => (
        <CarouselItem
          key={product.id}
          className="basis-full md:basis-1/3 lg:basis-1/4"
        >
          <ProductCard product={product} />
        </CarouselItem>
      ))}
    </ReusableCarousel>
  );
};
