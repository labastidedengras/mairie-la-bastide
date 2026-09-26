"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const slides = [
  {
    src: "/images/hero-1.jpg",
    alt: "Vue panoramique des toits en tuiles et du paysage de La Bastide d'Engras",
  },
  {
    src: "/images/hero-2.jpg",
    alt: "La Tour de l'Horloge et les ruelles en pierre du village sous le soleil",
  },
  {
    src: "/images/hero-3.jpg",
    alt: "Façade en pierres dorées et patrimoine préservé de la commune",
  },
];

export default function Hero() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplay = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);

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
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-stone-950">
      <div className="absolute inset-0 h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative min-w-0 flex-[0_0_100%]">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-[#1c0f08]/40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0704]/90 via-[#0d0704]/40 to-[#0d0704]/40" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-white/50" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/80">
            Village de La Bastide d&apos;Engras
          </span>
          <span className="h-px w-8 bg-white/50" />
        </div>

        <h1 className="flex flex-col gap-1">
          <span className="text-[clamp(1.6rem,4vw,3rem)] font-light tracking-wide text-white/90">
            Bienvenue à
          </span>
          <span className="text-[clamp(2.8rem,7vw,6rem)] font-serif font-semibold leading-none tracking-tight text-white drop-shadow-lg">
            La Bastide d&apos;Engras
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] tracking-wide leading-relaxed">
          Actualités, événements, informations municipales et vie du village.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none">
          <button
            onClick={scrollToContent}
            className="w-full sm:w-auto rounded-sm bg-[#9e5218] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition-all duration-200 hover:bg-[#854311] active:scale-[0.98]"
          >
            Vos Démarches
          </button>

          <Link
            href="/contact"
            className="w-full sm:w-auto rounded-sm border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm shadow-lg transition-all duration-200 hover:bg-white/20 hover:border-white/60 active:scale-[0.98]"
          >
            Nous contacter
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
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
