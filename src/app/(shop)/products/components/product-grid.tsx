import { ProductCard } from '@/components/product/product-card';
import { cn } from '@/lib/utils';
import { currencyFormat } from '@/utils/currencyFormat';
import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
  products: Product[];
}

export const ProductGrid = ({ className, products }: Props) => {
  return (
    <section className={cn('', className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};
