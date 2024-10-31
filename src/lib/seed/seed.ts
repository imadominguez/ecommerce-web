import bcryptjs from 'bcryptjs';
import { SeedCountry, countries } from './seed-countries';

export type ValidColors = 'black' | 'magenta' | 'yellow' | 'cyan'; // Colores válidos para los productos
type SeedRole = 'user' | 'admin';

interface SeedProduct {
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  color: ValidColors;
  inStock: number;
  slug: string;
  tags: string[];
  images: string[];
  brand: string;
}

type SeedUser = {
  name: string;
  email: string;
  password: string;
  role: SeedRole;
};

interface SalesHistory {
  productId: string; // Referencia al ID del producto
  quantity: number; // Cantidad vendida
  date: Date; // Fecha de la venta
}

interface SeedData {
  categories: string[]; // Lista de nombres de categorías
  brand: string[]; // Lista de marcas
  products: SeedProduct[]; // Lista de productos a sembrar en la base de datos
  users: SeedUser[];
  countries: SeedCountry[];
  salesHistory: SalesHistory[]; // Ventas
}

export const initialData: SeedData = {
  categories: ['Cartuchos', 'Impresoras', 'Accesorios', 'Calderas'],
  brand: ['atomlux', 'gneiss'],

  products: [
    ...Array.from({ length: 100 }).map((_, i) => {
      const colors: ValidColors[] = ['magenta', 'black', 'yellow', 'cyan'];
      return {
        title: `Cartucho GNEISS ${colors[i % 4].toUpperCase()}`,
        description:
          'Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season.',
        price: 75,
        inStock: Math.floor(Math.random() * 50), // Inventar stock
        color: colors[i % 4],
        fullDescription:
          'Cartucho de tinta original HP 63. Imprima documentos de texto nítidos y gráficos en color que resisten el agua y se mantienen durante décadas.',
        images: ['1473814-00-A_alt.jpg', '1473809-00-A_alt.jpg'],
        slug: `Cartucho-GNEISS-${colors[i % 4].toUpperCase()}`
          .split('-')
          .join('-'),
        tags: ['cartucho', 'Tinta', 'HP', 'Epson'],
        brand: 'gneiss',
      };
    }),
  ],

  users: [
    {
      email: 'user-user@gmail.com',
      password: bcryptjs.hashSync('12345678'),
      role: 'user',
      name: 'User User',
    },
    {
      email: 'user-admin@gmail.com',
      password: bcryptjs.hashSync('12345678'),
      role: 'admin',
      name: 'User Admin',
    },
  ],

  countries: countries,

  salesHistory: [
    {
      productId: 'cartucho-de-tinta-hp-63',
      quantity: 5,
      date: new Date('2024-01-15'),
    },
    {
      productId: 'Cartucho GNEISS MAGENTA',
      quantity: 3,
      date: new Date('2024-02-20'),
    },
    {
      productId: 'Cartucho GNEISS BLACK',
      quantity: 7,
      date: new Date('2024-03-10'),
    },
    // Agrega más datos de ventas según sea necesario
  ],
};
