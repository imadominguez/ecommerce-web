// import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN ?? '',
});
export async function POST(req: Request) {
  const body = await req.json();

  const payment_id = body.data.id;

  // Obtenemos la orden a partir del external_reference
  const payment = await new Payment(client).get({ id: payment_id });

  if (payment.status === 'approved') {
    const order_id = payment.external_reference;
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
  }

  return NextResponse.json(null, { status: 200 });
}
