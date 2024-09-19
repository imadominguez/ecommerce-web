import { LoginForm } from '@/app/(auth)/login/components/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-[90dvh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <LoginForm />
    </div>
  );
}
