/* eslint-disable no-unused-vars */
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductState {
  name: string;
  description: string;
  inStock: number;
  category: string;
  isFeatured: boolean;
  status: boolean;
  images: string[];
  setName: (name: string) => void;
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
      name: '',
      description: '',
      inStock: 0,
      category: '',
      isFeatured: false,
      status: false,
      images: [],
      setName: (name) => set({ name }),
      setDescription: (description) => set({ description }),
      setInStock: (inStock) => set({ inStock }),
      setCategory: (category) => set({ category }),
      setIsFeatured: (isFeatured) => set({ isFeatured }),
      setStatus: (status) => set({ status }),
      setImages: (images) => set({ images }),
      clearImages: () => set({ images: [] }),
      clearStore: () =>
        set({
          name: '',
          description: '',
          inStock: 0,
          category: '',
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
