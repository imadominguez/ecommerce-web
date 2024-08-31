import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "El email es requerido" }).min(1, "El email es requerido").email("Email invalido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña no debe superar los 32 caracteres"),
});

export const registerSchema = object({
  name: string({ required_error: "El nombre es requerido" })
    .min(1, "El nombre es requerido")
    .max(32, "El nombre no debe superar los 32 caracteres"),
  email: string({ required_error: "El email es requerido" }).min(1, "El email es requerido").email("Email invalido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña no debe superar los 32 caracteres"),
});
