'use client';

import { CircleMinusIcon, CirclePlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

// Propiedades esperadas para el componente QuantitySelector
interface Props {
  quantity: number;
  quantityTotal?: number;
  // eslint-disable-next-line no-unused-vars
  onQuantityChange: (value: number) => void;
}

// Componente para seleccionar la cantidad de productos
export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  quantityTotal,
}: Props) => {
  const { toast } = useToast();
  // Función para manejar el cambio en la cantidad
  const onQuantityValue = (value: number) => {
    // Verificar que la cantidad no pase el total de stock del producto
    if (quantityTotal) {
      if (quantity + value > quantityTotal) {
        toast({
          variant: 'destructive',
          title: `La cantidad supera el stock disponible del producto `,
          duration: 1500,
        });
        return;
      }
    }

    // Verificar que la nueva cantidad no sea menor que 1
    if (quantity + value < 1) return;
    // Llamar a la función proporcionada para cambiar la cantidad
    onQuantityChange(quantity + value);
  };

  return (
    // Contenedor flex con botones para incrementar y decrementar la cantidad
    <div className="flex items-center rounded">
      {/* Botón para decrementar la cantidad */}
      <Button
        onClick={() => onQuantityValue(-1)}
        size={'icon'}
        variant={'outline'}
        className="rounded-full leading-10 transition hover:opacity-75"
      >
        <CircleMinusIcon className="h-5 w-5" />
      </Button>

      {/* Visualización de la cantidad actual */}
      <span className="bg-dark-accent mx-1 w-8 rounded px-2 py-1 text-center">
        {quantity}
      </span>

      {/* Botón para incrementar la cantidad */}
      <Button
        onClick={() => onQuantityValue(+1)}
        size={'icon'}
        variant={'outline'}
        className="rounded-full leading-10 transition hover:opacity-75"
      >
        <CirclePlusIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};
