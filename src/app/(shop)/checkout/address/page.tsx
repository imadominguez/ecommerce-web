// import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';

// import { getCountries, getUserAddress } from '@/actions';
// import { auth } from '@/auth.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dirección - Teslo | SHOP',
  description:
    'Completa y actualiza tu dirección de entrega en Teslo SHOP. Asegúrate de que tus pedidos se entreguen correctamente al proporcionar una dirección de envío precisa y actualizada.',
  keywords:
    'Dirección, Teslo, SHOP, Dirección de Entrega, Formulario de Dirección',
};

export default async function AddressPage() {
  // const countries = await getCountries();

  // const session = await auth();

  // if (!session?.user) {
  //   return <h3 className="text-5xl">500 - No hay sesión de usuario</h3>;
  // }

  // const userAddress = (await getUserAddress(session.user.id)) ?? undefined;

  return (
    <div className="mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0">
      <div className="flex w-full flex-col justify-center text-left xl:w-[1000px]">
        {/* <Title title="Dirección" subtitle="Dirección de entrega" /> */}
        <h1 className="text-3xl font-bold">Dirección</h1>
        {/* <AddressForm countries={countries} userStoredAddress={userAddress} /> */}
      </div>
    </div>
  );
}
