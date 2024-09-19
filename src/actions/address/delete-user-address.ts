'use server';

import { db } from '@/lib/db';

export const deleteUserAddress = async (userId: string) => {
  try {
    await db.userAddress.delete({
      where: { userId },
    });
  } catch (error) {
    console.log(error);
  }
};
