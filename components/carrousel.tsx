'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Images } from '@/types/carrousel-images';

interface Props {
  images: Images[];
  loop: boolean;
  delay: number;
}

export const Carrousel = ({ images, delay, loop }: Props) => {
  return (
    <div>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        loop={loop}
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
        }}
        className="max-h-[70dvh]"
      >
        {images.map(({ url, alt, height, width }) => {
          return (
            <SwiperSlide>
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
