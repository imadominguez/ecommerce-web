import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/lib/zod';
import { db } from '@/lib/db';
import bcryptjs from 'bcryptjs';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { success, data } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error('Credenciales invalidas');
        }
        // Verificar si existe el usuario en la base de datos

        const user = await db.user.findUnique({
          where: { email: data.email },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            role: true,
          },
        });

        if (!user || !user.password) {
          throw new Error('Credenciales invalidas');
        }

        // Verificar si la contrasena es correcta
        const isValidPassword = await bcryptjs.compare(
          data.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error('Credenciales invalidas');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
