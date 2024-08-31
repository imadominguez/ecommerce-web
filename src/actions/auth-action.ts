'use server';

import { signIn } from '@/auth';
import { db } from '@/lib/db';
import { loginSchema, registerSchema } from '@/lib/zod';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const { email, password } = values;
  try {
    const user = await db.user.findMany({
      where: {
        email,
      },
    });
    if (user) {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      return {
        success: true,
        message: 'Sesion iniciada',
        name_user: user[0].name,
      };
    } else {
      return {
        success: false,
        message: 'No se pudo iniciar sesion',
      };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: error.cause?.err?.message };
    }
    console.log(error);
    return {
      success: false,
      message: 'No se pudo iniciar sesion',
    };
  }
};

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      return {
        success: false,
        message: 'Revisa el formulario',
      };
    }
    // verificar si el usuario ya existe
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return {
        success: false,
        message: 'Ya existe un usuario con ese email',
      };
    }

    // hash de la contrasena
    const passwordHashed = await bcryptjs.hash(data.password, 10);

    await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: passwordHashed,
      },
    });

    return {
      success: true,
      message: 'Usuario creado',
      name_user: data.name,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      return { success: false, message: error.cause?.err?.message };
    }
    return {
      success: false,
      message: 'Hubo un error al crear la cuenta',
    };
  }
};
