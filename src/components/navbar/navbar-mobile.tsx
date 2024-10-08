'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button, buttonVariants } from '../ui/button';
import { MenuIcon } from 'lucide-react';
import { LINKS_NAVBAR } from '@/lib/constant';

import { DashboardLink } from './dashboard-link';
import { NavbarLinks } from './navbar';
import { useOpenSheet } from '@/hooks/useSheetOpen';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
export const NavbarMobile = () => {
  const { data: session } = useSession();
  const { isOpen, changeSheetState } = useOpenSheet();

  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={changeSheetState}>
      <SheetTrigger className="lg:hidden" asChild>
        <Button variant="outline" size={'icon'}>
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="flex flex-col justify-between">
        <nav className="flex list-none flex-col items-start gap-y-5 pt-5">
          {/* <NavbarLinks changeSheetState={changeSheetState} links={LINKS_NAVBAR} /> */}
          {LINKS_NAVBAR.map(({ href, name }, index) => (
            <li key={index} className="w-full">
              <Link
                onClick={() => changeSheetState()}
                href={href}
                className={buttonVariants({
                  variant:
                    pathname.startsWith('/products') && href !== '/'
                      ? 'standard'
                      : pathname === href
                        ? 'standard'
                        : 'outline',
                  size: 'sm',
                  className: 'w-full',
                })}
              >
                {name}
              </Link>
            </li>
          ))}
        </nav>
        {session && session.user.role === 'admin' ? (
          <div className="ml-1">
            <Link
              onClick={() => changeSheetState()}
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
        ) : null}
      </SheetContent>
    </Sheet>
  );
};
