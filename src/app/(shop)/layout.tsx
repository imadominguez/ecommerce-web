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
    <div className="mx-auto w-full max-w-[2500px]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
