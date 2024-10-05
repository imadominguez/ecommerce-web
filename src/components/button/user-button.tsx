import { auth, signOut } from '@/auth';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { LogIn, LogOut, Settings, ShoppingBag, User } from 'lucide-react';
import { CustomLinkButton } from './custom-link-button';

export const UserButton = async () => {
  const session = await auth();

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={'icon'}>
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {session.user.role === 'admin' ? (
            <DropdownMenuItem>
              <CustomLinkButton variant={'standard'} href={'/admin'}>
                Dashboard
              </CustomLinkButton>
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem>
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Mis Compras</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración del Perfil</span>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type="submit" className="w-full">
                Cerrar sesion
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link href={'/login'} className={buttonVariants({ variant: 'outline' })}>
      <LogIn className="mr-2 h-4 w-4" /> Ingresar
    </Link>
  );
};
