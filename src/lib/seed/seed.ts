import bcryptjs from "bcryptjs";
import { SeedCountry, countries } from "./seed-countries";

type ValidColors = "black" | "magenta" | "blue" | "red" | "yellow" | "cyan"; // Colores válidos para los productos
type SeedRole = "user" | "admin";

interface SeedProduct {
  title: string;
  description: string;
  price: number;
  color: ValidColors;
  inStock: number;
  slug: string;
  tags: string[];
  images?: string[];
  brand: string;
}

type SeedUser = {
  name: string;
  email: string;
  password: string;
  role: SeedRole;
};

interface SeedData {
  categories: string[]; // Lista de nombres de categorías
  brand: string[]; // Lista de nombres de categorías
  products: SeedProduct[]; // Lista de productos a sembrar en la base de datos
  users: SeedUser[];
  countries: SeedCountry[];
}

export const initialData: SeedData = {
  categories: ["Cartuchos", "Impresoras", "Accesorios", "Calderas"],
  brand: ["atomlux", "gneiss"],

  products: [
    {
      title: "Cartucho de tinta HP 63",
      description: "Cartucho de tinta original HP 63",
      price: 100,
      color: "black",
      inStock: 100,
      slug: "cartucho-de-tinta-hp-63",
      tags: ["HP", "63", "Tinta"],
      images: ["placeholder.jpg", "starman_750x750.jpg"],
      productImage: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
      brand: "gneiss",
    },
    ...Array.from({ length: 49 }).map((_, i) => {
      const colors: ValidColors[] = ["magenta", "black", "yellow", "cyan"];
      return {
        title: `Cartucho GNEISS ${colors[i % 4].toUpperCase()}`,
        description:
          "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
        price: 75,
        inStock: 7,
        color: colors[i % 4],
        images: ["1473814-00-A_alt.jpg", "1473809-00-A_alt.jpg"],
        productImage: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
        slug: `Cartucho GNEISS ${colors[i % 4].toUpperCase()}`.split("-").join(),
        tags: ["cartucho", "Tinta", "HP", "Epson"],
        brand: "gneiss",
      };
    }),
  ],

  users: [
    {
      email: "user-user@gmail.com",
      password: bcryptjs.hashSync("123456"),
      role: "user",
      name: "User User",
    },
    {
      email: "user-admin@gmail.com",
      password: bcryptjs.hashSync("123456"),
      role: "admin",
      name: "User Admin",
    },
  ],

  countries: countries,
};
