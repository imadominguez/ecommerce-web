import { RegisterForm } from '@/app/(auth)/register/components/register-form';
import { Logo } from '@/components/logo';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
      </div>
      <RegisterForm />
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
