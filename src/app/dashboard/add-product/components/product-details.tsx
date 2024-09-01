'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';
import { SelectCategory } from './select-category';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/product/useProductStore';
import { useCategoryStore } from '@/store/category/useCategoryStore';

interface ProductDetailsProps {
  initialName?: string;
  initialDescription?: string;
  initialInStock?: number;
  initialCategory?: string;
  initialIsFeatured?: boolean;
  initialStatus?: boolean;
}

const ProductDetails = ({
  initialName = '',
  initialDescription = '',
  initialInStock = 0,
  initialCategory = '',
  initialIsFeatured = false,
  initialStatus = false,
}: ProductDetailsProps) => {
  const {
    title,
    description,
    inStock,
    category,
    isFeatured,
    status,
    price,
    setName,
    setDescription,
    setPrice,
    setInStock,
    setIsActive,
    setCategory,
    setIsFeatured,
    clearStore: clearProductStore,
  } = useProductStore((state) => ({
    title: state.title || initialName,
    description: state.description || initialDescription,
    inStock: state.inStock || initialInStock,
    category: state.categoryId || initialCategory,
    isFeatured: state.isFeatured || initialIsFeatured,
    status: state.isActive || initialStatus,
    price: state.price || 0,
    setName: state.setName,
    setDescription: state.setDescription,
    setPrice: state.setPrice,
    setIsActive: state.setIsActive,
    setInStock: state.setInStock,
    setCategory: state.setCategory,
    setIsFeatured: state.setIsFeatured,

    clearStore: state.clearStore,
  }));

  const { clearStore: clearCategoryStore } = useCategoryStore();

  const handleClearStore = () => {
    clearCategoryStore();
    clearProductStore();
  };

  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Detalle del producto</CardTitle>
        <CardDescription>
          Ingresa los detalles del producto, como su nombre y descripción.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="title"
              type="text"
              className="w-full"
              placeholder="Ingresa el nombre..."
              value={title}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Ingrese la descripción del producto..."
              className="min-h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 place-content-center gap-3">
          <div className="grid gap-2">
            <Label htmlFor="price">Precio</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="inStock">Stock</Label>
            <Input
              id="inStock"
              name="inStock"
              type="number"
              min={0}
              value={inStock}
              onChange={(e) => setInStock(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 place-content-center gap-3">
          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <SelectCategory
              value={category}
              onChange={(value) => setCategory(value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="isFeatured">Destacado</Label>
            <Select
              value={isFeatured ? 'true' : 'false'}
              onValueChange={(value) => setIsFeatured(value === 'true')}
            >
              <SelectTrigger
                id="isFeatured"
                aria-label="Select isFeatured"
                defaultValue={'false'}
              >
                <SelectValue placeholder="Selecciona si es destacado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Si</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 place-content-center gap-3">
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status ? 'true' : 'false'}
              onValueChange={(value) => setIsActive(value === 'true')}
            >
              <SelectTrigger id="status" aria-label="Select status">
                <SelectValue placeholder="Selecciona el status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Activo</SelectItem>
                <SelectItem value="false">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-3">
          <Button onClick={handleClearStore} className="w-full uppercase">
            Limpiar formulario
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
