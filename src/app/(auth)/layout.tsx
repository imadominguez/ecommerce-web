import { Navbar } from '@/components/navbar/navbar';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | Servicios Integrados',
    default: 'Servicios Integrados',
  },
  description: '',
};

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
