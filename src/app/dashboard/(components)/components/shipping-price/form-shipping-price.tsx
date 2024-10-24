'use client';
import { updatedShippingPrice } from '@/actions/shipping-price/updated-shipping-price';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  olavarria: number;
  otherCities: number;
  id: string;
}
export const FormShippingPrice = ({ otherCities, olavarria, id }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState({
    olavarria: olavarria ?? 0,
    otherCities: otherCities ?? 0,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    if (price.olavarria === olavarria && price.otherCities === otherCities) {
      toast.error('No has realizado ningún cambio de precio');
      setLoading(false);
      return;
    }
    const { ok, message } = await updatedShippingPrice(price, id);
    if (ok) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    setLoading(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="olavarria">Olavarria</Label>
        <Input
          id="olavarria"
          type="number"
          name="olavarria"
          value={price.olavarria}
          onChange={(e) =>
            setPrice({ ...price, olavarria: parseInt(e.target.value) })
          }
          placeholder="Precio para Olavarria"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="otherCities">Otras ciudades</Label>
        <Input
          id="otherCities"
          type="number"
          name="otherCities"
          value={price.otherCities}
          onChange={(e) =>
            setPrice({ ...price, otherCities: parseInt(e.target.value) })
          }
          placeholder="Precio para otras ciudades"
        />
      </div>
      <Button
        disabled={loading}
        variant={'standard'}
        type="submit"
        className="w-full"
      >
        {loading ? (
          <>
            <LoaderCircleIcon className="h-5 w-5 animate-spin" />
          </>
        ) : (
          <>{id ? 'Actualizar' : 'Crear'} precios</>
        )}
      </Button>
    </form>
  );
};
