import { RegisterForm } from '@/app/(auth)/register/components/register-form';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import Image from 'next/image';
import { Title } from '@/components/title';
export default function RegisterPage() {
  return (
    <div
      style={{ minHeight: 'calc(100dvh - 75px)' }}
      className="w-full lg:grid lg:grid-cols-2"
    >
      <div className="hidden bg-muted lg:block">
        <Image
          src="/imgs/fondo-login.png"
          alt="Image"
          width="1920"
          height="1080"
          style={{ height: 'calc(100dvh - 75px)' }}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center py-12">
        <Title title="Registro" />
        <p className="text-balance text-muted-foreground">
          Ingresa tus datos para crear una nueva cuenta
        </p>
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterForm />
        </Suspense>
        <p className="mt-5 text-center text-sm">
          Ya tenes una cuenta?
          <Link
            href="/login"
            className={buttonVariants({
              variant: 'link',
            })}
          >
            Iniciar sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
