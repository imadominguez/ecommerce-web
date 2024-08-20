import { db } from '@/lib/db';
import { unstable_noStore } from 'next/cache';

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getAllProducts = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(page)) {
    page = 1;
  }
  if (page < 1) {
    page = 1;
  }

  const products = await db.product.findMany({
    skip: (page - 1) * take,
    take: take,
  });
  if (!products.length) {
    throw new Error('no se pudo cargar');
  }
  const count = await db.product.count();
  const pages = Math.ceil(count / take);

  return {
    currentPage: page,
    totalPages: pages,
    products,
  };
};
