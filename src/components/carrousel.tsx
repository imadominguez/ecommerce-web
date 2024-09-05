'use client';

import Image from 'next/image';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { Images } from '@/types/carrousel-images';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';

// interface Props {
//   images: Images[];
//   loop: boolean;
//   delay: number;
// }

// export const Carrousel = ({ images, delay, loop }: Props) => {
export const Carrousel = () => {
  return (
    // <div>
    //   <Swiper
    //     pagination={true}
    //     modules={[Pagination]}
    //     loop={loop}
    //     autoplay={{
    //       delay: delay,
    //       disableOnInteraction: false,
    //     }}
    //     className="max-h-[70dvh] rounded-lg"
    //   >
    //     {images.map(({ url, alt, height, width }, index) => {
    //       return (
    //         <SwiperSlide key={index}>
    //           <Image
    //             src={url}
    //             alt={alt}
    //             width={width ?? 1920}
    //             height={height ?? 1080}
    //             className="h-full w-full object-contain"
    //           />
    //         </SwiperSlide>
    //       );
    //     })}
    //   </Swiper>
    // </div>
    <section className="rounded bg-muted px-4 py-8 sm:px-0 sm:py-12">
      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-5 sm:px-16 md:grid-cols-2">
        <div className="mx-auto max-w-md space-y-4">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Descubre nuestra colección seleccionada
          </h2>
          <p className="text-pretty text-muted-foreground">
            Explora nuestra exclusiva colección de cartuchos de tinta de alta
            calidad.
          </p>
          <Link
            href={'/products'}
            className={buttonVariants({
              className: 'w-full',
            })}
          >
            Comprar ahora
          </Link>
        </div>
        <Image
          src={'/products/1473809-00-A_alt.jpg'}
          width={800}
          height={800}
          alt="image"
          className="aspect-auto max-h-96 w-full rounded"
        />
      </div>
    </section>
  );
};
