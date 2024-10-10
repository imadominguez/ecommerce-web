'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export const getOrders = async () => {
  try {
    const session = await auth();
    if (!session) {
      redirect('/login');
    }

    const orders = await db.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        OrderItem: {
          include: {
            product: true,
          },
        },
        OrderAddress: true,
      },
    });

    if (!orders) {
      return {
        ok: false,
        orders: [],
      };
    }

    return {
      ok: true,
      orders,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      orders: [],
    };
  }
};
