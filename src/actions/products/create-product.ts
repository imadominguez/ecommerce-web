'use server';

import { db } from '@/lib/db';

import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { Color } from '@/types/product';

cloudinary.config({
  cloud_name: 'dqpj5d9d1',
  api_key: '919518468483841',
  api_secret: 'w2zJ7F15nwVK9G9Ymo-_H_7-iG8',
});

const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  fullDescription: z.string(),
  price: z.string(),
  inStock: z.string(),
  color: z.string(),
  tags: z.string(),
  slug: z.string(),
  images: z.string(),
  isAvailableOnline: z.string(),
  inDiscount: z.string(),
  discount: z.string(),
  isActive: z.string().or(z.boolean()),
  isFeatured: z.string().or(z.boolean()),
  brandId: z.string(),
  categoryId: z.string(),
});

function calcularPrecioAjustado(
  precioBase: number,
  comision: number,
  iva?: number
) {
  iva = iva || 1.21;
  const comisionTotal = comision * iva;
  return precioBase / (1 - comisionTotal);
}

const redondearMultiploDeCinco = (numero: number) => {
  return Math.ceil(numero / 5) * 5;
};

export const createProduct = async (productData: FormData) => {
  // Asegúrate de que formData es un objeto plano
  const data = Object.fromEntries(productData);

  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return {
      ok: false,
      message: 'Invalid data',
    };
  }

  // Obtener el producto de la base de datos
  const product = productParsed.data;
  const images = JSON.parse(product.images) as string[];
  // Ajustar el precio del producto
  const precioDeseado = parseFloat(product.price);
  const comisionMercadoPago = 6.29 / 100; // 6.29%
  const iva = 1.21; // 21% IVA
  const precioAjustado = calcularPrecioAjustado(
    precioDeseado,
    comisionMercadoPago,
    iva
  );
  // Redondear el precio al múltiplo de 5 más cercano (5, 10, 15, 20, etc.) por ejemplo, 12 -> 15, 17 -> 20
  const precioRedondeado = redondearMultiploDeCinco(precioAjustado);

  try {
    await db.$transaction(async () => {
      // Separar las etiquetas en un array
      const tagsArray = product.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase());

      // Crear el producto en la base de datos
      const newProduct = await db.product.create({
        data: {
          ...product,
          images,
          color: product.color === '' ? null : (product.color as Color),
          price: precioRedondeado,
          inStock: parseInt(product.inStock),
          // inDiscount: product.inDiscount === 'true',
          isActive: product.isActive === 'true',
          isFeatured: product.isFeatured === 'true',
          discount: parseFloat(product.discount),
          inDiscount:
            product.inDiscount === ''
              ? undefined
              : product.inDiscount === 'true',
          isAvailableOnline:
            product.isAvailableOnline === 'true' ? true : false,

          tags: tagsArray,
        },
      });

      return newProduct;
    });

    // Revalidar las rutas de productos
    revalidatePath('/dashboard/products');
    revalidatePath('/products');

    return {
      ok: true,
      message: 'Producto creado exitosamente',
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: error,
    };
  }
};
