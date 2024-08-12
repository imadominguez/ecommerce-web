"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type TypeInputPassword = "text" | "password";
export const LoginForm = () => {
  const [typeInputPassword, setTypeInputPassword] = useState<TypeInputPassword>("password");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu correo electrónico" type="email" {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Ingresa tu contraseña" type={typeInputPassword} {...field} />
                    {typeInputPassword === "password" ? (
                      <EyeOffIcon
                        className="absolute top-[10px] right-2 w-5 h-5 hover:cursor-pointer"
                        onClick={() => setTypeInputPassword("text")}
                      />
                    ) : (
                      <EyeIcon
                        className="absolute top-[10px] right-2 w-5 h-5 hover:cursor-pointer"
                        onClick={() => setTypeInputPassword("password")}
                      />
                    )}
                  </div>
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button className="w-full" type="submit">
              Ingresar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
