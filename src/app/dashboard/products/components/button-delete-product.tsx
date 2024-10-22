'use client';

import { deleteProduct } from '@/actions/products/delete-product';
import { Button } from '@/components/ui/button';
import { LoaderCircleIcon, Trash2Icon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
      toast.success('El producto ha sido eliminado');
      setIsDeleting(false);
      refresh();
    } else {
      toast.error('Error al eliminar el producto');
      setIsDeleting(false);
      console.error(message);
    }
  };

  return (
    <Button variant={'destructive'} onClick={handleClick} disabled={isDeleting}>
      {isDeleting ? (
        <LoaderCircleIcon className="animate-spin" size={16} />
      ) : (
        <>
          <Trash2Icon className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </>
      )}
    </Button>
  );
};
