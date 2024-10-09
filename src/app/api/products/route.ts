import { db } from '@/lib/db';
import { initialData } from '@/lib/seed/seed';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await db.product.findMany();
  if (!products) {
    return NextResponse.json({ message: 'No hay productos' }, { status: 404 });
  }
  return NextResponse.json(products, { status: 200 });
}

export async function POST(req: any) {
  const secretName: string = process.env.NEXT_PUBLIC_SECRET_NAME ?? '';

  if (!secretName) {
    return NextResponse.json(
      { message: 'El nombre del producto es requerido' },
      { status: 400 }
    );
  }
  if (secretName !== 'servicios-integrados') {
    return NextResponse.json(
      { message: 'Error en el servidor' },
      { status: 500 }
    );
  }

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
    await db.product.create({
      data: {
        title: `Producto ${i + 1}`,
        description: `Descripción del producto ${i + 1}`,
        price: Math.floor(Math.random() * 1000),
        color: 'black',
        inStock: Math.floor(Math.random() * 100),
        slug: `producto-${i + 1}`,
        categoryId:
          categoriesDB[Math.floor(Math.random() * categoriesDB.length)].id,
        tags: ['tag1', 'tag2'],
        images: [...(products[i].images ?? [])],
        brandId: brandDB[Math.floor(Math.random() * brandDB.length)].id,
        fullDescription: `Descripción completa del producto ${i + 1}`,
      },
    });
  }

  console.log('✅ Productos creados');

  users.forEach(async (user) => {
    await db.user.create({
      data: user,
    });
  });
  console.log('✅ Usuarios creados');

  countries.forEach(async (country) => {
    await db.country.create({
      data: country,
    });
  });

  console.log(' ');
  console.log('✅ Seed ejecutado con éxito');

  return NextResponse.json(
    { users, message: 'Semilla ejecutada correctamente' },
    { status: 201 }
  );
}
