'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Brand, Category } from '@prisma/client';
import { useState } from 'react';

const PRODUCT_IMAGE_PLACEHOLDER = '/imgs/placeholder.jpg';

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  inStock: z.string(),
  categoryId: z.string(),
  isFeatured: z.string(),
  brandId: z.string(),
  file: z
    .custom<FileList>()
    .refine((files) => files.length > 0, 'Debe seleccionar un archivo'),
  isActive: z.string(),
  price: z.string(),
  tags: z.string(),
});

interface Props {
  categories: Category[];
  brands: Brand[];
}

export const FormProduct = ({ categories, brands }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      inStock: '0',
      categoryId: '',
      isFeatured: 'false',
      isActive: 'false',
      brandId: '',
      price: '0',
      tags: '',
    },
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
      form.setValue('file', files);
    }
  };

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
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa el nombre..."
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ingresa la descripción..."
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 place-content-center gap-3">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ingresa el precio..."
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="inStock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>En stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ingresa la cantidad en stock..."
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 place-content-center gap-3">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {categories.map(({ id, name }) => (
                                  <SelectItem key={id} value={id}>
                                    {name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marca</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una marca" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {brands.map(({ id, name }) => (
                                  <SelectItem key={id} value={id}>
                                    {name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 place-content-center gap-3">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Activo</SelectItem>
                              <SelectItem value="false">Inactivo</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destacado</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Si</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-3 grid gap-2">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresa los tags..." {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <small className="opacity-80">
                  Separar cada palabra con comas y sin espacio. Ejemplo:
                  tag1,tag2,tag3
                </small>
              </div>
              <div className="mt-3 space-y-3">
                <Button
                  type="button"
                  variant={'secondary'}
                  className="w-full uppercase"
                >
                  Limpiar formulario
                </Button>
                <Button type="submit" className="w-full uppercase">
                  Crear producto
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
                  {imagePreviews.length === 0 ? (
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
                  ) : (
                    imagePreviews.map((src, index) => (
                      <div key={index} className="col-span-3">
                        <Dialog>
                          <DialogTrigger>
                            <Image
                              alt={`Product Image ${index + 1}`}
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={src}
                              width={300}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <Image
                              alt={`Product Image ${index + 1}`}
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={src}
                              width={300}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))
                  )}

                  <FormField
                    control={form.control}
                    name="file"
                    render={({}) => (
                      <FormItem className="col-span-3">
                        <FormLabel>Subir archivo</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileChange(e.target.files)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-3">
                  <Button
                    type="button"
                    variant={'secondary'}
                    onClick={() => {
                      form.unregister('file');
                      setImagePreviews([]);
                    }}
                    className="w-full"
                  >
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
