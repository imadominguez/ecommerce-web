import { db } from '@/lib/db';

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
  if (products.length === 0) {
    return {
      ok: false,
      products: [],
      totalPages: 0,
      currentPage: 0,
      totalProducts: 0,
    };
  }
  const count = await db.product.count();
  const pages = Math.ceil(count / take);

  return {
    ok: true,
    currentPage: page,
    totalPages: pages,
    products,
  };
};
