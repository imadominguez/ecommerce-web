import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { NavbarLinks } from './(components)/components/navbar-links';
import { SearchInput } from '@/components/product/search-input';
import { ModeToggle } from '@/components/button/toggle-mode-button';
import Image from 'next/image';
import { CustomLinkButton } from '@/components/button/custom-link-button';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[2000px] lg:grid-cols-[280px_1fr]">
      <aside className="relative top-0 hidden border-r bg-background lg:block lg:min-h-screen">
        <div className="sticky top-0 flex h-screen flex-col gap-2">
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
            <CustomLinkButton variant={'outline'} href="/">
              Ir a la tienda
            </CustomLinkButton>
          </div>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <NavbarLinks className="grid gap-2 text-lg font-medium" />

              <div className="mt-auto">
                <CustomLinkButton variant={'outline'} href="/">
                  Ir a la tienda
                </CustomLinkButton>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchInput />
            </Suspense>
          </div>
          <ModeToggle />
        </header>
        {children}
      </div>
    </div>
  );
}
