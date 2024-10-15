// import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const payment_id = body.data.id;

  // Obtenemos la orden a partir del external_reference
  const response = await fetch(
    `https://api.mercadopago.com/v1/payments/${payment_id}`,
    {
      method: 'GET',
    }
  );

  const data = await response.json();
  const order_id = data.external_reference;

  // Actualizamos el isPaid de la orden en la base de datos
  await db.order.update({
    where: {
      id: order_id,
    },
    data: {
      isPaid: true,
      paidAt: new Date(),
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/orders`);
  revalidatePath(`/orders/${order_id}`);
  revalidatePath(`/dashboard/orders`);
  revalidatePath(`/dashboard/orders/${order_id}`);

  return NextResponse.json({}, { status: 200 });
}
