import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderConfirmation({ params: { id } }: Props) {
  const order = await db.order.findUnique({
    where: {
      id,
    },
    include: {
      OrderAddress: true,
      OrderItem: {
        select: {
          price: true,
          quantity: true,
          product: {
            select: {
              title: true,
              slug: true,

              images: true,
            },
          },
        },
      },
    },
  });

  console.log({ order });
  return (
    // <div className="min-h-screen p-8">
    //   <div className="mx-auto max-w-4xl">
    //     <h1 className="mb-6 text-2xl font-bold">Orden #4f97c5689ba4</h1>
    //     <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
    //       <div className="space-y-6">
    //         <Card className="bg-red-500">
    //           <CardContent className="flex items-center p-4">
    //             <ShoppingCart className="mr-2" />
    //             <span>Pendiente de pago</span>
    //           </CardContent>
    //         </Card>
    //         <Card className="">
    //           <CardContent className="p-4">
    //             <div className="flex items-center space-x-4">
    //               <Image
    //                 src="/placeholder.svg?height=80&width=80"
    //                 alt="Relaxed T Logo Hat"
    //                 width={80}
    //                 height={80}
    //                 className="rounded-md"
    //               />
    //               <div>
    //                 <h3 className="font-semibold">Relaxed T Logo Hat</h3>
    //                 <p className="text-sm text-gray-400">30 x 1</p>
    //                 <p className="font-semibold">Subtotal: $30,00</p>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </div>
    //       <div>
    //         <Card className="mb-6">
    //           <CardHeader>
    //             <CardTitle>Dirección de entrega</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <p>Imanol Dominguez</p>
    //             <p>Republica del Libano 4142</p>
    //             <p>AR</p>
    //             <p>CP: 7400</p>
    //             <p>2284633631</p>
    //           </CardContent>
    //         </Card>
    //         <Card className="">
    //           <CardHeader>
    //             <CardTitle>Resumen de orden</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="space-y-2">
    //               <div className="flex justify-between">
    //                 <span>No Productos</span>
    //                 <span>1 artículo</span>
    //               </div>
    //               <div className="flex justify-between">
    //                 <span>Subtotal</span>
    //                 <span>$30,00</span>
    //               </div>
    //               <div className="flex justify-between">
    //                 <span>Impuestos 15%</span>
    //                 <span>$4,50</span>
    //               </div>
    //               <Separator className="my-2" />
    //               <div className="flex justify-between font-semibold">
    //                 <span>Total:</span>
    //                 <span>$34,50</span>
    //               </div>
    //             </div>
    //             <Card className="bg-red-500">
    //               <CardContent className="flex items-center p-4">
    //                 <ShoppingCart className="mr-2" />
    //                 <span>Pendiente de pago</span>
    //               </CardContent>
    //             </Card>
    //             <Button className="mt-4 w-full bg-[#009ee3] hover:bg-[#007eb5]">
    //               Pagar con Mercado Pago
    //             </Button>
    //             <Button variant="outline" className="mt-4 w-full">
    //               Tarjeta de débito o crédito
    //             </Button>
    //             <p className="mt-4 text-center text-xs text-gray-400">
    //               Desarrollado por Mercado Pago
    //             </p>
    //           </CardContent>
    //         </Card>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>{JSON.stringify(order, null, 2)}</>
  );
}
