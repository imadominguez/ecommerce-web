import { auth } from '@/auth';
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
import {
  HomeIcon,
  LogIn,
  LogOut,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
} from 'lucide-react';
import { CustomLinkButton } from './custom-link-button';
import { logOut } from '@/actions/auth/sesion';

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
            <>
              <DropdownMenuItem>
                <Link href={'/dashboard'} className="flex items-center">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/orders'} className="flex items-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Mis ordenes
                </Link>
              </DropdownMenuItem>
            </>
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
            <form action={logOut}>
              <button type="submit" className="w-full">
                <span className="hidden md:block">Cerrar sesion</span>
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
