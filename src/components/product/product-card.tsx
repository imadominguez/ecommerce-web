import Link from 'next/link';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { currencyFormat } from '@/utils/currencyFormat';
import { ProductImage } from './product-image';
import { Heart, Star } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { id, slug, images, title, price, color } = product;
  return (
    <div
      key={id}
      className="group relative overflow-hidden rounded-md border bg-muted shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative">
        <Link href={`/products/${slug}`}>
          <ProductImage
            alt={''}
            src={images[0]}
            width={300}
            height={300}
            className="h-48 w-full object-cover"
          />
        </Link>
        <Button
          size={'icon'}
          className="absolute right-2 top-2 rounded-full text-white shadow-md"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          {/* Title */}
          <div>
            <Link
              href={`/products/${slug}`}
              className="md:text-md text-sm uppercase"
            >
              {title}
            </Link>
            <p className="text-sm opacity-50">BLACK</p>
          </div>
          {/* Stars */}
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="ml-1 text-sm opacity-50">4.5</span>
          </div>
        </div>
        {/* <div className="flex items-center justify-between text-xs">
          <p className="mt-1 font-semibold uppercase opacity-80">{color}</p>
          <p className="text-lg font-medium opacity-90">
            {currencyFormat(price)}
          </p>
        </div> */}
        <p className="mb-2 text-2xl font-bold">
          {currencyFormat(product.price)}
        </p>

        <p className="mb-4 text-sm font-semibold text-green-600">
          Envío gratis
        </p>
        <Button className="w-full">Agregar al carrito</Button>
      </div>
    </div>
  );
};
