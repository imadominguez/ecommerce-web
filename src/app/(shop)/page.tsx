import { Carrousel } from '@/components/carrousel';
import { PageContainer } from '@/components/layout/page-container';
import { ProductsFeatured } from './_components/products-featured';
import { Suspense } from 'react';
import { WhyUs } from './_components/why-us';

export default async function Home() {
  return (
    <PageContainer>
      {/* <Carrousel images={CARROUSEL_IMAGES_HOME} delay={1000} loop /> */}
      <Carrousel />

      {/* Section sobre nosotros */}
      <section className="my-10 py-16">
        <div className="container mx-auto grid grid-cols-1 gap-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-center text-3xl uppercase text-primary md:text-4xl">
              <strong>Sobre nosotros</strong>
            </h2>
            <p className="max-w-3xl text-pretty text-center">
              Descubre nuestra <strong>plataforma integral</strong>
              ,especializada en{' '}
              <strong>servicios de calefacción, seguridad y computación</strong>
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
              <strong>hogar seguro, cálido y tecnológicamente avanzado</strong>.
              Confía en nosotros para brindarte el confort y la tranquilidad que
              mereces.
            </p>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          // <div className="mx-auto grid w-full max-w-2xl gap-3 py-16 sm:py-16 lg:max-w-none">
          //   <h2 className="text-2xl font-bold text-gray-900">
          //     <strong>Productos destacados</strong>
          //   </h2>
          //   <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          //     {/* Aquí se mostrarán los productos destacados */}
          //     {/* Skeleton */}
          //     {Array.from({ length: 4 }).map((_, index) => (
          //       <div
          //         key={index}
          //         className="h-[400px] w-full animate-pulse rounded-md bg-muted-foreground/40"
          //       />
          //     ))}
          //   </div>
          // </div>
          <div></div>
        }
      >
        <ProductsFeatured />
      </Suspense>

      <WhyUs />
    </PageContainer>
  );
}
