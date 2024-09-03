'use server';

import { db } from '@/lib/db';

interface PaginationOptions {
  page?: number;
  take?: number;
  title?: string;
  isActive?: boolean;
  inStock?: number | undefined;
  isFeatured?: boolean;
}

export const getProducts = async ({
  page = 1,
  take = 12,
  title,
  isActive,
  inStock,
  isFeatured,
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
        isFeatured,
      },
      orderBy: {
        inStock: 'asc',
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
    const count = await db.product.count({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
        isActive,
        inStock,
        isFeatured,
      },
    });
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

export const getProductBySlug = async ({ slug }: { slug: string }) => {
  try {
    const product = await db.product.findUnique({
      where: {
        slug,
      },
    });

    return {
      ok: true,
      product: product,
    };
  } catch (error) {
    return {
      ok: false,
      product: null,
    };
  }
};
