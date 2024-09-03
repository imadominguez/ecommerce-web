'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Switch } from '@/components/ui/switch';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Brand, Category, Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import { DollarSign, LoaderCircleIcon, Package, Percent } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { createProduct } from '@/actions/products/create-product';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const PRODUCT_IMAGE_PLACEHOLDER = '/imgs/placeholder.jpg';

const COLORS = ['blue', 'black', 'magenta', 'yellow'];

const formSchema = z.object({
  title: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .refine((value) => value.trim() !== '', 'El nombre no puede estar vacío'),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.string().refine((value) => parseFloat(value) > 0, {
    message: 'El precio debe ser mayor a 0',
  }),
  color: z.string().or(z.null()),
  inStock: z.string().refine((value) => parseInt(value) >= 0, {
    message: 'El stock debe ser mayor o igual a 0',
  }),
  categoryId: z.string().refine((value) => value !== '', {
    message: 'Debes seleccionar una categoría',
  }),
  brandId: z.string().refine((value) => value !== '', {
    message: 'Debes seleccionar una marca',
  }),
  isActive: z.string(),
  isFeatured: z.string(),
  tags: z.string().refine((value) => value.trim() !== '', {
    message: 'Debes ingresar al menos un tag',
  }),
  file: z.any(),
  inDiscount: z.boolean(),
  discountPercentage: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === '') return true;
        if (typeof val === 'undefined') return false;
        const num = parseFloat(val);
        return !isNaN(num) && num > 0 && num <= 100;
      },
      {
        message: 'El porcentaje de descuento debe ser un número entre 0 y 100',
      }
    ),
});

interface Props {
  product: Product;
  categories: Category[];
  brands: Brand[];
}

export const FormProduct = ({ product, categories, brands }: Props) => {
  const {
    title,
    description,
    inStock,
    categoryId,
    isFeatured,
    color,
    isActive,
    brandId,
    price,
    tags,
    inDiscount,
    discount: discountPercentage,
  } = product;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      inStock: inStock.toString(),
      categoryId: categoryId!,
      isFeatured: isFeatured.toString(),
      color: color,
      isActive: isActive.toString(),
      brandId: brandId!,
      price: price.toString(),
      tags: tags.toString(),
      inDiscount: inDiscount,
      discountPercentage: discountPercentage?.toString() ?? '',
    },
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isColor, setIsColor] = useState(color !== null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (fileList: FileList | null) => {
    if (fileList) {
      const fileArray = Array.from(fileList);
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
      setFiles(fileList);
    }
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values, files });

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('inStock', values.inStock);
    formData.append('categoryId', values.categoryId);
    formData.append('brandId', values.brandId);
    formData.append('isActive', values.isActive);
    formData.append('isFeatured', values.isFeatured);
    formData.append('tags', values.tags);
    formData.append('color', values.color ?? '');
    formData.append('slug', values.title.toLowerCase().replace(/ /g, '-'));
    formData.append('inDiscount', values.inDiscount.toString());
    formData.append('discount', values.discountPercentage?.toString() ?? '');
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
    }

    setIsLoading(true);
    const { ok, message } = await createProduct(formData);

    if (ok) {
      form.reset();
      setImagePreviews([]);
      setIsLoading(false);
      setIsColor(false);
      toast.success('Producto creado con éxito');
      router.push('/dashboard/products');
    } else {
      console.error({ message });
      setIsLoading(false);
      toast.error('Ocurrió un error al crear el producto');
    }
  }

  // Previsualización de la imagen del producto
  // Si no hay imagenes, se muestra un placeholder
  useEffect(() => {
    if (product.images) {
      setImagePreviews(product.images);
    }
  }, [product.images]);

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
              <div className="mt-3 grid w-full gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              className="pl-9 pr-12"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                              ARS
                            </span>
                          </div>
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
                          <div className="relative">
                            <Package className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              className="pl-9"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                            defaultValue={field.value ?? ''}
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
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                            defaultValue={field.value ?? undefined}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="true">Activo</SelectItem>
                                <SelectItem value="false">Inactivo</SelectItem>
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
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destacado</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value ?? undefined}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="true">Destacado</SelectItem>
                                <SelectItem value="false">
                                  No destacado
                                </SelectItem>
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
              <div className="mt-3">
                <FormDescription>
                  ¿Deseas agregar un color al producto?
                </FormDescription>
                <Switch
                  defaultChecked={isColor}
                  onCheckedChange={() => setIsColor(!isColor)}
                />

                {isColor && (
                  <div>
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value ?? undefined}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un color" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {COLORS.map((color) => (
                                    <SelectItem
                                      key={color}
                                      value={color}
                                      className="capitalize"
                                    >
                                      {color}
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
                )}
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="inDiscount"
                    render={({ field }) => (
                      <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <Label
                          htmlFor="inDiscount"
                          className="flex flex-col space-y-1"
                        >
                          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            En descuento
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Activar descuento para este producto
                          </span>
                        </Label>
                        <Switch
                          id="inDiscount"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porcentaje de descuento</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              className="pl-9 pr-12"
                              disabled={!form.watch('inDiscount')}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                              %
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-3 space-y-3">
                <Button
                  type="button"
                  variant={'secondary'}
                  className="w-full uppercase"
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Resetear formulario
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Imagenes */}
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
                  ) : imagePreviews.length === 1 ? (
                    <>
                      <div className="col-span-3">
                        <Dialog>
                          <DialogTrigger>
                            <Image
                              alt="Product Image 1"
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={imagePreviews[0]}
                              width={300}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <Image
                              alt="Product Image 1"
                              className="aspect-square w-full rounded-md object-cover"
                              height={300}
                              src={imagePreviews[0]}
                              width={300}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="">
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
                      <div className="">
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
                    </>
                  ) : (
                    imagePreviews.map((src, index) => (
                      <div key={index} className="">
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
                            id="file"
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
                <div className="mt-3 space-y-3">
                  <Button
                    type="button"
                    variant={'secondary'}
                    onClick={() => {
                      form.unregister('file');
                      setImagePreviews([]);
                    }}
                    className="w-full uppercase"
                  >
                    Limpiar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant={'outline'}
                    className="w-full uppercase"
                  >
                    {isLoading ? (
                      <LoaderCircleIcon className="h-5 w-5 animate-spin" />
                    ) : (
                      'Editar producto'
                    )}
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
