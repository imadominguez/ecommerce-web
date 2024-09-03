import Link from 'next/link';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { currencyFormat } from '@/utils/currencyFormat';
import { ProductImage } from './product-image';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { id, slug, images, title, price, color } = product;
  return (
    <div key={id} className="group relative rounded-md bg-muted">
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-t-md bg-gray-200 lg:h-80">
        <Link href={`/products/${slug}`}>
          <ProductImage
            alt={''}
            src={images[0]}
            width={300}
            height={300}
            className="h-full w-full object-cover object-center transition-transform group-hover:scale-110 lg:h-full lg:w-full"
          />
        </Link>
      </div>
      <div className="mt-4 flex justify-between p-4 pt-1">
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
  );
};
