import Link from 'next/link';
import React, { Suspense } from 'react';
import Image from 'next/image';
import { MenuIcon, ShoppingCartIcon } from 'lucide-react';
import { Links } from './navbar-link';
import { UserButton } from '../button/user-button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { DashboardLink } from './dashboard-link';
import { ModeToggle } from '../button/toggle-mode-button';
import { ShoppingCart } from './shopping-cart-icon';
import { SearchInput } from '../product/search-input';
import { LINKS_NAVBAR } from '@/lib/constant';
import { NavbarMobile } from './navbar-mobile';

export const Navbar = () => {
  return (
    <header className="sticky left-0 right-0 top-0 z-50 flex w-full items-center justify-between border-b bg-background px-4 py-4 shadow-md">
      {/* mobile */}
      <NavbarMobile />
      <Link href="/" className="hidden flex-1 items-center gap-x-2 lg:flex">
        <Image
          src="/imgs/logo-si.png"
          alt="Your Company"
          width={120}
          height={100}
          className="h-10"
          priority
        />
      </Link>

      <nav className="hidden lg:block">
        <ul className="flex items-center gap-x-5">
          <NavbarLinks links={LINKS_NAVBAR} />
        </ul>
      </nav>

      <div className="flex flex-1 items-center justify-end gap-x-2">
        <div className="ml-5 w-full">
          <SearchInput />
        </div>
        <ShoppingCart />
        <div className="ml-1">
          <UserButton />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export function NavbarLinks({
  links,
}: {
  links: {
    name: string;
    href: string;
    isDisable: boolean;
  }[];
}) {
  return (
    <>
      {links.map((link, i) => (
        <li key={i} className="w-full">
          <Links {...link} />
        </li>
      ))}
    </>
  );
}
