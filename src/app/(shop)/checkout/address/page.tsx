// import { Title } from '@/components';
import { db } from '@/lib/db';
import { AddressForm } from './ui/AddressForm';

// import { getCountries, getUserAddress } from '@/actions';

import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { PageContainer } from '@/components/layout/page-container';

export const metadata: Metadata = {
  title: 'Dirección - Teslo | SHOP',
  description:
    'Completa y actualiza tu dirección de entrega en Teslo SHOP. Asegúrate de que tus pedidos se entreguen correctamente al proporcionar una dirección de envío precisa y actualizada.',
  keywords:
    'Dirección, Teslo, SHOP, Dirección de Entrega, Formulario de Dirección',
};

export default async function AddressPage() {
  const countries = await db.country.findMany();

  const session = await auth();

  // Si no hay sesion redireccionar a login con un param de redireccion a esta pagina
  if (!session?.user) {
    redirect('/login?redirect=/checkout/address');
  }

  // const userAddress = (await getUserAddress(session.user.id)) ?? undefined;

  return (
    <PageContainer>
      <AddressForm />
    </PageContainer>
  );
}
