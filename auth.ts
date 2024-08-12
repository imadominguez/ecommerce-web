import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    // jwt() se ejecuta cada vez que se crea o actualiza un token JWT.
    // Aqui es donde puedes agregar informacion adicional al token.
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    // session() se utiliza para agregar la informacion del token a la sesion del usuario,
    // Lo que hace que este disponible en el cliente.
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
