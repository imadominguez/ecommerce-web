import { cn } from '@/lib/utils';
import { currencyFormat } from '@/utils/currencyFormat';
import { Product } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
  products: Product[];
}

export const ProductGrid = ({ className, products }: Props) => {
  return (
    <section className={cn('', className)}>
      {products.map(({ title, id, slug, price, images, color }) => (
        <div key={id} className="group relative">
          <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 lg:h-80">
            <Link href={`/products/${slug}`}>
              <img
                alt={''}
                src={`/products/${images[0]}`}
                className="h-full w-full object-cover object-center transition-transform group-hover:scale-110 lg:h-full lg:w-full"
              />
            </Link>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link href={`/products/${slug}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {title}
                </Link>
              </h3>
              <p className="mt-1 text-sm font-semibold uppercase opacity-80">
                {color}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {currencyFormat(price)}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
