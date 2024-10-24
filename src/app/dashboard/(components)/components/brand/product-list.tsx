import { db } from '@/lib/db';
import { ProductDialog } from './product-dialog';

async function getProducts(brandId: string) {
  const products = await db.product.findMany({
    where: {
      brandId,
    },
  });

  return products;
}

export default async function ProductList({ id }: { id: string }) {
  const products = await getProducts(id);

  return <ProductDialog products={products} />;
}
