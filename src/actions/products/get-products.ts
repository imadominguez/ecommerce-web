'use server';

import { db } from '@/lib/db';
import { Color } from '@/types/product';

interface PaginationOptions {
  page?: number;
  take?: number;
  title?: string;
  isActive?: boolean;
  inStock?: number | undefined;
  isFeatured?: boolean;
  category?: string;
  pmin?: number;
  pmax?: number;
  color?: string;
}

export const getProducts = async ({
  page = 1,
  take = 12,
  title,
  isActive,
  inStock,
  isFeatured,
  category,
  pmin,
  pmax,
  color,
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
        category: {
          id: category === 'null' ? undefined : category,
        },
        price: {
          gte: pmin || undefined, // Si pmin es 0 o undefined, no aplica el filtro.
          lte: pmax || undefined, // Si pmax es 0 o undefined, no aplica el filtro.
        },
        color: color as Color,
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
        error: null,
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
      error: null,
      currentPage: page,
      totalPages: pages,
      products,
      totalProducts: count,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: true,
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

    return product;
  } catch (error) {
    return null;
  }
};
