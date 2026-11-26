"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StudioGallery({ images, title }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation={images.length > 1}
      pagination={{ clickable: true }}
      className="hero-swiper overflow-hidden rounded-box bg-base-200"
    >
      {images.map((src, index) => (
        <SwiperSlide key={`${src}-${index}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${title} photo ${index + 1}`}
            className="aspect-[16/10] w-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}