import { getProducts } from '@/actions/products/get-products';
import { ProductCard } from '@/components/product/product-card';

export const ProductsFeatured = async () => {
  const { products, ok, totalProducts } = await getProducts({
    isFeatured: true,
  });

  if (!ok) {
    return null;
  }

  if (totalProducts === 0) {
    return null;
  }

  return (
    <div className="mx-auto grid max-w-2xl gap-3 py-16 sm:py-16 lg:max-w-none">
      <h2 className="text-2xl font-bold text-gray-900">Productos destacados</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Aquí se mostrarán los productos destacados */}

        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
