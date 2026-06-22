"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronDown } from "lucide-react";
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

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight, // Défilement pile de la hauteur de l'écran
      behavior: "smooth",
    });
  };

  return (
    /* Retour au h-screen pur pour un rendu plein écran impeccable */
    <section className="relative h-screen w-full overflow-hidden bg-stone-950">
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

      {/* Overlays (Légèrement accentués en bas pour détacher le bouton de défilement) */}
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

        {/* Sous-titre - Augmentation de la marge inférieure pour aérer */}
        {/* Remplacer le bloc "Sous-titre" par celui-ci */}
        <p className="mt-6 max-w-xl text-base font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide leading-relaxed">
          Actualités, événements, informations municipales et vie du village.
        </p>

        {/* CTA */}
        <button
          onClick={scrollToContent}
          className="mt-8 bg-[#b5651d] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#76693c] shadow-lg rounded-sm"
        >
          Découvrir le village
        </button>

        {/* Indicateur de défilement "anti-illusion de fin de page" :
          On lui met un bg-black/20 et un flou pour qu'il soit ultra-lisible peu importe la photo derrière.
        */}
        {/* Remplacer le bouton "Faire défiler" par celui-ci pour booster sa visibilité */}
        <button
          onClick={scrollToContent}
          aria-label="Défiler vers le bas"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors group"
        >
          <span className="text-[10px] uppercase tracking-widest font-medium opacity-80 group-hover:opacity-100">
            Faire défiler
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
