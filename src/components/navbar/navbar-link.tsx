'use client';

import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';

interface LinksProps {
  href: string;
  name: string;
}
export function Links({ href, name }: LinksProps) {
  const pathname = usePathname();
  // Verificar si la ruta actual es igual a la ruta del link para activar el estilo
  // por ejemplo, si estamos en la ruta /products, el link de la tienda online se activará
  // y si estamos en /products/[id], el link de la tienda online se mantendrá activo y el de nuestra empresa no

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant:
          pathname.startsWith('/products') && href !== '/'
            ? 'standard'
            : pathname === href
              ? 'standard'
              : 'outline',
        className: 'w-full',
      })}
    >
      {name}
    </Link>
  );
}
