'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export function AddressForm() {
  const [billingType, setBillingType] = useState('consumidor_final');
  const [isApartment, setIsApartment] = useState(false);
  const [saveData, setSaveData] = useState(false);

  return (
    <Card className="mx-auto w-full max-w-2xl bg-muted shadow-md">
      <CardHeader>
        <CardTitle>Formulario de Pedido</CardTitle>
        <CardDescription>
          Completa los datos de envío y facturación para finalizar tu pedido.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Selecciona un país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="argentina">Argentina</SelectItem>
                    <SelectItem value="chile">Chile</SelectItem>
                    <SelectItem value="uruguay">Uruguay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal-code">Código Postal</Label>
                <Input
                  id="postal-code"
                  placeholder="Ingresa tu código postal"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">Calle</Label>
                <Input id="street" placeholder="Nombre de la calle" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street-number">Número</Label>
                <Input id="street-number" placeholder="Número de calle" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is-apartment"
                checked={isApartment}
                onCheckedChange={() => setIsApartment(!isApartment)}
              />
              <Label htmlFor="is-apartment">Es departamento</Label>
            </div>
            {isApartment && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="floor">Piso</Label>
                  <Input id="floor" placeholder="Número de piso" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apartment">Departamento</Label>
                  <Input
                    id="apartment"
                    placeholder="Número o letra de departamento"
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Ingresa tu número de teléfono"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Datos de Facturación</h3>
            <RadioGroup
              defaultValue="consumidor_final"
              onValueChange={setBillingType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="consumidor_final"
                  id="consumidor_final"
                />
                <Label htmlFor="consumidor_final">Consumidor Final</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="responsable_inscripto"
                  id="responsable_inscripto"
                />
                <Label htmlFor="responsable_inscripto">
                  Responsable Inscripto
                </Label>
              </div>
            </RadioGroup>

            {billingType === 'responsable_inscripto' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cuit">CUIT/CUIL</Label>
                  <Input id="cuit" placeholder="Ingresa tu CUIT/CUIL" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razon-social">Razón Social</Label>
                  <Input
                    id="razon-social"
                    placeholder="Ingresa la razón social"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condicion-iva">Condición frente al IVA</Label>
                  <Select>
                    <SelectTrigger id="condicion-iva">
                      <SelectValue placeholder="Selecciona tu condición" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="responsable_inscripto">
                        Responsable Inscripto
                      </SelectItem>
                      <SelectItem value="monotributista">
                        Monotributista
                      </SelectItem>
                      <SelectItem value="exento">Exento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="save-data"
              checked={saveData}
              onCheckedChange={() => setSaveData(!saveData)}
            />
            <Label htmlFor="save-data">
              Guardar mis datos para futuras compras
            </Label>
          </div>

          <Button type="submit" className="w-full">
            Enviar Pedido
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
