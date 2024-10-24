'use client';

import { deleteBrand } from '@/actions/brand/delete-brand';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoaderCircle, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  name: string;
  id: string;
}

export const DeleteBrand = ({ name, id }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDeleteBrand = async () => {
    setLoading(true);
    console.log('hola');
    const { ok, message } = await deleteBrand(id);

    if (!ok) {
      toast.error(message);
      setLoading(false);
      return;
    }

    toast.success(message);
    setLoading(false);
    setOpen(false);
    router.refresh();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'} variant={'destructive'}>
          <Trash2Icon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Eliminar marca</DialogTitle>
          <DialogDescription>
            Seguro que quieres eliminar la marca{' '}
            <span className="font-black capitalize">{name}</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            className="w-fit"
            variant={'secondary'}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteBrand}
            className="w-fit"
            variant={'destructive'}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              'Eliminar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
