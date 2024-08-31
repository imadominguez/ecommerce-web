import type { Metadata } from 'next';

import './globals.css';
import { roboto } from '@/config/fonts';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}