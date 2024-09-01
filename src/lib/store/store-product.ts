/* eslint-disable no-unused-vars */
import { Product } from '@/types/product';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
interface ProductState {
  product: Product;
  addStock: () => void;
  changeStatus: (status: string) => void;
}

const useProductStore = create<ProductState>()(
  devtools((set) => ({
    product: {
      title: '',
      description: '',
      inStock: 0,
      categoryId: '',
      isFeatured: false,
      status: false,
      images: [],
    },
    addStock: () => {},
    changeStatus: (status) => {},
  }))
);
