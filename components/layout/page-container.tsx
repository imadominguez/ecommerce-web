import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: Props) => {
  return (
    <main
      className={cn(
        'container flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 lg:px-12',
        className
      )}
    >
      {children}
    </main>
  );
};
