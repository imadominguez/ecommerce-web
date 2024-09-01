'use client';

import { createProduct } from '@/actions/products/create-product';
import { Button } from '@/components/ui/button';

import { useProductStore } from '@/store/product/useProductStore';

const SaveProductButton = () => {
  const productData = useProductStore((state) => ({
    title: state.title,
    description: state.description,
    inStock: state.inStock,
    categoryId: state.categoryId,
    isFeatured: state.isFeatured,
    status: state.status,
    images: state.images,
  }));

  const handleSaveProduct = async () => {
    await createProduct(productData);
  };

  return (
    <Button
      size="sm"
      className="uppercase tracking-tight"
      onClick={handleSaveProduct}
    >
      Guardar producto
    </Button>
  );
};

export default SaveProductButton;
