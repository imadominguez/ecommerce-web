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
}

export const paymentMP = async ({ products }: Props) => {
  const preference = await new Preference(client).create({
    body: {
      items: products.map((product, index) => ({
        ...product,
        id: `producto-${index + 1}`,
      })),
      notification_url:
        'https://www.servicios-integrados.vercel.app/api/webhook',
      external_reference: '',
    },
  });

  return {
    url: preference.init_point,
  };
};
