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
const LINKS_NAVBAR = [
  {
    name: 'Nuestra empresa',
    href: '/',
    isDisable: false,
  },
  {
    name: 'Tienda online',
    href: '/products',
    isDisable: false,
  },
];
function NavbarLinks({
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
export const Navbar = () => {
  return (
    <header className="sticky left-0 right-0 top-0 z-50 flex w-full items-center justify-between border-b bg-background px-4 py-4 shadow-md">
      {/* mobile */}
      <Sheet>
        <SheetTrigger className="lg:hidden" asChild>
          <Button variant="outline" size={'icon'}>
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className="flex flex-col justify-between">
          <nav className="flex list-none flex-col items-start gap-y-5 pt-5">
            <NavbarLinks links={LINKS_NAVBAR} />
          </nav>
          <div>
            <UserButton />

            <Suspense
              fallback={<div className="animate-pulse bg-slate-600"></div>}
            >
              <DashboardLink />
            </Suspense>
          </div>
        </SheetContent>
      </Sheet>
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
        {/* <SearchInput /> */}
        <ShoppingCart />
        <div className="ml-1 hidden lg:block">
          <UserButton />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
