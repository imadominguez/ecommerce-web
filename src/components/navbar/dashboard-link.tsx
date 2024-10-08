'use client';

import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export const DashboardLink = () => {
  const { data: session } = useSession();

  if (!session) return null;

  if (session?.user.role !== 'admin') return null;

  return (
    <div className="ml-1">
      <Link
        href={'/dashboard'}
        className={buttonVariants({
          variant: 'standard',
          size: 'sm',
          className: 'w-full',
        })}
      >
        Dashboard
      </Link>
    </div>
  );
};
