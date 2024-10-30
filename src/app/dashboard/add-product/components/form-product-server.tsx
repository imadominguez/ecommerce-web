import { getCategories } from '@/actions/categories/get-categories';
import { FormProduct } from './form-product';
import { db } from '@/lib/db';
import { getImagesCloudinary } from '@/lib/cloudinary';

export const FormProductServer = async () => {
  const categoriesDB = getCategories();
  const brandsDB = db.brand.findMany();
  const resources = await getImagesCloudinary();

  const [categories, brands] = await Promise.all([categoriesDB, brandsDB]);
  return (
    <>
      <FormProduct
        images={resources}
        categories={categories.categories}
        brands={brands}
      />
    </>
  );
};
