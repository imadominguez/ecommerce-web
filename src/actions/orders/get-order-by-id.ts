'use server';

import { db } from '@/lib/db';

export const getOrderById = async (id: string) => {
  try {
    const order = await db.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            product: {
              select: {
                title: true,
                slug: true,

                images: true,
              },
            },
          },
        },
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error('No se encontro la orden');
    }

    const { user, OrderAddress, OrderItem, ...res } = order;

    return {
      user,
      OrderAddress,
      OrderItem,
      order: res,
    };
  } catch (error: any) {
    console.log(error.message);

    return {
      user: {
        name: null,
        email: '',
      },
      OrderAddress: {},
      OrderItem: [],
      order: null,
    };
  }
};
