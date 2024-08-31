import { auth } from '@/auth';
import { Navbar } from '@/components/navbar/navbar';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[2500px]">
      <Navbar />
      {children}
    </div>
  );
}
