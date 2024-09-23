import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Separator } from './ui/separator';

export default function Footer() {
  return (
    <>
      <Separator className="mb-8" />
      <footer className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo and description */}
            <div className="flex flex-col items-start">
              <Image
                src="/imgs/logo-si.png"
                alt="S1 Logo"
                width={150}
                height={150}
                className="mb-4"
              />
              <p className="mt-2 text-xs opacity-95">
                Servicios Integrados es el destino para soluciones integrales:
                tecnología, seguridad y calefacción. Descubre el confort que
                necesitas para un hogar inteligente y protegido.
              </p>
            </div>

            {/* Ayuda column */}
            <div className="text-sm">
              <h2 className="mb-4 font-semibold">Ayuda</h2>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="#" className="transition-colors hover:opacity-80">
                    Preguntas frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:opacity-80">
                    ¿Cómo comprar?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:opacity-80">
                    Arrepentimiento de compra
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:opacity-80">
                    Términos y condiciones
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nosotros column */}
            <div className="text-sm">
              <h2 className="mb-4 font-semibold">Nosotros</h2>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="#" className="transition-colors hover:opacity-80">
                    Nuestra empresa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="transition-colors hover:opacity-80"
                  >
                    Nuestros servicios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:opacity-80">
                    Atención al cliente
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contactanos column */}
            <div>
              <h2 className="mb-4 text-sm font-semibold">Contáctanos</h2>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="text-blue-600 transition-colors hover:text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 36 36"
                    fill="url(#a)"
                    height="24"
                    width="24"
                  >
                    <defs>
                      <linearGradient
                        x1="50%"
                        x2="50%"
                        y1="97.078%"
                        y2="0%"
                        id="a"
                      >
                        <stop offset="0%" stopColor="#0062E0" />
                        <stop offset="100%" stopColor="#19AFFF" />
                      </linearGradient>
                    </defs>
                    <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" />
                    <path
                      fill="#FFF"
                      d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="text-black transition-colors hover:opacity-80 dark:text-white dark:hover:opacity-80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"
                    />
                  </svg>
                </Link>
                <Link
                  href="tel:+1234567890"
                  aria-label="Teléfono"
                  className="text-green-600 transition-colors hover:text-green-800"
                >
                  <Phone />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
