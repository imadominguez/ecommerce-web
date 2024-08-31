'use client';

import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';

export default function ProductosNoEncontrados() {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };

  return (
    <PageContainer className="flex flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Productos no encontrados
      </h1>
      <p className="mb-8 text-xl text-gray-600">
        Lo sentimos, no pudimos encontrar los productos que estás buscando.
      </p>
      <Button onClick={handleRetry} className="uppercase">
        Intentar nuevamente
      </Button>
    </PageContainer>
  );
}
