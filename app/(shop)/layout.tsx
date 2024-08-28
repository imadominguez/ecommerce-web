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
    <div className="mx-auto max-w-[2500px]">
      <Navbar />
      {children}
    </div>
  );
}
