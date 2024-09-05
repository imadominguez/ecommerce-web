import { Carrousel } from '@/components/carrousel';
import { PageContainer } from '@/components/layout/page-container';
import { ProductsFeatured } from './components/products-featured';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <PageContainer>
      {/* <Carrousel images={CARROUSEL_IMAGES_HOME} delay={1000} loop /> */}
      <Carrousel />

      {/* Section sobre nosotros */}
      <section className="py-16">
        <div className="container mx-auto grid grid-cols-1 gap-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-center text-3xl uppercase text-primary md:text-4xl">
              <strong>Sobre nosotros</strong>
            </h2>
            <p className="max-w-3xl text-balance md:text-center">
              Descubre nuestra <strong>plataforma integral</strong> que ofrece{' '}
              <strong>
                servicios expertos en calefacción, seguridad y computación
              </strong>
              . Desde{' '}
              <strong>
                instalaciones de sistemas de calefacción eficientes{' '}
              </strong>
              hasta <strong>soluciones de seguridad avanzadas</strong> y{' '}
              <strong>servicios de informática personalizados</strong>, estamos
              aquí para cubrir todas tus necesidades. Confía en nosotros para
              garantizar un hogar seguro, cálido y tecnológicamente avanzado.
            </p>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="mx-auto grid w-full max-w-2xl gap-3 py-16 sm:py-16 lg:max-w-none">
            <h2 className="text-2xl font-bold text-gray-900">
              <strong>Productos destacados</strong>
            </h2>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Aquí se mostrarán los productos destacados */}
              {/* Skeleton */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[400px] w-full animate-pulse rounded-md bg-muted-foreground/40"
                />
              ))}
            </div>
          </div>
        }
      >
        <ProductsFeatured />
      </Suspense>
    </PageContainer>
  );
}
