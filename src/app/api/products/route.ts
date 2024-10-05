import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await db.product.findMany();
  if (!products) {
    return NextResponse.json({ message: 'No hay productos' }, { status: 404 });
  }
  return NextResponse.json(products, { status: 200 });
}
