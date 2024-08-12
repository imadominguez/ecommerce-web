import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/zod";
import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";
export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { success, data } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Credenciales invalidas");
        }
        // Verificar si existe el usuario en la base de datos

        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Credenciales invalidas");
        }

        // Verificar si la contrasena es correcta
        const isValidPassword = await bcryptjs.compare(data.password, user.password);

        if (!isValidPassword) {
          throw new Error("Credenciales invalidas");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
