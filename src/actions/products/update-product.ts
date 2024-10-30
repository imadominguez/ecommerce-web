'use server';

import { db } from '@/lib/db';
import { z } from 'zod';

import { revalidatePath } from 'next/cache';

const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  fullDescription: z.string(),
  price: z.string(),
  inStock: z.string(),
  color: z.enum(['cyan', 'black', 'magenta', 'yellow', '']),
  tags: z.string(),
  slug: z.string(),
  images: z.string(),
  inDiscount: z.string(),
  discount: z.string(),
  isActive: z.string(),
  isFeatured: z.string(),
  isAvailableOnline: z.string(),
  brandId: z.string(),
  categoryId: z.string(),
});

export const updateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const { success, data: product, error } = productSchema.safeParse(data);
  console.log({ success });

  if (!success) {
    console.error('Validation errors:', error.format());
    return {
      ok: false,
      message: 'Invalid data',
    };
  }
  const images = JSON.parse(product.images) as string[];
  try {
    await db.$transaction(async () => {
      const tagsArray = product.tags
        .split(',')
        .map((tag: string) => tag.trim().toLowerCase());

      await db.product.update({
        where: {
          slug: product.slug,
        },
        data: {
          ...product,
          images,
          isAvailableOnline:
            product.isAvailableOnline === 'true' ? true : false,
          color: product.color === '' ? undefined : product.color,
          price: parseFloat(product.price),
          inStock: parseInt(product.inStock),
          isActive: product.isActive === 'true',
          isFeatured: product.isFeatured === 'true',
          discount: parseFloat(product.discount),
          inDiscount:
            product.inDiscount === ''
              ? undefined
              : product.inDiscount === 'true'
                ? true
                : false,
          tags: tagsArray,
        },
      });
    });

    revalidatePath('/dashboard/products');
    revalidatePath('/products');
    revalidatePath(`/products/${product.slug}`);
    revalidatePath(`/dashboard/products/${product.slug}`);

    return {
      ok: true,
      message: 'Producto actualizado exitosamente',
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error al actualizar el producto',
    };
  }
};
