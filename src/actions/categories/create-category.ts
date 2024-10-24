'use server';

import { db } from '@/lib/db';

export const createCategory = async (value: string) => {
  try {
    const foundCategory = await db.category.findUnique({
      where: {
        name: value,
      },
    });

    if (foundCategory) {
      return {
        ok: false,
        message: 'Ya existe una categoria con ese nombre',
      };
    }

    await db.category.create({
      data: {
        name: value,
      },
    });

    return {
      ok: true,
      message: 'Categoria creada correctamente',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Hubo un error al crear la categoria',
    };
  }
};
