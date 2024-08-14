import { Navbar } from "@/components/navbar/navbar";

export const metadata = {
  title: "Shop Layout",
  description: "Shop Layout",
};
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <Navbar />
      <h1>Shop Layout</h1>
      {children}
    </div>
  );
}
