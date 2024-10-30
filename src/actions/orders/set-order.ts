'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import type { UserAddress } from '@/types/address';
import type { Product } from '@/types/product';
import { Prisma } from '@prisma/client';

interface ProductToOrder {
  productId: string;
  quantity: number;
}

export const placeOrder = async (
  products: ProductToOrder[],
  address: UserAddress,
  envio: number
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'No hay session de usuario',
    };
  }

  const productsDB = await db.product.findMany({
    where: {
      id: {
        in: products.map((product) => product.productId),
      },
    },
  });

  const itemsInOrder = products.reduce(
    (count, prod) => count + prod.quantity,
    0
  );

  // Los totales de tax, subtotal, y total
  try {
    const { subTotal } = products.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = productsDB.find(
          (prod: Product) => prod.id === item.productId
        );
        if (!product) {
          throw new Error(
            `No se pudo encontrar el producto con id ${item.productId}, por favor contacta a soporte`
          );
        }

        // Calcula el subtotal de este producto
        const productSubTotal = product.price * productQuantity;

        // Suma el subtotal del producto actual al total acumulado
        totals.subTotal += productSubTotal;

        return totals;
      },
      { subTotal: 0 }
    );

    const prismaTx = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        //  1. Actualizar el stock de los productos en la base de datos
        const updatedProductsPromises = productsDB.map(
          async (product: Product) => {
            //  Acumular los valores
            const productQuantity = products
              .filter((p) => p.productId === product.id)
              .reduce((count, prod) => count + prod.quantity, 0);

            if (productQuantity === 0) {
              throw new Error('No se puede ordenar un producto con cantidad 0');
            }

            return tx.product.update({
              where: {
                id: product.id,
              },
              data: {
                inStock: {
                  decrement: productQuantity,
                },
              },
            });
          }
        );

        const updatedProducts = await Promise.all(updatedProductsPromises);

        updatedProducts.forEach((product) => {
          if (product.inStock < 0) {
            throw new Error(
              'No hay suficiente stock para el producto ' + product.title
            );
          }
        });

        //  2. Crear la orden en la base de datos
        const order = await tx.order.create({
          data: {
            userId,
            subTotal,
            envio,
            total: subTotal + envio,
            itemsInOrder: itemsInOrder,
            isPaid: false,
            OrderItem: {
              createMany: {
                data: products.map((product) => {
                  return {
                    quantity: product.quantity,
                    price:
                      productsDB.find(
                        (prod: Product) => prod.id === product.productId
                      )?.price ?? 0,
                    productId: product.productId,
                  };
                }),
              },
            },
          },
        });

        // 3. Crear la dirección de entrega
        const {
          country,
          taxType,
          vatCondition,
          businessName,
          cuitCuil,
          ...restAddres
        } = address;

        const orderAddress = await tx.orderAddress.create({
          data: {
            ...restAddres,
            countryId: 'AR',
            orderId: order.id,
          },
        });

        return { order, orderAddress, updatedProducts };
      }
    );

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
      message: 'Orden creada correctamente',
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: 'Ocurrió un error al crear la orden',
    };
  }
};
