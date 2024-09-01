import { Carrousel } from '@/components/carrousel';
import { PageContainer } from '@/components/layout/page-container';

// import { CARROUSEL_IMAGES_HOME } from '@/lib/constant';

import { ProductsFeatured } from './components/products-featured';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <PageContainer>
      {/* <Carrousel images={CARROUSEL_IMAGES_HOME} delay={1000} loop /> */}
      <Carrousel />

      <Suspense
        fallback={
          <div className="mx-auto grid w-full max-w-2xl gap-3 py-16 sm:py-16 lg:max-w-none">
            <h2 className="text-2xl font-bold text-gray-900">
              Productos destacados
            </h2>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Aquí se mostrarán los productos destacados */}
              {/* Skeleton */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[400px] w-full animate-pulse rounded-md bg-muted-foreground/40"
                />
              ))}
            </div>
          </div>
        }
      >
        <ProductsFeatured />
      </Suspense>
    </PageContainer>
  );
}
