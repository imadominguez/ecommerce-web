import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  // Verifica si el usuario existe
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: 'Usuario no encontrado' },
      { status: 404 }
    );
  }

  // Genera un token único
  const token = generateToken();
  await saveToken(user.email, token); // Guardar el token en la BD con su expiración

  // Enviar email de restablecimiento
  const resetUrl = `${process.env.NEXT_PUBLIC_URL}/forgot-password/${token}`;
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: 'imanol.desarrolloweb@gmail.com',
    subject: 'Cambiar contrasena',
    html: `<p>Click <a href="${resetUrl}?email=${user.email}">aqui</a> para resetear su contrasena.</p>`,
  });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}
async function saveToken(
  id: string,
  token: string,
  expiresInHours: number = 1
): Promise<void> {
  try {
    const expires = new Date(Date.now() + expiresInHours * 60 * 60 * 1000); // Establece la fecha de expiración
    await db.verificationToken.create({
      data: {
        identifier: id,
        token,
        expires,
      },
    });
    console.log('Token guardado exitosamente');
  } catch (error) {
    console.error('Error al guardar el token:', error);
  }
}
