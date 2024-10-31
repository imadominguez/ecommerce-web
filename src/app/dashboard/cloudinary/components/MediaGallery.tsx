'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CldImage } from 'next-cloudinary';
import { BtnDeleteCld } from './BtnDeleteCld';

interface CloudinaryResource {
  height: number;
  width: number;
  secure_url: string;
  public_id: string;
}

interface MediaGalleryProps {
  resources: Array<CloudinaryResource>;
}

export const MediaGallery = ({ resources }: MediaGalleryProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {resources.map((imagen, index: number) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="group relative !p-0">
            <CldImage
              src={imagen.public_id}
              alt={''}
              width={imagen.width}
              height={imagen.height}
              className="h-80 w-full object-cover"
              sizes="(min-width: 768px) 35vw, (min-width: 1024px) 25vw, (min-width: 1280px) 20vw, 50vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
              <BtnDeleteCld key_id={index} publicId={imagen.public_id} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
