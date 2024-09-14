'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Home, Package, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

type DashboardLinks = {
  name: string;
  href: string;
  icon: JSX.Element;
};

const NAVBAR_DASHBOARD_LINKS: DashboardLinks[] = [
  {
    name: 'dashboard',
    href: '/dashboard',
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: 'ordenes',
    href: '/dashboard/orders',
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    name: 'productos',
    href: '/dashboard/products',
    icon: <Package className="h-4 w-4" />,
  },
];

interface Props {
  className?: string;
}

export const NavbarLinks = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {NAVBAR_DASHBOARD_LINKS.map(({ name, href, icon }) => {
        return (
          <Link
            key={name}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 capitalize text-muted-foreground transition-all hover:text-primary',
              {
                'bg-muted text-primary': pathname === href,
                'text-muted-foreground': pathname !== href,
              }
            )}
            href={href}
          >
            {icon}
            {name}
          </Link>
        );
      })}
    </nav>
  );
};
