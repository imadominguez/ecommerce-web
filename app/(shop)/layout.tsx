import { Carrousel } from '@/components/carrousel';
import { Navbar } from '@/components/navbar/navbar';
import { CARROUSEL_IMAGES_HOME } from '@/lib/constant';

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
    <div className="mx-auto max-w-[2500px]">
      <Navbar />
      <Carrousel images={CARROUSEL_IMAGES_HOME} delay={1000} loop />
      {children}
    </div>
  );
}
