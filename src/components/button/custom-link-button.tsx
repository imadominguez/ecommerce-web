import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/components/ui/button';

interface Props extends ButtonProps {
  className?: string;
  href: string;
  children: React.ReactNode;
}

export const CustomLinkButton = ({
  className,
  size,
  href,
  variant,
  children,
}: Props) => {
  return (
    <Link
      href={href}
      className={buttonVariants({
        size,
        className: cn('w-full', className),
        variant: variant || 'standard',
      })}
    >
      {children}
    </Link>
  );
};
