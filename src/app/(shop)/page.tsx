import { Carrousel } from '@/components/carrousel';
import { PageContainer } from '@/components/layout/page-container';
import { ProductsFeatured } from './_components/products-featured';
import { Suspense } from 'react';
import { WhyUs } from './_components/why-us';
import { CARROUSEL_IMAGES_HOME } from '@/lib/constant';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { CustomLinkButton } from '@/components/button/custom-link-button';
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Servicios Integrados Home',
  description:
    'Expertos en calefacción, seguridad y computación en Olavarria. Productos de calidad respaldados por Ariston Termo Argentina. Soluciones personalizadas y mantenimiento.',
  keywords: [
    'servicios de calefacción',
    'sistemas de seguridad',
    'servicios informáticos',
    'mantenimiento de calderas',
    'cartuchos de tinta',
    'cartuchos',
    'epson',
    'hp',
  ],
};

export default async function Home() {
  return (
    <PageContainer>
      <Carrousel images={CARROUSEL_IMAGES_HOME} delay={1} loop />
      {/* <Carrousel /> */}
      {/* Section hero promo */}
      <Card className="my-10 rounded border px-4 py-8 shadow-md sm:px-0 sm:py-12">
        <CardContent>
          <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-5 sm:px-16 md:grid-cols-2">
            <div className="mx-auto max-w-md space-y-4">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-4xl">
                Descubre nuestra colección seleccionada
              </h2>
              <p className="text-pretty text-sm text-muted-foreground md:text-base">
                Explora nuestra exclusiva colección de cartuchos de tinta de
                alta calidad.
              </p>
              <CustomLinkButton href={'/products'} variant="default">
                Comprar ahora
              </CustomLinkButton>
            </div>
            <Image
              src={'/products/1473809-00-A_alt.jpg'}
              width={800}
              height={800}
              alt="image"
              className="aspect-auto h-[30dvh] w-full rounded md:max-h-96 lg:h-[40dvh]"
            />
          </div>
        </CardContent>
      </Card>
      <Separator />
      {/* Section sobre nosotros */}
      <Card className="my-5 rounded-md border py-16 shadow-md">
        <CardContent>
          <div className="container mx-auto grid grid-cols-1 gap-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <h2 className="text-center text-xl uppercase text-primary md:text-2xl">
                <strong>Sobre nosotros</strong>
              </h2>
              <p className="max-w-3xl text-balance text-center text-sm sm:text-sm md:text-base">
                Descubre nuestra <strong>plataforma integral</strong>
                ,especializada en{' '}
                <strong>
                  servicios de calefacción, seguridad y computación
                </strong>
                . Ofrecemos soluciones expertas que van desde la
                <strong>
                  instalación de sistemas de calefacción eficientes{' '}
                </strong>
                hasta la{' '}
                <strong>
                  implementación de tecnologías avanzadas de seguridad
                </strong>{' '}
                y <strong>servicios informáticos personalizados.</strong> Nos
                comprometemos a cubrir todas tus necesidades, asegurando un{' '}
                <strong>
                  hogar seguro, cálido y tecnológicamente avanzado
                </strong>
                . Confía en nosotros para brindarte el confort y la tranquilidad
                que mereces.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Separator />

      <Suspense fallback={<></>}>
        <ProductsFeatured />
      </Suspense>

      <WhyUs />
    </PageContainer>
  );
}
