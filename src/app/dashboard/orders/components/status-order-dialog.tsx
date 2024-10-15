'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface Props {
  order_id: string;
  status: string;
  name: string;
}

export const DialogOrderStatus = ({ order_id, status, name }: Props) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  return (
    <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar Estado de la Orden</DialogTitle>
          <DialogDescription>
            Cambia el estado de la orden {order_id} para {name}.
          </DialogDescription>
        </DialogHeader>
        <Select value={status}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un nuevo estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="En proceso">En proceso</SelectItem>
            <SelectItem value="Enviado">Enviado</SelectItem>
            <SelectItem value="Entregado">Entregado</SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsUpdateModalOpen(false)}>
            Cancelar
          </Button>
          <Button>Actualizar Estado</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
