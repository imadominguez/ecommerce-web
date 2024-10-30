import { initialData } from './seed';
import { db } from '../db';
import bcrypt from 'bcryptjs';

async function main() {
  // Borrar registros existentes en el orden correcto
  await db.orderItem.deleteMany(); // Primero borra los artículos de las órdenes
  await db.orderAddress.deleteMany(); // Luego las direcciones de las órdenes
  await db.order.deleteMany(); // Luego las órdenes
  await db.comment.deleteMany(); // Borra los comentarios
  await db.productImage.deleteMany(); // Luego las imágenes de los productos
  await db.salesHistory.deleteMany(); // Borra el historial de ventas, si existe
  await db.userAddress.deleteMany(); // Luego las direcciones de los usuarios
  await db.user.deleteMany(); // Luego los usuarios
  await db.product.deleteMany(); // Borra los productos
  await db.brand.deleteMany(); // Luego las marcas
  await db.category.deleteMany(); // Luego las categorías
  await db.country.deleteMany(); // Finalmente los países
  await db.account.deleteMany(); // Borra cuentas si existen
  await db.verificationToken.deleteMany(); // Borra tokens de verificación si existen
  await db.shippingPrice.deleteMany();

  console.log('✅ Registros borrados');

  // Obtén los datos de prueba
  const { brand, countries, products, users, categories } = initialData;

  // Crea registros de categorías
  const categoriesData = await Promise.all(
    categories.map(async (category) => {
      return await db.category.create({ data: { name: category } });
    })
  );

  // Crea registros de marcas
  const brandData = await Promise.all(
    brand.map(async (b) => {
      return await db.brand.create({ data: { name: b } });
    })
  );

  await Promise.all(
    countries.map(async (country) => {
      return await db.country.create({
        data: { name: country.name, id: country.id },
      });
    })
  );
  // Crea registros de productos
  const productsWithIds = await Promise.all(
    products.map(async (product, index) => {
      const slug = `${product.title.replace(/\s+/g, '-').toLowerCase()}-${index}`; // Generar slug único
      const createdProduct = await db.product.create({
        data: {
          title: product.title,
          description: product.description,
          fullDescription: product.fullDescription,
          price: product.price,
          color: product.color,
          inStock: product.inStock,
          slug: slug,
          tags: product.tags,
          images: product.images ?? [],
          brandId: brandData[Math.floor(Math.random() * brandData.length)].id,
          categoryId:
            categoriesData[Math.floor(Math.random() * categoriesData.length)]
              .id,
        },
      });

      // Crea imágenes para el producto
      for (const image of product.images) {
        await db.productImage.create({
          data: {
            url: image,
            productId: createdProduct.id,
          },
        });
      }

      return createdProduct; // Devuelve el producto creado con su ID
    })
  );

  console.log('✅ Productos creados');

  // Crea usuarios
  const usersWithIds = await Promise.all(
    users.map(async (user) => {
      return db.user.create({
        data: {
          ...user,
          password: user.password,
        },
      });
    })
  );
  console.log('✅ Usuarios creados');

  // Crea direcciones de usuario
  /*
  await Promise.all(
    usersWithIds.map(async (user, index) => {
      const countryId = countries[index % countries.length]?.id;

      if (!countryId) {
        console.error(`Country ID is not available for index ${index}`);
        return; // O manejar el error de alguna manera
      }

      return db.userAddress.create({
        data: {
          firstName: user?.name?.split(' ')[0] || '',
          lastName: user?.name?.split(' ')[1] || '',
          street: 'Calle Ejemplo',
          streetNumber: '123',
          postalCode: '7400',
          phone: '123456789',
          city: 'Ciudad Ejemplo',
          isApartment: false,
          userId: user.id,
          countryId: countryId,
          taxType: '',
        },
      });
    })
  );
  console.log('✅ Direcciones de usuario creadas');
  */

  // Crea órdenes y artículos de orden
  // await Promise.all(
  //   usersWithIds.map(async (user) => {
  //     const order = await db.order.create({
  //       data: {
  //         userId: user.id,
  //         subTotal: Math.floor(Math.random() * 500) + 100,
  //         envio: 10,
  //         total: Math.floor(Math.random() * 500) + 110,
  //         itemsInOrder: Math.floor(Math.random() * 5) + 1,
  //       },
  //     });

  //     // Crea artículos de orden
  //     const itemsInOrderPromises = Array.from(
  //       { length: order.itemsInOrder },
  //       async () => {
  //         return db.orderItem.create({
  //           data: {
  //             quantity: Math.floor(Math.random() * 3) + 1,
  //             price: Math.floor(Math.random() * 100) + 10,
  //             orderId: order.id,
  //             productId:
  //               productsWithIds[
  //                 Math.floor(Math.random() * productsWithIds.length)
  //               ].id,
  //           },
  //         });
  //       }
  //     );
  //     await Promise.all(itemsInOrderPromises);
  //   })
  // );
  // console.log('✅ Órdenes y artículos de orden creados');

  // Crea comentarios
  // await Promise.all(
  //   productsWithIds.map(async (product) => {
  //     return db.comment.create({
  //       data: {
  //         content: 'Comentario de ejemplo',
  //         productId: product.id,
  //         userId:
  //           usersWithIds[Math.floor(Math.random() * usersWithIds.length)].id,
  //       },
  //     });
  //   })
  // );
  // console.log('✅ Comentarios creados');

  // Crea precios de envío
  await db.shippingPrice.create({
    data: {
      olavarria: 2000,
      otherCities: 3500,
    },
  });
  console.log('✅ Precios de envío creados');

  // Crea historial de ventas
  // const generateRandomSales = async (
  //   productId: string,
  //   month: number,
  //   year: number,
  //   quantity: number
  // ): Promise<void> => {
  //   await db.salesHistory.create({
  //     data: {
  //       productId,
  //       quantity,
  //       date: new Date(`${year}-${month}-01`), // Establecer la fecha del primer día del mes
  //     },
  //   });
  // };

  // const createSalesHistory = async (productsWithIds: { id: string }[]) => {
  //   const salesPromises: Promise<void>[] = [];
  //   const currentYear = new Date().getFullYear(); // Año actual

  //   productsWithIds.forEach((product) => {
  //     // Generar entre 1 a 5 ventas por producto en diferentes meses
  //     const numberOfSales = Math.floor(Math.random() * 5) + 1;
  //     for (let i = 0; i < numberOfSales; i++) {
  //       const month = Math.floor(Math.random() * 12) + 1; // Mes aleatorio entre 1 y 12
  //       const quantity = Math.floor(Math.random() * 10) + 1; // Cantidad aleatoria entre 1 y 10
  //       salesPromises.push(
  //         generateRandomSales(product.id, month, currentYear, quantity)
  //       );
  //     }
  //   });

  //   await Promise.all(salesPromises);
  // };

  // await createSalesHistory(productsWithIds);
  // console.log('✅ Historial de ventas creado');

  console.log('✅ Seed ejecutado con éxito');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();
