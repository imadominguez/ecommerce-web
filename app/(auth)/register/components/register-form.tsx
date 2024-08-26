'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { registerSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

import { toast } from 'sonner';

import { EyeOffIcon, EyeIcon, RotateCcwIcon } from 'lucide-react';

import { registerAction } from '@/actions/auth-action';
import { signIn } from 'next-auth/react';

type TypeInputPassword = 'text' | 'password';
export const RegisterForm = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [typeInputPassword, setTypeInputPassword] =
    useState<TypeInputPassword>('password');

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setErrorMessage(null);

    startTransition(async () => {
      const response = await registerAction(values);
      if (response?.success) {
        setTimeout(() => {
          toast.success(`Bienvenido/a ${response.name_user}`);
        }, 2000);
        await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        router.push('/');
      }
    });
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          method="POST"
          className="space-y-6"
        >
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
                    <Input
                      placeholder="Ingresa tu contraseña"
                      type={typeInputPassword}
                      {...field}
                    />
                    {typeInputPassword === 'password' ? (
                      <EyeOffIcon
                        className="absolute right-2 top-[12px] h-4 w-4 hover:cursor-pointer"
                        onClick={() => setTypeInputPassword('text')}
                      />
                    ) : (
                      <EyeIcon
                        className="absolute right-2 top-[12px] h-4 w-4 hover:cursor-pointer"
                        onClick={() => setTypeInputPassword('password')}
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
          {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
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
