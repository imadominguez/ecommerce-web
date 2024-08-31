import { Carrousel } from '@/components/carrousel';
import { PageContainer } from '@/components/layout/page-container';
import { ProductCard } from '@/components/product/product-card';
import { CARROUSEL_IMAGES_HOME } from '@/lib/constant';
import { db } from '@/lib/db';

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      isFeatured: true,
    },
  });

  return (
    <PageContainer>
      <Carrousel images={CARROUSEL_IMAGES_HOME} delay={1000} loop />
      <div className="mx-auto grid max-w-2xl gap-3 py-16 sm:py-16 lg:max-w-none">
        <h2 className="text-2xl font-bold text-gray-900">
          Productos destacados
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Aquí se mostrarán los productos destacados */}

          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
