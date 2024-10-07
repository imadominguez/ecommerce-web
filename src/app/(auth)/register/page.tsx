import { RegisterForm } from '@/app/(auth)/register/components/register-form';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <div className="flex min-h-[90dvh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">{/* <Logo /> */}</div>
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
  );
}
