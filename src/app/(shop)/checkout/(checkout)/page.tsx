import Link from 'next/link';
import { Metadata } from 'next';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PageContainer } from '@/components/layout/page-container';

export const metadata: Metadata = {
  title: 'Verificar Orden - Teslo | SHOP',
  description:
    'Verifica y ajusta los elementos de tu orden en Teslo SHOP antes de confirmar tu compra. Edita los productos en tu carrito y revisa un resumen detallado antes de proceder al pago.',
  keywords: 'Verificar Orden, Teslo, SHOP, Carrito, Confirmar Compra',
};

export default function CheckoutPage() {
  return (
    <PageContainer>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <div className="mt-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Shipping Information</h2>
            <div className="mt-2 grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" />
              </div>
              <div>
                <Label htmlFor="apartment">Apartment, suite, etc.</Label>
                <Input id="apartment" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal code</Label>
                  <Input id="postalCode" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Delivery method</h2>
            {/* <RadioGroup defaultValue="standard" className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard">
                  <div className="font-semibold">Standard</div>
                  <div className="text-sm text-gray-500">4-10 business days</div>
                  <div className="font-semibold mt-1">$5.00</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express">
                  <div className="font-semibold">Express</div>
                  <div className="text-sm text-gray-500">2-5 business days</div>
                  <div className="font-semibold mt-1">$16.00</div>
                </Label>
              </div>
            </RadioGroup> */}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Payment</h2>
            {/* <RadioGroup defaultValue="credit-card" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card">Credit card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="etransfer" id="etransfer" />
                <Label htmlFor="etransfer">eTransfer</Label>
              </div>
            </RadioGroup> */}
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card number</Label>
                <Input id="cardNumber" />
              </div>
              <div>
                <Label htmlFor="nameOnCard">Name on card</Label>
                <Input id="nameOnCard" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expirationDate">
                    Expiration date (MM/YY)
                  </Label>
                  <Input id="expirationDate" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Order summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <div className="h-16 w-16 rounded bg-gray-200" />
                    <div>
                      <div className="font-semibold">Basic Tee</div>
                      <div className="text-sm text-gray-500">Black</div>
                      <div className="text-sm text-gray-500">Large</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div>$32.00</div>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <div className="h-16 w-16 rounded bg-gray-200" />
                    <div>
                      <div className="font-semibold">Basic Tee</div>
                      <div className="text-sm text-gray-500">Sienna</div>
                      <div className="text-sm text-gray-500">Large</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div>$32.00</div>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>Subtotal</div>
                  <div>$64.00</div>
                </div>
                <div className="flex justify-between">
                  <div>Shipping</div>
                  <div>$5.00</div>
                </div>
                <div className="flex justify-between">
                  <div>Taxes</div>
                  <div>$5.52</div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold">
                <div>Total</div>
                <div>$74.52</div>
              </div>
              <Button className="mt-6 w-full">Confirm order</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
