'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UserAddress } from '@/types/address';
import { setUserAddress } from '@/actions/address/set-user-address';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteUserAddress } from '@/actions/address/delete-user-address';
import { Session } from 'next-auth';
import { useAddressStore } from '@/store/address/address-store';

const formSchema = z
  .object({
    firstName: z.string().min(4, {
      message: 'El nombre debe contener como minimo 4  caracteres',
    }),
    lastName: z.string().min(3, { message: 'El apellido es requerido' }),
    country: z.string().min(3, { message: 'El país es requerido' }),
    city: z.string().min(3, { message: 'La ciudad es requerida' }),
    postalCode: z.string().min(4, { message: 'El código postal es requerido' }),
    phone: z.string().min(8, { message: 'El teléfono es requerido' }),
    street: z.string().min(4, { message: 'La calle es requerida' }), // Calle
    streetNumber: z
      .string()
      .min(2, { message: 'El numero de calle es requerido' }), // Número de la calle
    address2: z.string().optional(), // Cambié "streetNumber" por "address2"
    isApartment: z.boolean(),
    floor: z.string().optional(), // Opcional
    apartment: z.string().optional(), // Opcional
    taxType: z.enum(['consumidor_final', 'responsable_inscripto']), // Cambié "billingType" por "taxType"
    cuitCuil: z.string().optional(), // Cambié "cuit" por "cuitCuil"
    businessName: z.string().optional(),
    vatCondition: z
      .enum(['responsable_inscripto', 'monotributista', 'exento'])
      .optional(),
  })
  .refine(
    (data) => {
      if (data.taxType === 'responsable_inscripto') {
        return data.cuitCuil && data.businessName && data.vatCondition;
      }
      return true;
    },
    {
      message:
        'CUIT/CUIL, Razón Social y Condición frente al IVA son requeridos para Responsable Inscripto',
      path: ['cuitCuil', 'businessName', 'vatCondition'], // Puedes especificar el campo que causa el error
    }
  )
  .refine(
    (data) => {
      if (data.taxType === 'responsable_inscripto' && !data.cuitCuil) {
        return false;
      }
      return true;
    },
    {
      message: 'CUIT/CUIL es requerido para Responsable Inscripto',
      path: ['cuitCuil'],
    }
  )
  .refine(
    (data) => {
      if (data.taxType === 'responsable_inscripto' && !data.businessName) {
        return false;
      }
      return true;
    },
    {
      message: 'Razón Social es requerido para Responsable Inscripto',
      path: ['businessName'],
    }
  )
  .refine(
    (data) => {
      if (data.taxType === 'responsable_inscripto' && !data.vatCondition) {
        return false;
      }
      return true;
    },
    {
      message:
        'Condición frente al IVA es requerido para Responsable Inscripto',
      path: ['vatCondition'],
    }
  );

interface Props {
  userStoredAddress: Partial<UserAddress>;
  session: Session;
}

export function AddressForm({ userStoredAddress, session }: Props) {
  const router = useRouter();

  const userAdderss = useAddressStore((state) => state.address);
  const setAddress = useAddressStore((state) => state.setAddress);

  const [billingType, setBillingType] = useState<string | undefined>(undefined);
  const [isApartment, setIsApartment] = useState(false);
  const [saveData, setSaveData] = useState(
    userStoredAddress.firstName ? true : false
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...userStoredAddress,
      ...(!userStoredAddress.firstName && userAdderss),
      taxType: (userStoredAddress.taxType || userAdderss.taxType) as
        | 'consumidor_final'
        | 'responsable_inscripto'
        | undefined,
      vatCondition: (userStoredAddress.vatCondition ||
        userAdderss.vatCondition) as
        | 'responsable_inscripto'
        | 'monotributista'
        | 'exento'
        | undefined,
    },
  });

  useEffect(() => {
    if (!isApartment) {
      form.unregister('floor');
      form.unregister('apartment');
    }
  }, [isApartment, form]);

  useEffect(() => {
    if (billingType !== 'responsable_inscripto') {
      form.unregister('cuitCuil');
      form.unregister('businessName');
      form.unregister('vatCondition');
    }
  }, [billingType, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const rememberAddress = saveData;
    setAddress(values);
    if (rememberAddress) {
      //   // Guardar datos en la base de datos
      const { ok, message } = await setUserAddress(
        session?.user.id as string,
        values
      );
      if (ok) {
        toast.success(message);
      }
    } else {
      // Eliminar datos de la base de datos
      await deleteUserAddress(session?.user.id as string);
    }
    router.push('/checkout');
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Formulario de Pedido</CardTitle>
        <CardDescription>
          Completa los datos para realizar tu pedido
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          placeholder="Ingresa tu nombre"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          placeholder="Ingresa tu apellido"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              // defaultValue="argentina"
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un país" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="argentina">
                                  Argentina
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          placeholder="Ingresa tu ciudad"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código Postal</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          type="number"
                          placeholder="Ingresa tu código postal"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          type="tel"
                          placeholder="Ingresa tu número de teléfono"
                        />
                      </FormControl>
                      {/* formato del numero a ingresar */}
                      <span className="text-sm text-gray-500">
                        Ej: 2284-123456
                      </span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calle</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          placeholder="Ingresa tu calle"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="streetNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          type="number"
                          placeholder="Ingresa el número de tu casa"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is-apartment"
                  checked={isApartment}
                  onCheckedChange={() => setIsApartment(!isApartment)}
                />
                <Label htmlFor="is-apartment">Es departamento</Label>
              </div>
              {isApartment && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Piso</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Número de piso" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departamento</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Número o letra de departamento"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Datos de Facturación</h3>
              <FormField
                control={form.control}
                name="taxType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Factura</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          form.setValue(
                            'taxType',
                            value as
                              | 'consumidor_final'
                              | 'responsable_inscripto'
                          );
                          setBillingType(value);
                        }}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consumidor_final">
                            Consumidor Final
                          </SelectItem>
                          <SelectItem value="responsable_inscripto">
                            Responsable Inscripto
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {billingType === 'responsable_inscripto' && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cuitCuil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CUIT/CUIL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ingresa tu CUIT/CUIL"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razón Social</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ingresa la razón social"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vatCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condición frente al IVA</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu condición" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="responsable_inscripto">
                                Responsable Inscripto
                              </SelectItem>
                              <SelectItem value="monotributista">
                                Monotributista
                              </SelectItem>
                              <SelectItem value="exento">Exento</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="save-data"
                checked={saveData}
                onCheckedChange={() => setSaveData(!saveData)}
              />
              <Label htmlFor="save-data">
                Guardar mis datos para futuras compras
              </Label>
            </div>

            <Button variant={'standard'} type="submit" className="w-full">
              Enviar Pedido
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
