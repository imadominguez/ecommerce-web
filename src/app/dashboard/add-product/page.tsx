import { PageContainer } from '@/components/layout/page-container';

import ProductDetails from './components/product-details';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { ProductImages } from './components/product-images';

export default function AddProductPage() {
  return (
    <PageContainer>
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <Header />
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <ProductDetails />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <ProductImages />
          </div>
        </div>
        <Footer />
      </div>
    </PageContainer>
  );
}
