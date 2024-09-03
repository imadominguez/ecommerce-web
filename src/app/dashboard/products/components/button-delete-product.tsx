'use client';

import { deleteProduct } from '@/actions/products/delete-product';
import { Button } from '@/components/ui/button';
import { LoaderCircleIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  slug: string;
}

export const ButtonDeleteProduct = ({ slug }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { refresh } = useRouter();

  const handleClick = async () => {
    setIsDeleting(true);
    const { message, ok } = await deleteProduct(slug);

    if (ok) {
      toast.success(message);
      setIsDeleting(false);
      refresh();
    } else {
      toast.error(message);
      setIsDeleting(false);
      console.error(message);
    }
  };

  return (
    <Button
      variant={'destructive'}
      onClick={handleClick}
      className="w-full justify-start"
      disabled={isDeleting}
    >
      {isDeleting ? (
        <LoaderCircleIcon className="animate-spin" size={16} />
      ) : (
        <>
          <TrashIcon className="mr-2 h-4 w-4" />
          <span>Eliminar</span>
        </>
      )}
    </Button>
  );
};
