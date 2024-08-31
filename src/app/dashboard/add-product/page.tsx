import Image from 'next/image';
import { Suspense } from 'react';
import { BackRouteButton } from '@/components/button/back-route-button';
import { PageContainer } from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SelectCategorySkeleton } from './components/select-category-skeleton';
import { SelectCategory } from './components/select-category';
import { Upload } from 'lucide-react';
export default function AddProductPage() {
  return (
    <PageContainer>
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        {/* Product name, in stock and save change */}
        <div className="flex items-center gap-4">
          <BackRouteButton />
          {/* Product Name */}
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Nuevo Producto
          </h1>
          {/* In stock badge */}
          <Badge variant="outline" className="ml-auto sm:ml-0">
            In stock
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Descartar
            </Button>
            <Button size="sm">Guardar producto</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            {/* Product Details */}
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Detalle del producto</CardTitle>
                <CardDescription>
                  Ingresa los detalles del producto, como su nombre y
                  descripción.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="title"
                      type="text"
                      className="w-full"
                      placeholder="Ingresa el nombre..."
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      placeholder="Ingrese la descripción del producto..."
                      className="min-h-32"
                    />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 place-content-center gap-3">
                  <div className="grid gap-3">
                    <Label htmlFor="inStock">Stock</Label>
                    <Input id="inStock" name="inStock" type="number" min={0} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="category">Categoria</Label>

                    <Suspense fallback={<SelectCategorySkeleton />}>
                      <SelectCategory />
                    </Suspense>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            {/* Product Status */}
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
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
              </CardContent>
            </Card>
            {/* Product Image */}
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Imagenes del producto</CardTitle>
                <CardDescription>
                  Añade imágenes de tu producto para que los clientes puedan
                  verlo desde diferentes ángulos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="/imgs/placeholder.jpg"
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/imgs/placeholder.jpg"
                        width="84"
                      />
                    </button>
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/imgs/placeholder.jpg"
                        width="84"
                      />
                    </button>
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
    </PageContainer>
  );
}
