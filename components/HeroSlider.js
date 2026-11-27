"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    image: "/hero/hero-1.svg",
    eyebrow: "Photo & Film Studios",
    title: "Book the perfect room for your next shoot",
    text: "Cyc walls, natural light studios and full sound stages, all bookable by the hour with prices you can see up front.",
  },
  {
    image: "/hero/hero-2.svg",
    eyebrow: "Podcast Lounges",
    title: "Record your show in a space that sounds great",
    text: "Treated rooms, pro microphones and comfortable seating. Walk in, plug in and press record.",
  },
  {
    image: "/hero/hero-3.svg",
    eyebrow: "Music Suites",
    title: "Turn your empty hours into creative income",
    text: "Own a studio or workshop? List it on StudioSpace and let creators in your city book it when you are not using it.",
  },
];

export default function HeroSlider() {
  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div
              className="flex min-h-[70vh] items-center bg-neutral bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.78), rgba(0,0,0,0.35)), url(${slide.image})`,
              }}
            >
              <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12">
                <div className="max-w-2xl space-y-5 text-white">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {slide.eyebrow}
                  </p>
                  <h1 className="text-4xl font-bold leading-tight md:text-5xl">{slide.title}</h1>
                  <p className="text-base text-white/85 md:text-lg">{slide.text}</p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/studios" className="btn btn-primary btn-lg">
                      Explore Studios
                    </Link>
                    <Link
                      href="/add-studio"
                      className="btn btn-lg border-white/70 bg-white/10 text-white hover:bg-white hover:text-black"
                    >
                      Host Your Space
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}