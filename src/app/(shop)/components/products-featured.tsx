import { getProducts } from '@/actions/products/get-products';
import { ProductCard } from '@/components/product/product-card';

export const ProductsFeatured = async () => {
  const {
    products: productsFeatured,
    ok,
    totalProducts,
  } = await getProducts({
    isFeatured: true,
  });

  if (!ok) {
    return null;
  }

  if (productsFeatured.length === 0 || totalProducts < 4) {
    const { ok, products: productsAll } = await getProducts({ take: 4 });

    if (!ok) {
      return null;
    }

    return (
      <div className="mx-auto grid max-w-2xl gap-3 py-16 sm:py-16 lg:max-w-none">
        <h2 className="mb-4 text-4xl font-bold">Productos destacados</h2>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {/* Aquí se mostrarán los productos destacados */}

          {productsAll.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-2xl gap-3 py-16 sm:py-16 lg:max-w-none">
      <h2 className="mb-4 text-4xl font-bold">Productos destacados</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Aquí se mostrarán los productos destacados */}

        {productsFeatured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
