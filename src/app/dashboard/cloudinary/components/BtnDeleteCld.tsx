'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const BtnDeleteCld = ({
  key_id,
  publicId,
}: {
  key_id: number;
  publicId: string;
}) => {
  const { toast } = useToast();
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
      toast({
        variant: 'success',
        title: 'Imagen eliminada',
      });
      setOpen(false);
      refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'No se pudo eliminar la imagen',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog key={key_id} open={open} onOpenChange={setOpen}>
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
