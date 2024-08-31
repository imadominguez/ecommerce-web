'use server';

import { db } from '@/lib/db';

export const getCategories = async () => {
  try {
    const categories = await db.category.findMany();

    if (!categories) {
      return {
        ok: false,
        message: 'No hay categorias creadas.',
        categories: [],
      };
    }

    return {
      ok: true,
      categories,
      message: 'Todo ok.',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al obtener las categorias.',
      categories: [],
    };
  }
};
