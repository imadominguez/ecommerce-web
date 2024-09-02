'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectCategory } from './select-category';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

const PRODUCT_IMAGE_PLACEHOLDER = '/imgs/placeholder.jpg';

const formSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  inStock: z.number().int().positive(),
  category: z.string().nonempty(),
  isFeatured: z.boolean(),
  status: z.boolean(),
  price: z.number().int().positive(),
  tags: z.array(z.string()).nonempty(),
});

export const FormProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      inStock: 0,
      category: '',
      isFeatured: false,
      status: false,
      price: 0,
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  const images: any = [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
      >
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Detalle del producto</CardTitle>
              <CardDescription>
                Ingresa los detalles del producto, como su nombre y descripción.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="title"
                    type="text"
                    className="w-full"
                    placeholder="Ingresa el nombre..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Ingrese la descripción del producto..."
                    className="min-h-32"
                  />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 place-content-center gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input id="price" name="price" type="number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="inStock">Stock</Label>
                  <Input id="inStock" name="inStock" type="number" />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 place-content-center gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  {/* <SelectCategory
              value={category}
              onChange={(value) => setCategory(value)}
            /> */}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="isFeatured">Destacado</Label>
                  <Select>
                    <SelectTrigger
                      id="isFeatured"
                      aria-label="Select isFeatured"
                      defaultValue={'false'}
                    >
                      <SelectValue placeholder="Selecciona si es destacado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Si</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 place-content-center gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger id="status" aria-label="Select status">
                      <SelectValue placeholder="Selecciona el status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Activo</SelectItem>
                      <SelectItem value="false">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-3 grid gap-2">
                <Label htmlFor="status">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  type="text"
                  className="w-full"
                  placeholder="Ingresa los tags..."
                />
                <small className="opacity-80">
                  Separar cada palabra con comas y sin espacio. Ejemplo:
                  tag1,tag2,tag3
                </small>
              </div>
              <div className="mt-3">
                <Button type="submit" className="w-full uppercase">
                  Limpiar formulario
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
            <CardHeader>
              <CardTitle>Imagenes del producto</CardTitle>
              <CardDescription>
                Añade imágenes de tu producto para que los clientes puedan verlo
                desde diferentes ángulos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Nota:</span>{' '}
                  <small>Solo formato .png</small>
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {images.length === 0 ? (
                    <>
                      <div className="col-span-3">
                        <Dialog>
                          <DialogTrigger>
                            <Image
                              alt="Placeholder"
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={PRODUCT_IMAGE_PLACEHOLDER}
                              width={300}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <Image
                              alt="Placeholder"
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={PRODUCT_IMAGE_PLACEHOLDER}
                              width={300}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                      <Image
                        alt="Placeholder"
                        className="aspect-square w-full rounded-md object-cover"
                        height={300}
                        src={PRODUCT_IMAGE_PLACEHOLDER}
                        width={300}
                      />
                      <Image
                        alt="Placeholder"
                        className="aspect-square w-full rounded-md object-cover"
                        height={300}
                        src={PRODUCT_IMAGE_PLACEHOLDER}
                        width={300}
                      />
                    </>
                  ) : images.length === 1 ? (
                    <>
                      <div className="col-span-3">
                        <Dialog>
                          <DialogTrigger>
                            <Image
                              alt="Product Image"
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={URL.createObjectURL(images[0])}
                              width={300}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <Image
                              alt="Product Image"
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={URL.createObjectURL(images[0])}
                              width={300}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                      <Image
                        alt="Placeholder"
                        className="aspect-square w-full rounded-md object-cover"
                        height={300}
                        src={PRODUCT_IMAGE_PLACEHOLDER}
                        width={300}
                      />
                      <Image
                        alt="Placeholder"
                        className="aspect-square w-full rounded-md object-cover"
                        height={300}
                        src={PRODUCT_IMAGE_PLACEHOLDER}
                        width={300}
                      />
                    </>
                  ) : (
                    <>
                      <div className="col-span-3">
                        <Dialog>
                          <DialogTrigger>
                            <Image
                              alt="Product Image"
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={URL.createObjectURL(images[0])}
                              width={300}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <Image
                              alt="Product Image"
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={URL.createObjectURL(images[0])}
                              width={300}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                      {/* {images.slice(1).map((image, index) => (
                        <Dialog key={index}>
                          <DialogTrigger key={index}>
                            <Image
                              alt="Product Image"
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={URL.createObjectURL(image)}
                              width={300}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <Image
                              alt="Product Image"
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={URL.createObjectURL(image)}
                              width={300}
                            />
                          </DialogContent>
                        </Dialog>
                      ))} */}
                    </>
                  )}

                  <Label
                    className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-dashed"
                    htmlFor="image-upload"
                  >
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Upload</span>
                    <Input
                      id="image-upload"
                      accept="image/png"
                      className="hidden"
                      multiple
                      type="file"
                    />
                  </Label>
                </div>
                <div className="mt-3">
                  <Button variant={'secondary'} className="w-full">
                    Limpiar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};
