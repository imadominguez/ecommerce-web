import { PageContainer } from '@/components/layout/page-container';
import { Suspense } from 'react';
import { RecentSales } from './(components)/components/recent-sales';
import { SalesCard } from './(components)/components/sales-card';
import { TotalRenueveCard } from './(components)/components/total-revenue-card';
import { SkeletonCard } from '@/components/skeleton-card';
import { OrdersRecentCard } from './(components)/components/orders-recent-card';

export default function DashboardPage() {
  return (
    <PageContainer className="w-full max-w-none justify-start">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Suspense fallback={<SkeletonCard />}>
          <TotalRenueveCard />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <SalesCard />
        </Suspense>
      </div>
      <div className="mt-4 grid h-full gap-4 md:mt-8 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Suspense fallback={<SkeletonCard className="xl:col-span-2" />}>
          <OrdersRecentCard />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <RecentSales />
        </Suspense>
      </div>
    </PageContainer>
  );
}
