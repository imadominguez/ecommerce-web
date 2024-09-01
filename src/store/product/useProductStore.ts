/* eslint-disable no-unused-vars */
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductState {
  title: string;
  description: string;
  inStock: number;
  categoryId: string;
  isFeatured: boolean;
  status: boolean;
  images: string[];
  setName: (title: string) => void;
  setDescription: (description: string) => void;
  setInStock: (inStock: number) => void;
  setCategory: (category: string) => void;
  setIsFeatured: (isFeatured: boolean) => void;
  setStatus: (status: boolean) => void;
  setImages: (images: string[]) => void;
  clearImages: () => void;
  clearStore: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      title: '',
      description: '',
      inStock: 0,
      categoryId: '',
      isFeatured: false,
      status: false,
      images: [],
      setName: (title) => set({ title }),
      setDescription: (description) => set({ description }),
      setInStock: (inStock) => set({ inStock }),
      setCategory: (categoryId) => set({ categoryId }),
      setIsFeatured: (isFeatured) => set({ isFeatured }),
      setStatus: (status) => set({ status }),
      setImages: (images) => set({ images }),
      clearImages: () => set({ images: [] }),
      clearStore: () =>
        set({
          title: '',
          description: '',
          inStock: 0,
          categoryId: '',
          isFeatured: false,
          status: false,
          images: [],
        }),
    }),
    {
      name: 'product-storage', // nombre de la clave en el storage
      getStorage: () => localStorage, // cambiar a sessionStorage si prefieres
    }
  )
);
