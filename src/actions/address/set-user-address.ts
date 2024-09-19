'use server';

import { db } from '@/lib/db';
import type { UserAddress } from '@/types/address';

export const setUserAddress = async (userId: string, address: UserAddress) => {
  try {
    const userAddress = await db.userAddress.findUnique({
      where: { userId },
    });

    // Formatear los campos de texto para que no tengan espacios al principio y al final
    // Esto es importante para que las validaciones de los campos de texto funcionen correctamente
    // y para que los datos se guarden de forma consistente en la base de datos
    // y tambien, poner en mayusculas la primer letra del nombre, apellido, ciudad, calle, etc.

    address.firstName = address.firstName
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    address.lastName = address.lastName
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    address.city = address.city
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    address.street = address.street
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    address.streetNumber = address.streetNumber
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    address.vatCondition =
      address.taxType === 'consumidor_final' ? undefined : address.taxType;

    if (!userAddress) {
      await db.userAddress.create({
        data: {
          ...address,
          userId,
          countryId: 'AR',
        },
      });
    } else {
      await db.userAddress.update({
        where: { userId },
        data: address,
      });
    }

    return {
      ok: true,
      message: 'Dirección guardada correctamente',
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'Error al guardar la dirección',
    };
  }
};
