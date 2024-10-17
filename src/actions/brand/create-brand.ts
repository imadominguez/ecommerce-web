'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const createBrand = async (brandName: string) => {
  try {
    const findBrand = await db.brand.findMany({
      where: {
        name: brandName,
      },
    });

    if (!findBrand) {
      return {
        ok: false,
        message: 'Ya existe la marca que quieres crear',
      };
    }

    const brandFormatted =
      brandName.charAt(0).toUpperCase() + brandName.slice(1).toLowerCase();

    await db.brand.create({
      data: {
        name: brandFormatted,
      },
    });

    revalidatePath('/dashboard');

    return {
      ok: true,
      message: 'Marca creada correctamente',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Algo ocurrio al crear la marca',
    };
  }
};
