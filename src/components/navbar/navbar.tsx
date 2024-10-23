import Link from 'next/link';
import Image from 'next/image';
import { Links } from './navbar-link';
import { UserButton } from '../button/user-button';
import { ModeToggle } from '../button/toggle-mode-button';
import { ShoppingCart } from './shopping-cart-icon';
import { SearchInput } from '../product/search-input';
import { LINKS_NAVBAR } from '@/lib/constant';
import { NavbarMobile } from './navbar-mobile';
import { Suspense } from 'react';

export const Navbar = () => {
  return (
    <header className="sticky left-0 right-0 top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between bg-background p-3 lg:px-8">
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
          <Suspense fallback={<div>Loading...</div>}>
            <SearchInput />
          </Suspense>
        </div>
        <ShoppingCart />
        <div className="ml-1">
          <Suspense fallback={<div>Loading...</div>}>
            <UserButton />
          </Suspense>
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
