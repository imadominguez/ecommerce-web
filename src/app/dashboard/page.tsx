import { PageContainer } from '@/components/layout/page-container';
import { Suspense } from 'react';
import { RecentSales } from './(components)/components/recent-sales';
import { SalesCard } from './(components)/components/sales-card';
import { TotalRenueveCard } from './(components)/components/total-revenue-card';
import { SkeletonCard } from '@/components/skeleton-card';
import { OrdersRecentCard } from './(components)/components/orders-recent-card';
import { BrandCard } from './(components)/components/brand-card';
import { ShippingPrice } from './(components)/components/shipping-price';

export default function DashboardPage() {
  return (
    <PageContainer className="w-full max-w-none justify-start gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
      </div>
      <div className="grid h-full gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Suspense fallback={<SkeletonCard />}>
          <OrdersRecentCard />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <RecentSales />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <BrandCard />
        </Suspense>
      </div>
      <ShippingPrice />
    </PageContainer>
  );
}
