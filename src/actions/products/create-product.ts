'use server';

import { db } from '@/lib/db';

import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { Color } from '@prisma/client';

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
  // images: z.array(z.string()),
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
          // ?? TODO: Add brandId to the product data object ??

          tags: tagsArray,
        },
      });

      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas en la base de datos
      if (productData.getAll('file').length > 0) {
        // Asegúrate de que los elementos sean archivos
        const imageFiles = productData.getAll('file').map((file) => {
          // Verifica si es un archivo y realiza la conversión si es necesario
          if (file instanceof File) {
            return file;
          }
          // Manejo de error si no es un archivo válido
          throw new Error('El archivo no es válido');
        });

        try {
          // Subir las imagenes a cloudinary
          const imagesUploaded = await uploadImages(imageFiles);

          // Asegúrate de que se haya subido al menos una imagen
          if (!imagesUploaded || imagesUploaded.length === 0) {
            throw new Error('Se produjo un error al cargar las imágenes');
          }

          // Crear los registros de las imagenes en la base de datos
          await db.productImage.createMany({
            data: imagesUploaded.map((url) => ({
              url: url!,
              productId: newProduct.id,
            })),
          });
        } catch (error) {
          console.error('Error uploading images:', error);
          throw new Error('Error al cargar imágenes: ');
        }

        try {
          // Actualizar la propiedad images del producto con las urls de las imagenes subidas
          // traemos el productImages asociado al id del producto creado
          const productImages = await db.productImage.findMany({
            where: {
              productId: newProduct.id,
            },
          });
          // Actualizamos el producto con las urls de las imagenes
          await db.product.update({
            where: {
              id: newProduct.id,
            },
            data: {
              images: {
                set: productImages.map((image) => image.url),
              },
            },
          });
        } catch (error) {
          console.error('Error updating product images:', error);
          throw new Error('Error al actualizar las imágenes del producto');
        }
      }

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

// Función para subir las imagenes a cloudinary
async function uploadImages(images: File[]) {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: 'ecommerce-web/products',
          })
          .then((res) => {
            return res.secure_url;
          });
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
}
