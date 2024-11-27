import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar/navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Servicios Integrados',
    default: 'Servicios Integrados',
  },
  description: '',
};
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
