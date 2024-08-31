import Link from 'next/link';
import { LoginForm } from '@/app/(auth)/login/components/login-form';
import { buttonVariants } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="flex min-h-[90dvh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <LoginForm />
      <p className="mt-5 text-center text-sm">
        No tenes una cuenta?
        <Link
          href="/register"
          className={buttonVariants({
            variant: 'link',
          })}
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
