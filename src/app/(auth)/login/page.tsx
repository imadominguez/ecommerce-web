import { LoginForm } from '@/app/(auth)/login/components/login-form';
import { Suspense } from 'react';
import Image from 'next/image';
import { Title } from '@/components/title';
export default function LoginPage() {
  return (
    <div
      style={{ minHeight: 'calc(100dvh - 75px)' }}
      className="w-full lg:grid lg:grid-cols-2"
    >
      <div className="flex flex-col items-center justify-center py-12">
        <Title title="Ingresa con tu cuenta" />
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
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
    </div>
  );
}
