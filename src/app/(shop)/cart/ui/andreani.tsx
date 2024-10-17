'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

export const ConsultaEnvio = () => {
  const [codigoPostal, setCodigoPostal] = useState('');
  const [tarifa, setTarifa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCodigoPostal(e.target.value);
  };

  const consultarTarifa = async () => {
    setLoading(true);
    setError('');
    setTarifa(null);

    // Aquí llamamos a la API de Andreani para consultar tarifas
    const url = 'https://api.andreani.com/v1/tarifas';
    const data = {
      origen: { codigoPostal: '7400' }, // Código postal de tu ecommerce
      destino: { codigoPostal },
      bultos: [{ valorDeclarado: 1000, peso: 2 }], // Valores fijos para ejemplo
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setTarifa(result);
      } else {
        setError('No se pudo obtener la tarifa. Verifica el código postal.');
      }
    } catch (err) {
      setError('Error al conectar con la API.');
    }

    setLoading(false);
  };

  return (
    <Card className="mx-auto mt-10 max-w-md">
      <CardHeader>
        <CardTitle>Consulta el costo de envío</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="codigo-postal">Código Postal</Label>
          <Input
            id="codigo-postal"
            placeholder="Ingrese su código postal"
            value={codigoPostal}
            onChange={handleInputChange}
            className="mt-2"
          />
        </div>
        <Button onClick={consultarTarifa} disabled={loading}>
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            'Consultar Envío'
          )}
        </Button>

        {tarifa && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Costo del Envío:</h4>
            <p>${tarifa}</p>
          </div>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </CardContent>
    </Card>
  );
};
