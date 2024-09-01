'use client';

import { Button } from '@/components/ui/button';
import { useCategoryStore } from '@/store/category/useCategoryStore';
import { useProductStore } from '@/store/product/useProductStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import SaveProductButton from './save-product-button';

export const Footer = () => {
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
    <div className="flex items-center justify-center gap-2 md:hidden">
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
  );
};
