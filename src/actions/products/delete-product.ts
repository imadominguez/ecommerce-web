'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dqpj5d9d1',
  api_key: '919518468483841',
  api_secret: 'w2zJ7F15nwVK9G9Ymo-_H_7-iG8',
});

export const deleteProduct = async (slug: string) => {
  try {
    // Primero comprobamos si el producto existe
    const product = await db.product.findUnique({
      where: {
        slug,
      },
    });
    // Si no existe el producto, retornamos un error
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    // Luego comprobamos si en images hay urls de cloudinary
    const cloudinaryImages = product.images.filter((image: string) =>
      image.includes('res.cloudinary.com')
    );

    await db.$transaction(async () => {
      // Si hay urls de cloudinary, las eliminamos
      // de cloudinary y de la base de datos
      // Si no hay urls de cloudinary, eliminamos el producto de la base de datos
      if (cloudinaryImages.length > 0) {
        // las urls de cloudinary tienen la forma:
        // https://res.cloudinary.com/dqpj5d9d1/image/upload/v1725380258/teslo-shop/fcnwxgrsyjq27ppizaal.png
        // por lo que necesitamos extraer el publicId para eliminar la imagen
        // que seria 'teslo-shop/fcnwxgrsyjq27ppizaal'
        try {
          const publicIds = cloudinaryImages.map((image: string) => {
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
                  throw new Error('Error deleting image');
                }
              }
            );
          }
        } catch (error) {
          throw new Error('No se pudo eliminar las imágenes de cloudinary');
        }
      }

      // primero eliminamos las relaciones con las tablas relacionadas
      await db.productImage.deleteMany({
        where: {
          productId: product.id,
        },
      });

      // luego eliminamos el producto de la tabla products
      await db.product.delete({
        where: {
          slug,
        },
      });
    });

    // Revalidamos las rutas que contienen productos
    revalidatePath('/products');
    revalidatePath('/dashboard/products');

    // Retornamos un mensaje de éxito
    return {
      ok: true,
      message: 'Producto eliminado',
    };
  } catch (error) {
    // Si hay un error, retornamos un mensaje de error
    return {
      ok: false,
      message: error,
    };
  }
};
