'use server';

import { db } from '@/lib/db';
import { UserAddress } from '@/types/address';

export const getUserAddress = async (userId: string): Promise<UserAddress> => {
  try {
    const address = await db.userAddress.findUnique({
      where: { userId },
    });

    if (!address) {
      return {
        firstName: '',
        lastName: '',
        isApartment: false,
        city: '',
        postalCode: '',
        phone: '',
        street: '',
        streetNumber: '',
        address2: '',

        floor: '',
        apartment: '',
        taxType: 'consumidor_final',
        cuitCuil: '',
        businessName: '',
        vatCondition: 'responsable_inscripto',
      };
    }

    return {
      ...address,
      address2: address.address2 || '',
      floor: address.floor || '',
      apartment: address.apartment || '',
      cuitCuil: address.cuitCuil || '',
      businessName: address.businessName || '',
      vatCondition: address.vatCondition || 'responsable_inscripto',
    };
  } catch (error) {
    console.log(error);
    return {
      firstName: '',
      lastName: '',
      city: '',
      postalCode: '',
      phone: '',
      street: '',
      streetNumber: '',
      address2: '',
      isApartment: false,
      floor: '',
      apartment: '',
      taxType: 'consumidor_final',
      cuitCuil: '',
      businessName: '',
      vatCondition: 'responsable_inscripto',
    };
  }
};
