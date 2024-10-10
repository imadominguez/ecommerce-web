import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json(
    { message: 'Webhook received', body: req.body },
    { status: 200 }
  );
}
