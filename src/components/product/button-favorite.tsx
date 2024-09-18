'use client';

import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { favoriteProduct } from '@/actions/products/favorite-product';

export const ButtonFavorite = ({
  productId,
  userId,
}: {
  productId: string;
  userId?: string;
}) => {
  console.log({ userId });
  if (!userId) {
    return null;
  }

  const handleFavorite = async () => {
    await favoriteProduct({ productId, userId });
  };
  return (
    <Button
      size={'icon'}
      className="absolute right-2 top-2 rounded-full text-white shadow-md"
      onClick={handleFavorite}
    >
      <Heart className="h-5 w-5" />
    </Button>
  );
};
