"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { loginSchema, registerSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const { email, password } = values;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      success: true,
      message: "Sesion iniciada",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return { successs: false, error: error.cause?.err?.message };
    }
    console.log(error);
  }
};

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      return {
        success: false,
        error: "Revisa el formulario",
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
        error: "Ya existe un usuario con ese email",
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
      message: "Usuario creado",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return { successs: false, error: error.cause?.err?.message };
    }
    console.log(error);
  }
};
