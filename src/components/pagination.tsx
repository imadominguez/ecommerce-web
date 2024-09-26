'use client';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

import { generatePagination } from '@/utils/generated-pagination-numbers';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
interface Props {
  totalPages: number;
}

export const Paginations = ({ totalPages }: Props) => {
  // Obtener la ruta actual y los parámetros de búsqueda
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Obtener el número de página actual de los parámetros de búsqueda
  const pageString = searchParams.get('page') ?? '1';
  let currentPage = isNaN(+pageString) ? 1 : +pageString;

  // Si la página actual es menor a 1 o pageString no es un número, redirigir a la página 1
  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  // Función para crear la URL de una página específica
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    // Si pageNumber es '...', devuelve la URL actual sin cambios
    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`;
    }

    // Si pageNumber es 0, devuelve la URL sin el parámetro 'page'
    if (+pageNumber === 0) {
      return `${pathname}`;
    }

    // Si pageNumber es mayor que el total de páginas, devuelve la URL actual sin cambios
    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    // Establecer el parámetro 'page' en el nuevo número de página
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generar la lista de páginas para mostrar en la paginación
  const allPages = generatePagination(+currentPage, +totalPages);

  if (totalPages === 0) {
    return null;
  }

  // return (
  //   <div className="mb-10 mt-10 flex justify-center text-center">
  //     <nav aria-label="Page navigation example">
  //       <ul className="list-style-none flex items-center gap-x-1">
  //         {/* Botón para ir a la página anterior */}
  //         <li className="page-item">
  //           <Link
  //             // className="mr-8 "
  //             href={createPageUrl(+currentPage - 1)}
  //             aria-disabled="true"
  //             // scroll={false}
  //           >
  //             <ArrowLeftCircleIcon size={20} />
  //           </Link>
  //         </li>

  //         {/* Lista de páginas generadas */}
  //         {allPages.map((page, index) => (
  //           <li key={`${page} + ${index} + 1`} className="page-item">
  //             <Link
  //               className={clsx(
  //                 'relative z-10 inline-flex items-center rounded px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  //                 {
  //                   'bg-primary text-white shadow-md hover:bg-primary/80':
  //                     page === +currentPage,
  //                   'hover:bg-muted': page !== +currentPage,
  //                 }
  //               )}
  //               href={createPageUrl(page)}
  //               // scroll={false}
  //             >
  //               {page}
  //             </Link>
  //           </li>
  //         ))}

  //         {/* Botón para ir a la página siguiente */}
  //         <li className="page-item">
  //           <Link
  //             // className='ml-8'
  //             href={createPageUrl(+currentPage + 1)}
  //             // scroll={false}
  //           >
  //             <ArrowRightCircleIcon size={20} />
  //           </Link>
  //         </li>
  //       </ul>
  //     </nav>
  //   </div>
  // );
  return (
    <div className="mb-10 mt-10 flex justify-center text-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(currentPage - 1)}
              aria-disabled={currentPage <= 1}
            />
          </PaginationItem>

          {allPages.map((page, index) => (
            <PaginationItem key={`${page}-${index}`}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={createPageUrl(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={createPageUrl(currentPage + 1)}
              aria-disabled={currentPage >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
