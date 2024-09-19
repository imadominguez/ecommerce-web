'use client';

import { useState, useTransition } from 'react';
import { z } from 'zod';
import { loginSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EyeOffIcon, EyeIcon, RotateCcwIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
// componentes
import { Button, buttonVariants } from '@/components/ui/button';
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
// server action
import { loginAction } from '@/actions/auth-action';
import { TypeInputPassword } from '@/types/inputs';

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [typeInputPassword, setTypeInputPassword] =
    useState<TypeInputPassword>('password');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setErrorMessage(null);
    setIsSuccess(false);
    startTransition(async () => {
      const { success, message, name_user } = await loginAction(values);
      if (success) {
        setIsSuccess(true);
        toast.success(`Bienvenido/a ${name_user}`);
        if (params.get('redirect')) {
          router.push(params.get('redirect') as string);
          return;
        }
        router.push('/');
      } else {
        toast.error(message);
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
          {isSuccess && (
            <FormMessage>
              <span className="text-green-500">Ingreso exitoso</span>
            </FormMessage>
          )}
          <div>
            <Button
              className="w-full uppercase tracking-wider"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                'Ingresar'
              ) : (
                <RotateCcwIcon className="animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
      <p className="mt-5 text-center text-sm">
        No tenes una cuenta?
        <Link
          href={
            params.get('redirect')
              ? '/register?redirect=' + params.get('redirect')
              : '/register'
          }
          className={buttonVariants({
            variant: 'link',
          })}
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
};
