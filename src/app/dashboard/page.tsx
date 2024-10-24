import { PageContainer } from '@/components/layout/page-container';
import { Suspense } from 'react';
import { CreateBrandInput } from '@/app/dashboard/(components)/components/brand/create-brand-input';
import { SkeletonCard } from '@/components/skeleton-card';
import { TotalRenueveCard } from '@/app/dashboard/(components)/components/total-revenue-card';
import { SalesCard } from '@/app/dashboard/(components)/components/sales-card';
import { OrdersRecentCard } from '@/app/dashboard/(components)/components/orders/orders-recent-card';
import { RecentSales } from '@/app/dashboard/(components)/components/orders/recent-sales';
import { BrandCard } from '@/app/dashboard/(components)/components/brand/brand-card';
import { ShippingPrice } from '@/app/dashboard/(components)/components/shipping-price/shipping-price';
import { CategoryCard } from '@/app/dashboard/(components)/components/category/category-card';

export default function DashboardPage() {
  return (
    <PageContainer className="w-full max-w-none justify-start gap-8">
      <section className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Suspense fallback={<SkeletonCard />}>
          <TotalRenueveCard />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <SalesCard />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <SalesCard />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <SalesCard />
        </Suspense>
      </section>
      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <ShippingPrice />
        <CategoryCard />
        <CreateBrandInput />
      </section>
      <section className="grid h-full gap-4 md:gap-8 lg:grid-cols-2">
        <Suspense fallback={<SkeletonCard />}>
          <OrdersRecentCard />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <RecentSales />
        </Suspense>
      </section>
      <section className="grid h-full gap-4 md:gap-8 lg:grid-cols-2">
        <Suspense fallback={<SkeletonCard />}>
          <BrandCard />
        </Suspense>{' '}
        <Suspense fallback={<SkeletonCard />}>
          <CategoryCard />
        </Suspense>
      </section>
    </PageContainer>
  );
}
