'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReusableCarouselProps {
  children: React.ReactNode;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  showControls?: boolean;
  className?: string;
  gap?: string | number;
}

export default function ReusableCarousel({
  children,
  loop = false,
  autoplay = false,
  autoplayInterval = 3000,
  showControls = true,
  className,
  gap = 8,
}: ReusableCarouselProps) {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (autoplay && api) {
      const intervalId = setInterval(() => {
        api.scrollNext();
      }, autoplayInterval);

      return () => clearInterval(intervalId);
    }
  }, [api, autoplay, autoplayInterval]);

  return (
    <Carousel
      setApi={setApi}
      className={cn('w-full', className)}
      opts={{
        loop,
      }}
    >
      <CarouselContent className={`-ml-4 ${gap} flex`}>
        {children}
      </CarouselContent>
      {showControls && (
        <>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </>
      )}
    </Carousel>
  );
}
