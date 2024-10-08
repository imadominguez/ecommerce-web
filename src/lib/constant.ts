import { Images } from '@/types/carrousel-images';

export const CARROUSEL_IMAGES_HOME: Images[] = [
  {
    url: '/imgs/fondo.jpeg',
    alt: '',
    width: 1920,
    height: 900,
  },
  {
    url: '/imgs/fondo.jpeg',
    alt: '',
    width: 1920,
    height: 900,
  },
  {
    url: '/imgs/fondo.jpeg',
    alt: '',
    width: 1920,
    height: 900,
  },
] as const;

export const LINKS_NAVBAR = [
  {
    name: 'Nuestra empresa',
    href: '/',
    isDisable: false,
  },
  {
    name: 'Tienda online',
    href: '/products',
    isDisable: false,
  },
];
