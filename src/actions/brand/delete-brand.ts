'use server';

import { db } from '@/lib/db';

export const deleteBrand = async (id: string) => {
  try {
    const foundProductByBrand = await db.product.findMany({
      where: {
        brandId: id,
      },
    });

    if (foundProductByBrand.length > 0) {
      return {
        ok: false,
        message:
          'Debes eliminar o reasignar los productos asociados a esta marca antes de eliminarla.',
      };
    }
    await db.brand.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      message: 'Marca eliminada correctamente.',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Hubo un error al intentar eliminar la marca.',
    };
  }
};
