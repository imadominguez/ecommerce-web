import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json(
    { message: 'Webhook received', body },
    { status: 200 }
  );

  //?? Obtener payment_id del body que viene en body.data.id

  // obtener cuerpo de la solicitud a mercado pago y obtener el id que recibo en external_reference
  //?? url de la solicitud a mercado pago: https://api.mercadopago.com/v1/payments/:id

  //?? obtener el id de la orden que recibo en external_reference
}
