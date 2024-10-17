'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

import { usePathname, useSearchParams } from 'next/navigation';

export const PaginationProductsTable = ({
  totalPages,
}: {
  totalPages: number;
}) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pathname = usePathname();

  const createPageURL = (page: string) => {
    const params = new URLSearchParams(searchParams);
    if (+page == 0) {
      params.set('page', '1');
    } else {
      params.set('page', page);
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="w-fit">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            scroll={false}
            href={createPageURL((currentPage - 1).toString())}
            className={cn('', {
              'cursor-not-allowed': currentPage === 1,
            })}
          />
        </PaginationItem>
        {currentPage > totalPages - 3 && (
          <PaginationItem>
            <PaginationLink
              scroll
              className={currentPage === 1 ? 'bg-muted' : 'border'}
              href={createPageURL('1')}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage > totalPages - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Array.from({ length: 3 }, (_, i) => currentPage + i - 1).map(
          (page) =>
            page >= 1 &&
            page <= totalPages && (
              <PaginationItem key={page}>
                <PaginationLink
                  scroll
                  className={page === currentPage ? 'bg-muted' : 'border'}
                  href={createPageURL(page.toString())}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
        )}
        {currentPage + 2 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage + 2 < totalPages && (
          <PaginationItem>
            <PaginationLink
              href={createPageURL(totalPages.toString())}
              className="border"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            scroll={false}
            href={createPageURL((currentPage + 1).toString())}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
