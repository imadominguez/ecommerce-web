import { CartProduct } from '@/types/product';
import { StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  // Metodos para obtener informacion del carrito
  getTotalItemsById: (id: string) => number; // Obtiene la cantidad de un producto en el carrito
  getTotalItems: () => number; // Obtiene la cantidad total de productos en el carrito
  getSummaryInformation: () => {
    subTotal: number;
    total: number;
    itemsInCart: number;
    // ?? Agregar mas informacion que se necesite, por ejemplo
    // ?? costo de envio, impuestos, etc.
  }; // Obtiene informacion resumida del carrito

  // Metodos para modificar el carrito de compras
  addProductToCart: (product: CartProduct, stock: number) => void; // Agrega un producto al carrito
  updateProductQuantiity: (product: CartProduct, quantity: number) => void; // Actualiza la cantidad de un producto en el carrito
  removeProductFromCart: (product: CartProduct) => void; // Elimina un producto del carrito
  clearCart: () => void; // Elimina todos los productos del carrito
}

const storeApiCart: StateCreator<State> = (set, get) => ({
  cart: [],
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
    const { cart } = get();
    const subTotal = cart.reduce((subTotal, product) => {
      return product.quantity * product.price + subTotal;
    }, 0);
    const itemsInCart = get().getTotalItems(); // Obtener el total de items en el carrito con un método personalizado
    return {
      subTotal,
      total: subTotal,
      itemsInCart: itemsInCart,
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
      alert('No hay suficiente stock para agregar este producto');
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
  removeProductFromCart: (product: CartProduct) => {
    const { cart } = get();
    const newCart = cart.filter((item) => item.id !== product.id);
    set({ cart: newCart });
  },
  clearCart: () => {
    set({ cart: [] });
  },
});

export const useCartStore = create<State>()(
  persist(storeApiCart, {
    name: 'shopping-cart',
  })
);
