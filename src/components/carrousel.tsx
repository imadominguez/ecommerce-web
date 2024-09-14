'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Images } from '@/types/carrousel-images';
import { buttonVariants } from './ui/button';
import Link from 'next/link';

interface Props {
  images: Images[];
  loop: boolean;
  delay: number;
}

export const Carrousel = ({ images, delay, loop }: Props) => {
  // export const Carrousel = () => {
  return (
    <div>
      <Swiper
        pagination={true}
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="max-h-[50dvh] rounded-md"
      >
        {images.map(({ url, alt, height, width }, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                src={url}
                alt={alt}
                width={width ?? 1920}
                height={height ?? 1080}
                className="h-full w-full object-contain"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
