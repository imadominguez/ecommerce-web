'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { MenuIcon } from 'lucide-react';
import { LINKS_NAVBAR } from '@/lib/constant';
import { Suspense } from 'react';
import { DashboardLink } from './dashboard-link';
import { NavbarLinks } from './navbar';
export const NavbarMobile = () => {
  return (
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
          <Suspense
            fallback={<div className="animate-pulse bg-slate-600"></div>}
          >
            <DashboardLink />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
};
