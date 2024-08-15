import { db } from "../db";

import { initialData } from "./seed";

async function main() {
  await db.orderAddress.deleteMany();
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  await db.userAddress.deleteMany();
  await db.productImage.deleteMany();
  await db.product.deleteMany();
  await db.brand.deleteMany();
  await db.account.deleteMany();
  await db.verificationToken.deleteMany();
  await db.user.deleteMany();
  await db.country.deleteMany();
  await db.category.deleteMany();
  console.log("✅ Registros borrados");
  // Obtén los datos de prueba
  const { brand, countries, products, users, categories } = initialData;
  // Crea registros de categorías
  const categoriesData = categories.map((category) => ({
    name: category,
  }));
  await db.category.createMany({
    data: categoriesData,
  });

  // Obtiene las categorías desde la base de datos
  const categoriesDB = await db.category.findMany();
  // Crea un mapa para asignar nombres de categorías a identificadores de base de datos

  // Crea registro de marcas
  const brandData = brand.map((b) => ({
    name: b,
  }));

  await db.brand.createMany({
    data: brandData,
  });

  const brandDB = await db.brand.findMany();

  // Crea registros de productos con imágenes y categorías asignadas aleatoriamente
  for (let i = 0; i < products.length; i++) {
    const newProduct = await db.product.create({
      data: {
        title: `Producto ${i + 1}`,
        description: `Descripción del producto ${i + 1}`,
        price: Math.floor(Math.random() * 1000),
        color: "black",
        inStock: Math.floor(Math.random() * 100),
        slug: `producto-${i + 1}`,
        categoryId: categoriesDB[Math.floor(Math.random() * categoriesDB.length)].id,
        tags: ["tag1", "tag2"],
        images: [...(products[i].images ?? [])] || [],
        brandId: brandDB[Math.floor(Math.random() * brandDB.length)].id,
      },
    });
  }

  console.log("✅ Productos creados");

  users.forEach(async (user) => {
    await db.user.create({
      data: user,
    });
  });
  console.log("✅ Usuarios creados");

  countries.forEach(async (country) => {
    await db.country.create({
      data: country,
    });
  });

  console.log(" ");
  console.log("✅ Seed ejecutado con éxito");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
