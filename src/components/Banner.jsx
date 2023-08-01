"use client";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const imageData = [
  {
    src: "/assets/atheletics.jpg",
    alt: "Atheletics Image",
    category: "atheletics",
  },
  {
    src: "/assets/basketball.jpg",
    alt: "basketball Image",
    category: "basketball",
  },
  {
    src: "/assets/cricket.jpg",
    alt: "cricket Image",
    category: "cricket",
  },
  {
    src: "/assets/football.jpg",
    alt: "football Image",
    category: "football",
  },
  {
    src: "/assets/tennis.jpg",
    alt: "tennis Image",
    category: "tennis",
  },
];

export function Banner() {
  const [current, setCurrent] = useState(0);
  const length = imageData.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [current]);
  return (
    <div className="flex justify-center items-center overflow-hidden relative">
      {/* Image Container */}
      <div className="w-screen h-80 md:h-[500px]">
        {/* images  */}
        {imageData.map((image, index) => {
          if (current === index) {
            return (
              <Link href={`/${image.category}`} key={image.category}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={500}
                  priority
                  className="w-full h-[500px] object-top object-fill"
                />
              </Link>
            );
          }
        })}
      </div>
      {/* Buttons Next and Prev */}
      <button
        onClick={prevSlide}
        className="absolute left-0 h-full bg-black/[0.7]"
      >
        <ChevronLeft size={40} color="#f6f2f2" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 h-full bg-black/[0.7]"
      >
        <ChevronRight size={40} color="#f6f2f2" />
      </button>
    </div>
  );
}
