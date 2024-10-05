import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const ProductItemCartSkeleton = () => {
  return (
    <div className="flex animate-pulse border-b py-6">
      <Skeleton className="h-20 w-20 rounded-md" />
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-1/3" />
            {/* <Skeleton className="h-4 w-16" /> */}
          </div>
          <Skeleton className="mt-2 h-3 w-1/4" />
          {/* <Skeleton className="mt-1 h-3 w-1/4" /> */}
        </div>
        <div className="mt-4 flex flex-1 items-end justify-end">
          <Skeleton className="h-8 w-20" />
          {/* <Skeleton className="h-4 w-16" /> */}
        </div>
        {/* <Skeleton className="mt-2 h-3 w-1/5" /> */}
      </div>
    </div>
  );
};
