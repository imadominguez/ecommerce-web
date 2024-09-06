'use server';

import { db } from '@/lib/db';

export const getCategories = async () => {
  try {
    const categories = await db.category.findMany();

    if (!categories) {
      return {
        ok: false,
        error: null,
        message: 'No hay categorias creadas.',
        categories: [],
      };
    }

    return {
      ok: true,
      error: null,
      categories,
      message: 'Todo ok.',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: true,
      message: 'Error al obtener las categorias.',
      categories: [],
    };
  }
};
