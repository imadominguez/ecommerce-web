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

export const createProduct = async (productData: FormData) => {
  // Asegúrate de que formData es un objeto plano
  const data = Object.fromEntries(productData);
  console.log({ first: data });
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return {
      ok: false,
      message: 'Invalid data',
    };
  }

  const product = productParsed.data;
  // product.slug = product.title.toLowerCase().replace(/ /g, '-');

  try {
    await db.$transaction(async () => {
      const tagsArray = product.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase());
      console.log('Creando producto:', product);
      const newProduct = await db.product.create({
        data: {
          ...product,
          color: product.color === '' ? null : (product.color as Color),
          price: parseFloat(product.price),
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

      console.log('Producto creado:', newProduct);

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
          const imagesUploaded = await uploadImages(imageFiles);

          // Asegúrate de que se haya subido al menos una imagen
          if (!imagesUploaded || imagesUploaded.length === 0) {
            throw new Error('Se produjo un error al cargar las imágenes');
          }

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

async function uploadImages(images: File[]) {
  // Upload images to cloudinary
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: 'teslo-shop',
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
    console.log({ uploadedImages });
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// async function uploadImages(images: File[]): Promise<string[]> {
//   try {
//     const uploadPromises = images.map((image) => {
//       const reader = new FileReader();
//       return new Promise<string>((resolve, reject) => {
//         reader.onloadend = async () => {
//           try {
//             const base64Image = reader.result as string;
//             const response = await cloudinary.uploader.upload(base64Image, {
//               folder: 'teslo-shop',
//             });
//             resolve(response.secure_url);
//           } catch (error) {
//             console.error(error);
//             reject(error);
//           }
//         };
//         reader.onerror = (error) => reject(error);
//         reader.readAsDataURL(image);
//       });
//     });

//     const uploadedImages = await Promise.all(uploadPromises);
//     console.log({ uploadedImages });
//     return uploadedImages;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }
