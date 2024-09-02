import { PageContainer } from '@/components/layout/page-container';

import { Header } from './components/header';
import { Footer } from './components/footer';
import { FormProduct } from './components/form-product';

export default function AddProductPage() {
  return (
    <PageContainer>
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <Header />
        <div>
          <FormProduct />
        </div>
        <Footer />
      </div>
    </PageContainer>
  );
}
