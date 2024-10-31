'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { LoaderCircleIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

interface Props {
  token: string;
}

export const FormResetPassword = ({ token }: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const pathname = usePathname();
  const params = new URLSearchParams(pathname);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      form.setError('confirmPassword', {
        message: 'La contrasena debe coincidir',
      });
      form.setError('password', {
        message: 'La contrasena debe coincidir',
      });
    }

    try {
      setLoading(true);
      setMessage(null);
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get('email');
      console.log({ email, params });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/forgot-password/${email}/${token}`,
        {
          method: 'POST',
          body: JSON.stringify({
            password,
          }),
        }
      );

      if (response.status === 200) {
        toast({
          variant: 'success',
          title: 'Contrasena restablecida',
        });
        setMessage('Contrasena restablecida');
        router.push('/login');
        return;
      }

      toast({
        variant: 'destructive',
        title: 'Algo ocurrio al restablecer la contrasena',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Algo ocurrio al restablecer la contrasena. Intenta nuevamente',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contrasena</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ingrese su nueva contrasena"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contrasena</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ingrese su nueva contrasena"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {message && (
          <div className="rounded-md border p-2 text-sm fade-in">
            <span>{message}</span>
          </div>
        )}
        <Button
          disabled={loading}
          className="w-full"
          variant={'standard'}
          type="submit"
        >
          {!loading ? (
            'Restablecer contrasena'
          ) : (
            <>
              <span className="mr-2 animate-pulse">Restableciendo</span>
              <LoaderCircleIcon className="h-4 w-4 animate-spin" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
