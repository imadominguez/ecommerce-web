'use client';

import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';

export default function ProductosNoEncontrados() {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };
  // Add a message to inform the user about the error
  const errorMessage = 'Oops! Something went wrong. Please try again later.';

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
        <LoaderCircle size={40} color="gray" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Productos no encontrados
      </h1>
      <p className="mb-8 text-xl text-gray-600">{errorMessage}</p>
      <Button onClick={handleRetry} className="uppercase">
        Intentar nuevamente
      </Button>
    </PageContainer>
  );
}
