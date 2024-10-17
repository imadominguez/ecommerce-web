'use client';

import { CustomLinkButton } from '@/components/button/custom-link-button';
import { usePathname, useSearchParams } from 'next/navigation';
interface Props {
  page?: string;
}

export const PaginationOrders = ({ page }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const currentPage = page ? +page : 1;

  const generateLink = (value: string) => {
    if (value === 'prev') {
      params.set('page', String(currentPage === 1 ? 1 : currentPage + 1));
    }
    if (value === 'post') {
      params.set('page', String(currentPage + 1));
    }
    return `${pathname}?${params}`;
  };
  return (
    <div className="flex items-center space-x-2">
      <CustomLinkButton href={generateLink('prev')} variant="outline" size="sm">
        Anterior
      </CustomLinkButton>
      <CustomLinkButton href={generateLink('post')} variant="outline" size="sm">
        Siguiente
      </CustomLinkButton>
    </div>
  );
};
