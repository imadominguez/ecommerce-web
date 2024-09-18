'use client';

import { Heart } from 'lucide-react';
import { Button } from '../ui/button';

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

  return (
    <Button
      size={'icon'}
      className="absolute right-2 top-2 rounded-full text-white shadow-md"
    >
      <Heart className="h-5 w-5" />
    </Button>
  );
};
