"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useMemo } from "react";

const slides = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
];

export default function Hero() {
  const autoplay = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false }),
    [],
  );

  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay]);

  return (
    <section className="relative h-screen overflow-hidden bg-stone-950">
      {/* Carousel */}
      <div className="absolute inset-0 h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((image, index) => (
            <div key={index} className="relative min-w-0 flex-[0_0_100%]">
              <Image
                src={image}
                alt=""
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      {/* Contenu centré verticalement et horizontalement */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-white/50" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/80">
            Village de La Bastide d&apos;Engras
          </span>
          <span className="h-px w-8 bg-white/50" />
        </div>

        {/* Titre sur deux lignes */}
        <h1 className="flex flex-col gap-1">
          <span className="text-[clamp(1.6rem,4vw,3rem)] font-light tracking-wide text-white/90">
            Bienvenue à
          </span>
          <span className="text-[clamp(2.8rem,7vw,6rem)] font-bold leading-none tracking-tight text-white drop-shadow-lg">
            La Bastide d&apos;Engras
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="mt-6 max-w-lg text-sm text-white/70 tracking-wide">
          Actualités, événements, informations municipales et vie du village.
        </p>

        {/* CTA */}
        <button className="mt-10 bg-[#8a7a5a] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#76693c]">
          Découvrir le village
        </button>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50">
          <div className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  );
}
