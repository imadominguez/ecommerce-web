import { getStockProduct } from '@/actions/products/get-stock-product';
import { cn } from '@/lib/utils';
import React from 'react';
import { Badge } from '../ui/badge';

interface Props {
  slug: string;
}

export const StockLabel = async ({ slug }: Props) => {
  const stock = await getStockProduct({ slug });

  if (!stock) {
    return <span>Sin stock</span>;
  }
  const inStock = stock.inStock > 0;
  return (
    <span className={cn('text-xl font-bold')}>
      {/* {stock.inStock === 0 ? 'No hay stock' : `Stock: ${stock.inStock}`} */}
      {!inStock && 'No hay stock'}
      {inStock && (
        <>
          Stock:{' '}
          {stock.inStock < 5 ? (
            <Badge variant={'warning'}>{stock.inStock}</Badge>
          ) : (
            <Badge variant={'stock'}>{stock.inStock}</Badge>
          )}
        </>
      )}
    </span>
  );
};
