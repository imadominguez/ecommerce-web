import { PageContainer } from '@/components/layout/page-container';
import { Header } from './components/header';
import { FormProductServer } from './components/form-product-server';
import { Suspense } from 'react';

export default function AddProductPage() {
  return (
    <PageContainer>
      <div className="mx-auto grid w-full max-w-[59rem] flex-1 auto-rows-max gap-4">
        <Header />
        <Suspense
          fallback={
            <div className="grid min-h-[80dvh] w-full gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid w-full animate-pulse auto-rows-max items-start gap-4 rounded-md bg-muted-foreground/50 lg:col-span-2 lg:gap-8">
                &nbsp;
              </div>

              <div className="grid w-full animate-pulse auto-rows-max items-start gap-4 rounded-md bg-muted-foreground/50 lg:gap-8">
                &nbsp;
              </div>
            </div>
          }
        >
          <FormProductServer />
        </Suspense>
      </div>
    </PageContainer>
  );
}
