import { db } from '@/lib/db';
import { main } from '@/lib/seed/seed-database';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await db.product.findMany();
  if (!products) {
    return NextResponse.json({ message: 'No hay productos' }, { status: 404 });
  }
  return NextResponse.json(products, { status: 200 });
}

export async function POST(req: any) {
  const secretName: string = req.body?.secretName ?? '';

  if (!secretName) {
    return NextResponse.json(
      { message: 'El nombre del producto es requerido' },
      { status: 400 }
    );
  }
  if (secretName !== 'servicios-integrados') {
    return NextResponse.json(
      { message: 'Error en el servidor' },
      { status: 500 }
    );
  }

  await main()
    .then(() => {
      return NextResponse.json({ message: 'Datos sembrados' }, { status: 200 });
    })
    .catch((error) => {
      return NextResponse.json({ message: error.message }, { status: 500 });
    });
}
