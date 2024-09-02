'use client';

import { createProduct } from '@/actions/products/create-product';
import { Button } from '@/components/ui/button';

import { useProductStore } from '@/store/product/useProductStore';

const SaveProductButton = () => {
  const {
    title,
    description,
    inStock,
    categoryId,
    isFeatured,
    inDiscount,
    discount,
    brandId,
    tags,
    images,
    price,
    isActive,
  } = useProductStore((state) => ({
    title: state.title,
    description: state.description,
    inStock: state.inStock,
    categoryId: state.categoryId,
    isFeatured: state.isFeatured,
    inDiscount: state.inDiscount,
    discount: state.discount,
    brandId: state.brandId,
    tags: '',
    images: state.images,
    price: state.price,
    isActive: state.isActive,
  }));

  const handleSaveProduct = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('color', 'black');
    formData.append('inStock', inStock.toString());
    formData.append('tags', tags);
    formData.append('slug', title.toLowerCase().replace(/ /g, '-').toString());
    // formData.append('discount', discount.toString());

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    formData.append('inDiscount', inDiscount.toString());

    formData.append('isActive', isActive.toString());
    formData.append('isFeatured', isFeatured.toString());
    formData.append('brandId', brandId);
    formData.append('categoryId', categoryId);

    const { ok, message } = await createProduct(formData);

    if (!ok) {
      console.error({ message });
      return;
    }
    console.log({ message });
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
