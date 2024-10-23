'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { LoaderCircleIcon } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email(),
});
export const FormSendEmailForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { email } = values;
    if (!email) {
      form.setError('email', {
        message: 'Debes introducir tu email.',
      });
    }

    try {
      setLoading(true);
      setMessage(null);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/forgot-password`,
        {
          method: 'POST',
          body: JSON.stringify({
            email,
          }),
        }
      );

      if (response.status === 200) {
        toast.success('Correo enviado');
        setMessage('Correo enviado, chequea tu bandeja de entrada');
        return;
      }

      toast.error('El email no esta registrado');
      return;
    } catch (error) {
      form.setError('email', {
        message: 'El email no esta registrado',
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contrasena</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@email.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {message && (
            <div className="rounded-md border bg-green-900 p-2 text-sm fade-in">
              <span>{message}</span>
            </div>
          )}
          <Button
            disabled={loading}
            variant={'standard'}
            type="submit"
            className="w-full"
          >
            {!loading ? (
              'Enviar correo'
            ) : (
              <>
                <span className="mr-2 animate-pulse">Enviando correo</span>
                <LoaderCircleIcon className="h-4 w-4 animate-spin" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
