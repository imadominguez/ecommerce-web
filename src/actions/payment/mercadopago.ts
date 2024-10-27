'use server';

import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN ?? '',
});
interface Props {
  products: {
    title: string;
    quantity: number;
    unit_price: number;
  }[];
  order_id: string;
}

export const paymentMP = async ({ products, order_id }: Props) => {
  const productsBody = products.map((product, index) => ({
    ...product,
    id: `producto-${index + 1}`,
  }));
  const preference = await new Preference(client).create({
    body: {
      items: [
        {
          id: 'Envio',
          quantity: 1,
          title: 'Envio',
          unit_price: 2000,
        },
        ...productsBody,
      ],
      notification_url:
        'https://www.servicios-integrados.vercel.app/api/webhook',
      external_reference: order_id,
    },
  });

  return {
    url: preference.init_point,
  };
};
