'use server';

import { db } from '@/lib/db';

interface Props {
  olavarria: number;
  otherCities: number;
}

export const updatedShippingPrice = async (
  shippingPrice: Props,
  id: string
) => {
  const { olavarria, otherCities } = shippingPrice;
  try {
    if (id) {
      await db.shippingPrice.update({
        data: {
          olavarria,
          otherCities,
        },
        where: {
          id,
        },
      });
      return {
        ok: true,
        message: 'Precios de envios actualizados',
      };
    }

    await db.shippingPrice.create({
      data: {
        olavarria,
        otherCities,
      },
    });

    return {
      ok: true,
      message: 'Precios de envios creados',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Hubo un error al actualizar los precios de envios.',
    };
  }
};
