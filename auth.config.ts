import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      authorize: async (credentials) => {
        console.log(credentials);
        if (credentials.email !== "example@gmail.com") {
          throw new Error("Credenciales invalidas");
        }
        return {
          id: "1",
          name: "Imanol Dominguez",
          email: "example@gmail.com",
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
