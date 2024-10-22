import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { db } from '@/lib/db';
import { FormShippingPrice } from './form-shipping-price';

export const dynamic = 'force-cache';

export const ShippingPrice = async () => {
  const [shippingPrice] = await db.shippingPrice.findMany();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Precios de envío</CardTitle>
      </CardHeader>
      <CardContent>
        <FormShippingPrice {...shippingPrice} />
      </CardContent>
    </Card>
  );
};
