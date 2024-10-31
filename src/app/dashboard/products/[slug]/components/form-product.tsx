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
import { useState } from 'react';
import {
  CheckCircle2,
  DollarSign,
  LoaderCircleIcon,
  Package,
  Percent,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { updateProduct } from '@/actions/products/update-product';
import { CloudinaryResource } from '@/types/cloudinary';
import { CldImage } from 'next-cloudinary';
import { useToast } from '@/hooks/use-toast';

const COLORS = ['cyan', 'black', 'magenta', 'yellow'];

const formSchema = z.object({
  title: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .refine((value) => value.trim() !== '', 'El nombre no puede estar vacío'),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  fullDescription: z.string(),
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
  isAvailableOnline: z.string(),
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
  images: Array<CloudinaryResource>;
}

export const FormProduct = ({ product, categories, brands, images }: Props) => {
  const { toast } = useToast();
  const {
    title,
    description,
    fullDescription,
    inStock,
    categoryId,
    isFeatured,
    color,
    isActive,
    brandId,
    isAvailableOnline,
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
      fullDescription: fullDescription,
      inStock: inStock.toString(),
      categoryId: categoryId!,
      isFeatured: isFeatured.toString(),
      color: color,
      isActive: isActive.toString(),
      isAvailableOnline: isAvailableOnline ? 'true' : 'false',
      brandId: brandId!,
      price: price.toString(),
      tags: tags.toString(),
      inDiscount: inDiscount,
      discountPercentage: discountPercentage?.toString() ?? '',
    },
  });

  const [isColor, setIsColor] = useState(color !== null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesProduct, setImagesProduct] = useState<string[]>(product.images);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (imagesProduct.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Debes asignar imagenes al producto',
      });
      return;
    }
    if (imagesProduct.length === 1) {
      toast({
        variant: 'destructive',
        title: 'Debes asignar mas de una imagen al producto',
      });
      return;
    }

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('fullDescription', values.fullDescription);
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
    formData.append('isAvailableOnline', values.isAvailableOnline.toString());
    formData.append('images', JSON.stringify(imagesProduct));

    setIsLoading(true);
    const { ok, message } = await updateProduct(formData);

    if (ok) {
      form.reset();
      setIsLoading(false);
      setIsColor(false);
      toast({
        variant: 'success',
        title: 'Producto editado con éxito',
      });
      router.push('/dashboard/products');
    } else {
      console.error({ message });
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: message,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 lg:gap-8"
      >
        <div className="grid auto-rows-max items-start gap-4 lg:grid-cols-2 lg:gap-8">
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
                <FormField
                  control={form.control}
                  name="isAvailableOnline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venta online</FormLabel>
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
                              <SelectItem value="true">Venta online</SelectItem>
                              <SelectItem value="false">No se vende</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
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
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Imagenes del producto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid min-h-60 grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2">
                {imagesProduct.map((img, i) => {
                  return (
                    <div
                      key={i}
                      className="group relative hover:cursor-pointer"
                    >
                      <Image
                        src={img}
                        alt={''}
                        width={500}
                        height={500}
                        className="h-60 w-full rounded-md object-cover"
                        sizes="(min-width: 768px) 35vw, (min-width: 1024px) 25vw, (min-width: 1280px) 20vw, 50vw"
                      />
                      <div
                        onClick={() => {
                          setImagesProduct(
                            imagesProduct.filter(
                              (img) => img !== imagesProduct[i]
                            )
                          );
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-100 transition-opacity"
                      >
                        <span className="shadow-red absolute bottom-2 right-2 grid h-10 w-10 place-content-center rounded-full bg-primary shadow-2xl">
                          <CheckCircle2 className="h-6 w-6" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Imagenes */}
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
            <CardHeader>
              <CardTitle>Imagenes</CardTitle>
              <CardDescription>
                Añade imágenes de tu producto para que los clientes puedan
                verlo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {images.map((image, i) => {
                  return (
                    <div
                      key={i}
                      className="group relative hover:cursor-pointer"
                    >
                      <CldImage
                        src={image.public_id}
                        alt={''}
                        width={image.width}
                        height={image.height}
                        onClick={() => {
                          setImagesProduct([
                            ...imagesProduct,
                            image.secure_url,
                          ]);
                        }}
                        className="h-60 w-full rounded-md object-cover"
                        sizes="(min-width: 768px) 35vw, (min-width: 1024px) 25vw, (min-width: 1280px) 20vw, 50vw"
                      />
                      {imagesProduct.includes(image.secure_url) && (
                        <div
                          onClick={() => {
                            setImagesProduct(
                              imagesProduct.filter(
                                (img) => img !== image.secure_url
                              )
                            );
                          }}
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-100 transition-opacity"
                        >
                          <span className="shadow-red absolute bottom-2 right-2 grid h-10 w-10 place-content-center rounded-full bg-primary shadow-2xl">
                            <CheckCircle2 className="h-6 w-6" />
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};
