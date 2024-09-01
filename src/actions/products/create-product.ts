'use server';

import { Product } from '@/types/product';

export const createProduct = async (productData: Product) => {
  console.log(productData);
};
