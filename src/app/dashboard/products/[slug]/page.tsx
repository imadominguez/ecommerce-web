import { getProductBySlug } from '@/actions/products/get-products';
import { PageContainer } from '@/components/layout/page-container';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { FormProduct } from './components/form-product';

interface Props {
  params: {
    slug: string;
  };
}

// generate static paths
export async function generateStaticParams() {
  const products = await db.product.findMany();

  return products.map(({ slug }) => {
    return {
      slug,
    };
  });
}

export default async function ProductDetailPage({ params: { slug } }: Props) {
  if (!slug) {
    redirect('/dashboard/products');
  }

  const product = await getProductBySlug({ slug });

  if (!product) {
    redirect('/dashboard/products');
  }

  const categories = await db.category.findMany();

  const brands = await db.brand.findMany();

  return (
    <PageContainer className="!max-w-none">
      <div className="grid w-full flex-1 auto-rows-max gap-4">
        <FormProduct
          product={product}
          categories={categories}
          brands={brands}
        />
      </div>
    </PageContainer>
  );
}
