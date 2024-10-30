'use client';

import { paymentMP } from '@/actions/payment/mercadopago';
import { CustomLinkButton } from '@/components/button/custom-link-button';
import { Button } from '@/components/ui/button';
import { CreditCardIcon, LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  products: {
    title: string;
    quantity: number;
    unit_price: number;
  }[];
  order_id: string;
  envio: number;
}

export const ButtonMp = ({ products, order_id, envio }: Props) => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const generateLink = async () => {
      setLoading(true);

      try {
        const generatePreference = await paymentMP({
          products,
          order_id,
          envio,
        });
        if (generatePreference.url) {
          setUrl(generatePreference.url);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    generateLink();
  }, [products, order_id]);
  return (
    <div className="w-full">
      {loading ? (
        <Button variant={'payment'} disabled className="w-full">
          <LoaderCircleIcon className="h-5 w-5 animate-spin" />
        </Button>
      ) : (
        <CustomLinkButton
          target
          variant={'payment'}
          href={url}
          className="w-full"
        >
          <CreditCardIcon className="mr-2 h-5 w-5" />
          Pagar con Mercado Pago
        </CustomLinkButton>
      )}
    </div>
  );
};
