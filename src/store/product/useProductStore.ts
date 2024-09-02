/* eslint-disable no-unused-vars */
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductState {
  title: string;
  description: string;
  price: number;
  color?: 'blue' | 'red' | 'black' | 'yellow' | 'magenta' | undefined;
  inStock: number;
  slug: string;
  tags: string;
  images: File[];
  inDiscount: boolean;
  discount: number | null;
  isActive: boolean;
  isFeatured: boolean;
  brandId: string;
  categoryId: string;
  setName: (title: string) => void;
  setDescription: (description: string) => void;
  setInStock: (inStock: number) => void;
  setCategory: (category: string) => void;
  setIsFeatured: (isFeatured: boolean) => void;
  setImages: (images: File[]) => void;
  setIsActive: (isActive: boolean) => void;
  setInDiscount: (inDiscount: boolean) => void;
  setDiscount: (discount: number) => void;
  setPrice: (price: number) => void;
  setColor: (color: 'blue' | 'red' | 'black' | 'yellow' | 'magenta') => void;
  setSlug: (slug: string) => void;
  setTags: (tags: string) => void;
  setBrand: (brandId: string) => void;
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
      price: 0,
      color: undefined,
      slug: '',
      tags: '',
      inDiscount: false,
      discount: null,
      isActive: false,
      brandId: '',

      setName: (title) => set({ title }),
      setDescription: (description) => set({ description }),
      setInStock: (inStock) => set({ inStock }),
      setCategory: (categoryId) => set({ categoryId }),
      setIsFeatured: (isFeatured) => set({ isFeatured }),
      setImages: (images) => set({ images }),
      setIsActive: (isActive) => set({ isActive }),
      setInDiscount: (inDiscount) => set({ inDiscount }),
      setDiscount: (discount) => set({ discount }),
      setPrice: (price) => set({ price }),
      setColor: (color) => set({ color }),
      setSlug: (slug) => set({ slug }),
      setTags: (tags) => set({ tags }),
      setBrand: (brandId) => set({ brandId }),
      clearImages: () => set({ images: [] }),
      clearStore: () =>
        set({
          title: '',
          description: '',
          inStock: 0,
          categoryId: '',
          isFeatured: false,
          isActive: false,
          inDiscount: false,
          discount: 0,
          price: 0,
          color: undefined,
          slug: '',
          tags: '',
          brandId: '',
          images: [],
        }),
    }),
    {
      name: 'product-storage', // nombre de la clave en el storage
      getStorage: () => localStorage, // cambiar a sessionStorage si prefieres
    }
  )
);
