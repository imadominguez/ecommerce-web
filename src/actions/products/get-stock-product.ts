'use server';

import { db } from '@/lib/db';

interface Props {
  slug: string;
}

export const getStockProduct = async ({ slug }: Props) => {
  try {
    const stock = await db.product.findUnique({
      where: {
        slug,
      },
      select: {
        inStock: true,
      },
    });

    return stock;
  } catch (error) {
    console.log(error);

    return null;
  }
};
