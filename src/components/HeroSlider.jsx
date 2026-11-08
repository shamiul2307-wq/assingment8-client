"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Every Book Opens a New World",
    description:
      "Explore a collection of wonderful books and find your next favorite story.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  },
  {
    title: "Discover Stories Worth Sharing",
    description:
      "From timeless classics to modern discoveries, your next adventure awaits.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
  },
  {
    title: "Borrow. Read. Return. Repeat.",
    description:
      "Make reading affordable and accessible by sharing books with everyone.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <section
            className="min-h-[550px] md:min-h-[620px] flex items-center bg-cover bg-center relative"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(14,35,25,.92), rgba(14,35,25,.35)), url(${slide.image})`,
            }}
          >
            <div className="max-w-7xl mx-auto px-8 py-20 w-full text-white">
              <div className="max-w-2xl">
                <span className="uppercase tracking-[5px] text-[#d6bc83] text-sm font-bold">
                  Welcome to BookNook
                </span>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
                  {slide.title}
                </h1>

                <p className="text-lg text-gray-200 mt-6 leading-8">
                  {slide.description}
                </p>

                <Link
                  href="/books"
                  className="inline-block mt-9 bg-[#d4b77b] text-[#193729] px-8 py-4 rounded-lg font-bold hover:bg-white transition"
                >
                  Browse Books
                </Link>
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}