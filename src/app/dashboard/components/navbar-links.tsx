'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Package2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';

type DashboardLinks = {
  name: string;
  href: string;
};

const NAVBAR_DASHBOARD_LINKS: DashboardLinks[] = [
  {
    name: 'dashboard',
    href: '/dashboard',
  },
  {
    name: 'ordenes',
    href: '/dashboard/orders',
  },
  {
    name: 'productos',
    href: '/dashboard/products',
  },
];

export const NavbarLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>

      {NAVBAR_DASHBOARD_LINKS.map(({ name, href }) => {
        return (
          <Link
            key={name}
            className={cn(
              'capitalize transition-colors hover:text-foreground',
              {
                'text-foreground': pathname === href,
                'text-muted-foreground': pathname !== href,
              }
            )}
            href={href}
          >
            {name}
          </Link>
        );
      })}
      <Link
        className={buttonVariants({
          size: 'sm',
          className: 'w-max',
          variant: 'secondary',
        })}
        href={'/'}
      >
        Ir a la tienda
      </Link>
    </nav>
  );
};
