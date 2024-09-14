import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { NavbarLinks } from './(components)/components/navbar-links';
import { SearchInput } from '@/components/product/search-input';
import { ModeToggle } from '@/components/button/toggle-mode-button';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* logo */}
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Image
              src={'/imgs/logo-si.png'}
              width={120}
              height={40}
              alt="logo"
            />
          </div>
          <div className="flex-1">
            <NavbarLinks className="grid items-start px-2 text-sm font-medium lg:px-4" />
          </div>
          <div className="mt-auto p-4">
            <Link
              href={'/'}
              className={buttonVariants({
                size: 'sm',
                className: 'w-full',
                variant: 'default',
              })}
            >
              Ir a la tienda
            </Link>
          </div>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <NavbarLinks className="grid gap-2 text-lg font-medium" />

              <div className="mt-auto">
                <Link
                  href={'/'}
                  className={buttonVariants({
                    size: 'sm',
                    className: 'w-full',
                    variant: 'default',
                  })}
                >
                  Ir a la tienda
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <SearchInput />
          </div>
          <ModeToggle />
        </header>
        {children}
      </div>
    </div>
  );
}
