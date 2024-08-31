import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getCategories } from '@/actions/categories/get-categories';

interface CategoryState {
  categories: { id: string; name: string }[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  clearStore: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      loading: false,
      error: null,
      fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
          const { ok, message, categories } = await getCategories();
          if (ok) {
            set({ categories, loading: false });
          } else {
            set({ error: message, loading: false });
          }
        } catch (error) {
          set({ error: 'Error fetching categories', loading: false });
        }
      },
      clearStore: () =>
        set({
          categories: [],
          loading: false,
          error: null,
        }),
    }),
    {
      name: 'category-storage', // nombre de la clave en el storage
      getStorage: () => localStorage, // cambiar a sessionStorage si prefieres
    }
  )
);
