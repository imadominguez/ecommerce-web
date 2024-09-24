import { auth, signOut } from '@/auth';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';

export const UserButton = async () => {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type="submit" variant={'outline'} className="w-full">
          Cerrar sesion
        </Button>
      </form>
    );
  }

  return (
    <Link href={'/login'} className={buttonVariants({ variant: 'outline' })}>
      Ingresar
    </Link>
  );
};
