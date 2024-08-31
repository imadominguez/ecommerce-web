import { db } from '@/lib/db';

interface PaginationOptions {
  page?: number;
  take?: number;
  title?: string;
  isActive?: boolean;
  inStock?: number | undefined;
}

export const getProducts = async ({
  page = 1,
  take = 12,
  title,
  isActive,
  inStock,
}: PaginationOptions) => {
  if (isNaN(page)) {
    page = 1;
  }
  if (page < 1) {
    page = 1;
  }

  try {
    const products = await db.product.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
        isActive,
        inStock,
      },

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
      totalProducts: count,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      products: [],
      totalPages: 0,
      currentPage: 0,
      totalProducts: 0,
    };
  }
};