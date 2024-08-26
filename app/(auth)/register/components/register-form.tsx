'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EyeOffIcon, EyeIcon, RotateCcwIcon } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

// componentes
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// server actions
import { loginAction, registerAction } from '@/actions/auth-action';
import { TypeInputPassword } from '@/types/inputs';

export const RegisterForm = () => {
  const router = useRouter();

  // Estado para manejar la transición y los errores
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Estado para manejar la visibilidad de la contraseña
  const [typeInputPassword, setTypeInputPassword] =
    useState<TypeInputPassword>('password');

  // Configuración del formulario usando react-hook-form y zod
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  // Función para manejar el envío del formulario
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setErrorMessage(null);

    startTransition(async () => {
      // Intento de registro
      const { success, message, name_user } = await registerAction(values);
      if (success) {
        toast.success(`Bienvenido/a ${name_user}`);

        // Intento de inicio de sesión automático después del registro
        const { success: isLoggin } = await loginAction(values);
        if (!isLoggin) {
          toast.error('No se pudo iniciar sesión. Intente nuevamente');
        } else {
          router.push('/');
        }
      } else {
        toast.error(message);
      }
    });
  }

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setTypeInputPassword((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          method="POST"
          className="space-y-6"
        >
          {/* Campo de nombre */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa tu nombre"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de correo electrónico */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa tu correo electrónico"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de contraseña */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Ingresa tu contraseña"
                      type={typeInputPassword}
                      {...field}
                    />
                    {/* Icono para mostrar/ocultar contraseña */}
                    {typeInputPassword === 'password' ? (
                      <EyeOffIcon
                        className="absolute right-2 top-[12px] h-4 w-4 hover:cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <EyeIcon
                        className="absolute right-2 top-[12px] h-4 w-4 hover:cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Debe contener al menos 8 caracteres.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mensaje de error general */}
          {errorMessage && <FormMessage>{errorMessage}</FormMessage>}

          {/* Botón de envío */}
          <div>
            <Button
              className="w-full uppercase tracking-wider"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                'Crear cuenta'
              ) : (
                <RotateCcwIcon className="animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
