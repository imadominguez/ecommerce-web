'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const BtnDeleteCld = ({
  key,
  publicId,
}: {
  key: number;
  publicId: string;
}) => {
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOnDelete = async () => {
    setLoading(true);
    try {
      await fetch('/api/delete', {
        method: 'POST',
        body: JSON.stringify({
          publicId,
        }),
      });
      toast.success('Imagen eliminada');
      setOpen(false);
      refresh();
    } catch (error) {
      toast.error('No se pudo eliminar la imagen');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog key={key} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="absolute bottom-2 right-2">
          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
        </Button>
      </DialogTrigger>
      <DialogContent
        data-exclude-close-on-click={true}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>Estas seguro de eliminar la foto?</DialogHeader>
        <DialogFooter>
          <Button
            variant={'destructive'}
            disabled={loading}
            onClick={handleOnDelete}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
