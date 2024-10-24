'use server';

import { db } from '@/lib/db';
import { z } from 'zod';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? '',
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET ?? '',
});

const productSchema = z.object({
  title: z.string(), //
  description: z.string(), //
  fullDescription: z.string(), //
  price: z.string(), //
  inStock: z.string(), //
  color: z.enum(['cyan', 'black', 'magenta', 'yellow', '']), //
  tags: z.string(), //
  slug: z.string(), //
  inDiscount: z.string(), //
  discount: z.string(), //
  isActive: z.string(), //
  isFeatured: z.string(), //
  isAvailableOnline: z.string(),
  brandId: z.string(), //
  categoryId: z.string(), //
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

  try {
    await db.$transaction(async () => {
      const tagsArray = product.tags
        .split(',')
        .map((tag: string) => tag.trim().toLowerCase());

      const updatedProduct = await db.product.update({
        where: {
          slug: product.slug,
        },
        data: {
          ...product,
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

      if (formData.getAll('file').length > 0) {
        // Primero eliminamos las imágenes anteriores del producto de cloudinary
        // en la propiedad images del producto tenemos las url de cloudinary
        // como por ejemplo: https://res.cloudinary.com/dt9ntq5vr/image/upload/v1633660137/ecommerce/products/1.jpg
        // por lo que podemos extraer el public_id de la imagen con una expresión regular
        //  y luego eliminar la imagen de cloudinary con el método destroy
        //

        // const images = formData.getAll('file');
        const publicIds = updatedProduct.images.map((image: string) => {
          const urlParts = image.split('/');
          const publicIdWithExtension = urlParts.slice(7).join('/');
          const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '');
          return publicId;
        });

        // Eliminamos las imágenes de cloudinary
        for (const publicId of publicIds) {
          await cloudinary.uploader.destroy(
            publicId,
            (error: any, result: any) => {
              if (error) {
                console.log('Error deleting image:', error);
                throw new Error('Error deleting image');
              }
            }
          );
        }

        // Ahora eliminamos las imágenes de la base de datos
        await db.productImage.deleteMany({
          where: {
            productId: updatedProduct.id,
          },
        });

        // Ahora subimos las nuevas imágenes
        const imageFiles = formData
          .getAll('file')
          .map((file: FormDataEntryValue) => {
            // Verifica si es un archivo y realiza la conversión si es necesario
            if (file instanceof File) {
              return file;
            }
            // Manejo de error si no es un archivo válido
            throw new Error('El archivo no es válido');
          });
        try {
          const uploadedImages = await uploadImages(imageFiles);
          // Asegúrate de que se haya subido al menos una imagen
          if (!uploadedImages || uploadedImages.length === 0) {
            throw new Error('Se produjo un error al cargar las imágenes');
          }
          // Guardamos las nuevas imágenes en la base de datos
          await db.productImage.createMany({
            data: uploadedImages.map((url: string | null) => ({
              url: url!,
              productId: updatedProduct.id,
            })),
          });
        } catch (error) {
          console.error('Error uploading images:', error);
          throw new Error('Error al cargar imágenes: ');
        }

        // Actualizamos la propiedad images del producto con las urls de las imagenes subidas
        try {
          // Traemos el productImages asociado al id del producto creado
          const productImages = await db.productImage.findMany({
            where: {
              productId: updatedProduct.id,
            },
          });
          // Actualizamos el producto con las urls de las imagenes
          await db.product.update({
            where: {
              id: updatedProduct.id,
            },
            data: {
              images: {
                set: productImages.map(
                  (image: {
                    id: string;
                    url: string;
                    productId: string;
                    createdAt: Date;
                    updatedAt: Date;
                  }) => image.url
                ),
              },
            },
          });
        } catch (error) {
          console.error('Error updating product images:', error);
          throw new Error('Error al actualizar las imágenes del producto');
        }

        return updatedProduct;
      }
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

async function uploadImages(images: File[]) {
  // Upload images to cloudinary
  try {
    const uploadPromises = images.map(async (image: File) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: 'ecommerce-web/products',
          })
          .then((res: UploadApiResponse) => {
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
