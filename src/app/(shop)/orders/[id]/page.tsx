import { PageContainer } from '@/components/layout/page-container';
import { ProductImage } from '@/components/product/product-image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { currencyFormat } from '@/utils/currencyFormat';
import {
  CreditCard,
  MapPin,
  Phone,
  ShoppingBag,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <PageContainer
      className={`flex min-h-screen w-full max-w-none items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 transition-colors duration-300 dark:from-gray-900 dark:to-gray-800`}
    >
      <Card className="w-full max-w-3xl overflow-hidden shadow-xl dark:bg-gray-800 dark:text-white">
        <CardHeader className="flex w-full items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white dark:from-blue-800 dark:to-indigo-800 md:flex-row">
          <Badge variant="warning">Pendiente de pago</Badge>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="products">
                  <AccordionTrigger>
                    <h2 className="flex items-center text-lg font-semibold">
                      <ShoppingBag className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Detalles de los {order?.itemsInOrder} productos
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="">
                      <ScrollArea className="">
                        <CardContent className="space-y-4 p-4">
                          {order?.OrderItem.map((product, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-4 border-b pb-4 last:border-b-0 dark:border-gray-600"
                            >
                              <ProductImage
                                src={product.product.images[0]}
                                alt={product.product.slug}
                                width={60}
                                height={60}
                                className="rounded-md"
                              />
                              <div className="flex-grow">
                                <h3 className="font-medium">
                                  {product.product.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Cantidad: {product.quantity}
                                </p>
                              </div>
                              <p className="font-semibold text-blue-600 dark:text-blue-400">
                                {currencyFormat(
                                  product.price * product.quantity
                                )}
                              </p>
                            </div>
                          ))}
                        </CardContent>
                      </ScrollArea>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <h2 className="mb-4 flex items-center text-lg font-semibold">
                <Truck className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                Dirección de entrega
              </h2>
              <Card className="">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <MapPin className="mr-2 mt-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium capitalize">
                        {order?.OrderAddress?.firstName}{' '}
                        {order?.OrderAddress?.lastName}
                      </p>
                      <p className="text-sm">
                        {order?.OrderAddress?.street}{' '}
                        {order?.OrderAddress?.streetNumber}
                      </p>
                      <p className="text-sm">
                        AR, CP: {order?.OrderAddress?.postalCode}
                      </p>
                      <p className="text-sm">{order?.OrderAddress?.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="mb-4 mt-6 text-lg font-semibold">
                Cupón de descuento
              </h2>
              <form className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Ingresa tu código"
                  className="flex-grow"
                />
                <Button type="submit">Aplicar</Button>
              </form>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h2 className="mb-4 text-lg font-semibold">Resumen de la orden</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal
                </span>
                <span>{currencyFormat(order!.subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Envío</span>
                <span>{currencyFormat(order!.envio)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {currencyFormat(order!.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-[#009ee3] py-6 text-lg text-white hover:bg-[#007eb5]">
                  <ShoppingBag className="mr-2 h-5 w-5" /> Pagar con Mercado
                  Pago
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Confirmar pago</DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro de que deseas proceder con el pago de $
                    {order?.total.toFixed(2)} a través de Mercado Pago?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  {/* <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button> */}
                  {/* <Button onClick={() => {
                    setIsDialogOpen(false)
                    toast({
                      title: "Pago iniciado",
                      description: "Serás redirigido a Mercado Pago para completar tu pago.",
                    })
                  }}>Confirmar pago</Button> */}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Productos relacionados</h2>
            <div className="grid grid-cols-2 gap-4">
              {relatedProducts.map((product, index) => (
                <Card key={index} className="dark:bg-gray-700">
                  <CardContent className="p-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md mb-2"
                    />
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">${product.price.toFixed(2)}</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Agregar al carrito
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div> */}

          <div className="mt-6 space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>
              <Link
                href="#"
                className="underline hover:text-blue-600 dark:hover:text-blue-400"
              >
                Ver políticas de devolución y garantía
              </Link>
            </p>
            <p className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              Contacto del vendedor: +54 11 1234-5678
            </p>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
