import { CartProduct } from '@/types/product';
import { StateCreator, create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { toast } from 'sonner';
interface State {
  cart: CartProduct[];
  envio: number;
  // Metodos para obtener informacion del carrito
  getTotalItemsById: (id: string) => number; // Obtiene la cantidad de un producto en el carrito
  getTotalItems: () => number; // Obtiene la cantidad total de productos en el carrito
  getSummaryInformation: () => {
    subTotal: number;
    total: number;
    itemsInCart: number;
    envio: number;
    // ?? Agregar mas informacion que se necesite, por ejemplo
    // ?? costo de envio, impuestos, etc.
  }; // Obtiene informacion resumida del carrito

  // Metodos para modificar el carrito de compras
  addProductToCart: (product: CartProduct, stock: number) => void; // Agrega un producto al carrito
  updateProductQuantiity: (product: CartProduct, quantity: number) => void; // Actualiza la cantidad de un producto en el carrito
  removeProductFromCart: (id: string) => void; // Elimina un producto del carrito
  clearCart: () => void; // Elimina todos los productos del carrito
}

const storeApiCart: StateCreator<State> = (set, get) => ({
  cart: [],
  envio: 0,
  // ------------------- Metodos para obtener informacion del carrito -------------------
  getTotalItemsById: (id: string) => {
    const { cart } = get();
    // Obtener la cantidad total del producto en el carrito
    return cart.reduce((sum, item) => {
      if (item.id === id) {
        return sum + item.quantity;
      }
      return sum;
    }, 0);
  },
  getTotalItems: () => {
    const { cart } = get();
    // Obtener la cantidad total de productos en el carrito
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },
  getSummaryInformation: () => {
    const { cart, envio } = get();
    const subTotal = cart.reduce((subTotal, product) => {
      return subTotal + product.quantity * product.price;
    }, 0);
    const itemsInCart = get().getTotalItems(); // Obtener el total de items en el carrito con un método personalizado
    return {
      subTotal,
      total: subTotal,
      itemsInCart: itemsInCart,
      envio,
    };
  },
  // ------------------- Metodos para modificar el carrito de compras -------------------
  addProductToCart: (product, stock) => {
    const { cart } = get();

    // Calculamos la cantidad total del producto en el carrito
    const totalItemsInCart = get().getTotalItemsById(product.id);
    // Verificamos si el producto ya esta en el carrito
    const productIndex = cart.findIndex((item) => item.id === product.id);

    // Calculamos la cantidad total del producto en el carrito si lo agregamos al carrito
    const totalNewQuantity = totalItemsInCart + product.quantity;

    // Verificamos si la cantidad total excede al stock
    if (totalNewQuantity > stock) {
      toast.error('No hay suficiente stock para agregar este producto', {
        duration: 1300,
      });
      return;
    }

    // Si el producto ya esta en el carrito, actualizamos la cantidad
    if (productIndex !== -1) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + product.quantity,
          };
        }
        return item;
      });
      toast.success('Producto agregado al carrito', { duration: 1300 });
      set({ cart: newCart });
    } else {
      set({ cart: [...cart, product] });
    }
  },

  updateProductQuantiity: (product: CartProduct, quantity: number) => {
    const { cart } = get();
    const updatedCartProducts = cart.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: quantity,
        };
      }
      return item;
    });
    set({ cart: updatedCartProducts });
  },
  removeProductFromCart: (id) => {
    const { cart } = get();
    const newCart = cart.filter((item) => item.id !== id);
    set({ cart: newCart });
  },
  clearCart: () => {
    set({ cart: [] });
  },
});

export const useCartStore = create<State>()(
  devtools(
    persist(storeApiCart, {
      name: 'shopping-cart',
      storage: createJSONStorage(() => localStorage),
    })
  )
);
