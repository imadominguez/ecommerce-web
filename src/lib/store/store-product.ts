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
    product: {},
    addStock: () => {},
    changeStatus: (status) => {},
  }))
);
