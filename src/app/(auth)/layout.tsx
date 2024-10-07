import { Navbar } from '@/components/navbar/navbar';
import { Suspense } from 'react';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[2500px]">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      {children}
    </div>
  );
}
