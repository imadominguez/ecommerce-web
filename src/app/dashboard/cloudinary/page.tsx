import { Card, CardContent } from '@/components/ui/card';
import { MediaGallery } from './components/MediaGallery';
import { BtnUpImageCld } from './components/BtnUpImageCld';
import { PageContainer } from '@/components/layout/page-container';
import { getImagesCloudinary } from '@/lib/cloudinary';

export default async function CloudinaryPage() {
  const resources = await getImagesCloudinary();
  return (
    <PageContainer>
      <h1 className="mb-4 text-2xl font-bold">Dashboard de Fotos</h1>

      {/* Sección para subir fotos */}
      <Card className="mb-8 max-w-64 !shadow-none">
        <CardContent className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">Subir Foto</h2>

          <BtnUpImageCld />
        </CardContent>
      </Card>

      {/* Galería de imágenes */}
      <h2 className="mb-4 text-xl font-semibold">Tus Fotos</h2>

      <MediaGallery resources={resources} />
    </PageContainer>
  );
}
