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
  console.log({ payment });
  if (payment.status === 'approved') {
    const order_id = body.external_reference;
    try {
      const order = await db.order.update({
        where: { id: order_id },
        data: {
          isPaid: true,
          paidAt: new Date(),
        },
        include: {
          OrderItem: true, // Incluye los items de la orden para usarlos en salesHistory
        },
      });
      revalidatePath(`/orders`);
      revalidatePath(`/orders/${order_id}`);
      revalidatePath(`/dashboard/orders`);
      revalidatePath(`/dashboard/orders/${order_id}`);
      // Crear registros en SalesHistory para cada producto en la orden
      const salesHistoryPromises = order.OrderItem.map((item) => {
        return db.salesHistory.create({
          data: {
            productId: item.productId,
            quantity: item.quantity,
            date: new Date(), // Fecha de la venta, que es la fecha de pago
          },
        });
      });

      await Promise.all(salesHistoryPromises);
      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          message: 'No se pudo actualizar la orden',
        },
        {
          status: 400,
        }
      );
    }
  }

  return NextResponse.json(null, { status: 200 });
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Endpoint correcto',
    },
    { status: 200 }
  );
}
