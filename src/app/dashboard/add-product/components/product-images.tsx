import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Upload } from 'lucide-react';

const PRODUCT_IMAGE_PLACEHOLDER = '/imgs/placeholder.jpg';

export const ProductImages = () => {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Imagenes del producto</CardTitle>
        <CardDescription>
          Añade imágenes de tu producto para que los clientes puedan verlo desde
          diferentes ángulos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={PRODUCT_IMAGE_PLACEHOLDER}
            width="300"
          />
          <div className="grid grid-cols-3 gap-2">
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src={PRODUCT_IMAGE_PLACEHOLDER}
                width="84"
              />
            </button>
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src={PRODUCT_IMAGE_PLACEHOLDER}
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
  );
};
