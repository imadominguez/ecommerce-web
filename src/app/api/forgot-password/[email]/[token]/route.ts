import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { isAfter, addMinutes } from 'date-fns';
const TOKEN_EXPIRATION_MINUTES = 60;
export async function POST(
  req: Request,
  { params }: { params: { token: string; email: string } }
) {
  const { password } = await req.json();

  // Verificar token
  const userId = await verifyToken(params.email, params.token);
  if (!userId) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 400 }
    );
  }

  // Hashear la nueva contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Actualizar la contraseña del usuario
  try {
    const user = await db.user.update({
      where: { email: params.email },
      data: { password: hashedPassword },
    });
    console.log({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Usuario no encontrado' },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

async function verifyToken(
  identifier: string,
  token: string
): Promise<string | null> {
  // Buscar el token usando los dos campos que forman la clave compuesta
  const resetToken = await db.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier, // Proporcionar el identifier (puede ser el email del usuario)
        token, // El token que fue enviado al usuario
      },
    },
    select: {
      expires: true,
    },
  });

  // Si no se encuentra el token, es inválido
  if (!resetToken) {
    return null;
  }

  // Verificar si el token ha expirado
  const tokenExpirationDate = addMinutes(
    resetToken.expires,
    TOKEN_EXPIRATION_MINUTES
  );
  if (isAfter(new Date(), tokenExpirationDate)) {
    // El token ha expirado
    return null;
  }

  // Si el token es válido, devolver el identifier (o podrías devolver otro valor como userId si lo tienes)
  return identifier;
}
