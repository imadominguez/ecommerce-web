'use client';

import { BackRouteButton } from '@/components/button/back-route-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCategoryStore } from '@/store/category/useCategoryStore';
import { useProductStore } from '@/store/product/useProductStore';

import { useRouter } from 'next/navigation';
import SaveProductButton from './save-product-button';

export const Header = () => {
  const { clearStore: clearProductStore } = useProductStore((state) => ({
    clearStore: state.clearStore,
  }));
  const { clearStore: clearCategoryStore } = useCategoryStore((state) => ({
    clearStore: state.clearStore,
  }));

  const router = useRouter();

  const handleDiscard = () => {
    clearProductStore();
    clearCategoryStore();
    router.push('/dashboard/products');
  };

  return (
    <div className="flex items-center gap-4">
      <BackRouteButton />
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Nuevo Producto
      </h1>
      <Badge variant="outline" className="ml-auto sm:ml-0">
        In stock
      </Badge>
      <div className="hidden items-center gap-2 md:ml-auto md:flex">
        <Button
          variant="outline"
          size="sm"
          className="uppercase tracking-tight"
          onClick={handleDiscard}
        >
          Descartar
        </Button>
        <SaveProductButton />
      </div>
    </div>
  );
};
