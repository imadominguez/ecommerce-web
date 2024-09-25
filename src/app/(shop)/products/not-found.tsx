'use client';

import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { LoaderCircle, ShoppingBag } from 'lucide-react';

export default function ProductosNoEncontrados() {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };
  // Add a message to inform the user about the error
  const errorMessage =
    'No se encontraron productos que coincidan con tu búsqueda.';

  // Add a state to track the loading state
  const [isLoading, setIsLoading] = useState(false);

  // Add a useEffect hook to handle the loading state
  useEffect(() => {
    // Set isLoading to true when the component mounts
    setIsLoading(true);

    // Simulate an API call or any asynchronous operation
    setTimeout(() => {
      // Set isLoading to false when the operation is complete
      setIsLoading(false);
    }, 2000); // Change the delay time as needed
  }, []);

  // Render a loading spinner while the data is being fetched
  if (isLoading) {
    return (
      <PageContainer className="flex items-center justify-center">
        <LoaderCircle size={40} color="gray" className="animate-spin" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex flex-col items-center justify-center text-center">
      <div className="space-y-5 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-2xl font-bold">Algo salió mal</h1>
        <p className="text-center text-base opacity-80">{errorMessage}</p>
      </div>
    </PageContainer>
  );
}
