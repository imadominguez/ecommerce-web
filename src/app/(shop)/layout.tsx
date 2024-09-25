import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar/navbar';

export const metadata = {
  title: 'Shop Layout',
  description: 'Shop Layout',
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
