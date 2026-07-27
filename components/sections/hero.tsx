"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const slides = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
];

export default function Hero() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplay = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);

  // Suivi de la slide active pour les indicateurs
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-stone-950">
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
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

      {/* Contenu */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-white/50" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/80">
            Village de La Bastide d&apos;Engras
          </span>
          <span className="h-px w-8 bg-white/50" />
        </div>

        {/* Titre */}
        <h1 className="flex flex-col gap-1">
          <span className="text-[clamp(1.6rem,4vw,3rem)] font-light tracking-wide text-white/90">
            Bienvenue à
          </span>
          <span className="text-[clamp(2.8rem,7vw,6rem)] font-serif font-semibold leading-none tracking-tight text-white drop-shadow-lg">
            La Bastide d&apos;Engras
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="mt-6 max-w-xl text-base font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide leading-relaxed">
          Actualités, événements, informations municipales et vie du village.
        </p>

        {/* CTA — couleur de hover corrigée pour rester dans la charte orange */}
        <button
  onClick={scrollToContent}
  className="mt-8 rounded-sm bg-[#9e5218] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition-all duration-200 hover:bg-[#854311] active:scale-[0.98]"
>
  Découvrir le village
</button>

        {/* Indicateurs de slide */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((image, index) => (
            <button
              key={image}
              aria-label={`Aller à la photo ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "w-6 bg-[#d98a4e]"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}