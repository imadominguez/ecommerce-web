"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";

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
