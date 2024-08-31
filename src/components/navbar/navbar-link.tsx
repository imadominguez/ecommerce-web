'use client';

import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';

interface LinksProps {
  href: string;
  name: string;
}
export function Links({ href, name }: LinksProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size: 'sm',
        className: 'w-full',
      })}
    >
      {name}
    </Link>
  );
}
