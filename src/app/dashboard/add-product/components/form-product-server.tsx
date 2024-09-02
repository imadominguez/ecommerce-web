import { getCategories } from '@/actions/categories/get-categories';
import { FormProduct } from './form-product';
import { db } from '@/lib/db';

export const FormProductServer = async () => {
  const categoriesDB = getCategories();
  const brandsDB = db.brand.findMany();

  const [categories, brands] = await Promise.all([categoriesDB, brandsDB]);
  return (
    <>
      <FormProduct categories={categories.categories} brands={brands} />
    </>
  );
};
