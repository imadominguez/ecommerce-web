'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Upload } from 'lucide-react';
import { useProductStore } from '@/store/product/useProductStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PRODUCT_IMAGE_PLACEHOLDER = '/imgs/placeholder.jpg';

export const ProductImages = () => {
  const { images, setImages, clearImages } = useProductStore((state) => ({
    images: state.images,
    setImages: state.setImages,
    clearImages: state.clearImages,
  }));

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

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
          <p>
            <span className="font-semibold">Nota:</span> Puedes subir hasta 5
            imágenes.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {images.length === 0 ? (
              <>
                <div className="col-span-3">
                  <Image
                    alt="Placeholder"
                    className="aspect-square w-full rounded-md object-cover"
                    height={300}
                    src={PRODUCT_IMAGE_PLACEHOLDER}
                    width={300}
                  />
                </div>
                <Image
                  alt="Placeholder"
                  className="aspect-square w-full rounded-md object-cover"
                  height={300}
                  src={PRODUCT_IMAGE_PLACEHOLDER}
                  width={300}
                />
                <Image
                  alt="Placeholder"
                  className="aspect-square w-full rounded-md object-cover"
                  height={300}
                  src={PRODUCT_IMAGE_PLACEHOLDER}
                  width={300}
                />
              </>
            ) : images.length === 1 ? (
              <>
                <div className="col-span-3">
                  <Image
                    alt="Product Image"
                    className="aspect-square w-full rounded-md object-cover"
                    height={300}
                    src={images[0]}
                    width={300}
                  />
                </div>
                <Image
                  alt="Placeholder"
                  className="aspect-square w-full rounded-md object-cover"
                  height={300}
                  src={PRODUCT_IMAGE_PLACEHOLDER}
                  width={300}
                />
                <Image
                  alt="Placeholder"
                  className="aspect-square w-full rounded-md object-cover"
                  height={300}
                  src={PRODUCT_IMAGE_PLACEHOLDER}
                  width={300}
                />
              </>
            ) : (
              <>
                <div className="col-span-3">
                  <Image
                    alt="Product Image"
                    className="aspect-square w-full rounded-md object-cover"
                    height={300}
                    src={images[0]}
                    width={300}
                  />
                </div>
                {images.slice(1).map((image, index) => (
                  <Image
                    alt="Product Image"
                    className="aspect-square w-full rounded-md object-cover"
                    height={300}
                    key={index}
                    src={image}
                    width={300}
                  />
                ))}
              </>
            )}

            <Label
              className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-dashed"
              htmlFor="image-upload"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
              <Input
                id="image-upload"
                accept="image/png"
                className="hidden"
                multiple
                onChange={handleImageUpload}
                type="file"
              />
            </Label>
          </div>
          <div className="mt-3">
            <Button
              variant={'secondary'}
              className="w-full"
              onClick={clearImages}
            >
              Limpiar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
