'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

export const BackRouteButton = () => {
  const { back } = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-7 w-7"
      onClick={() => back()}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Atras</span>
    </Button>
  );
};
