"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Pause, Play } from "lucide-react";
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

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

export default function Hero() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 6000,
        stopOnInteraction: false,
        // Pas de défilement automatique si l'utilisateur a demandé moins d'animations
        playOnInit: !(
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ),
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onPlayState = () => setPlaying(autoplay.isPlaying());

    emblaApi.on("select", onSelect);
    emblaApi.on("autoplay:play", onPlayState);
    emblaApi.on("autoplay:stop", onPlayState);
    onSelect();
    onPlayState();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("autoplay:play", onPlayState);
      emblaApi.off("autoplay:stop", onPlayState);
    };
  }, [emblaApi, autoplay]);

  const togglePlay = () => {
    if (autoplay.isPlaying()) autoplay.stop();
    else autoplay.play();
  };

  return (
    <section className="relative bg-white">
      {/* La photo, sans voile : les pierres dorées font le travail */}
      <div className="relative h-[55svh] min-h-[340px] overflow-hidden bg-stone-900 lg:h-[82svh] lg:min-h-[560px]">
        <div className="absolute inset-0 h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={slide.src} className="relative min-w-0 flex-[0_0_100%]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Léger dégradé en haut uniquement, pour garder le menu lisible */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

        {/* Contrôles du diaporama : pause + pastilles */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-3 bg-white px-3 py-1.5 lg:bottom-6 lg:right-6">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={
              playing ? "Mettre le diaporama en pause" : "Relancer le diaporama"
            }
            className={`flex h-8 w-8 items-center justify-center text-stone-800 transition-colors hover:text-[#9e5218] ${focusRing}`}
          >
            {playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>

          <div className="flex items-center">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Aller à la photo ${index + 1}`}
                aria-current={selectedIndex === index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`flex h-8 items-center px-1 ${focusRing}`}
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? "w-7 bg-[#9e5218]"
                      : "w-2.5 bg-stone-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Le panneau : posé en bas à gauche, il se prolonge dans la section blanche suivante */}
      <div className="lg:absolute lg:inset-x-0 lg:bottom-0">
        <div className="mx-auto max-w-7xl lg:px-6">
          <div className="bg-white px-6 py-10 lg:max-w-xl lg:p-12 lg:pb-14">
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-stone-900 lg:text-6xl">
              La Bastide d&apos;Engras
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-stone-700">
              Secrétariat ouvert le lundi de 14h à 16h, le mercredi et le
              vendredi de 9h à 11h.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#demarches"
                className={`rounded-sm bg-[#9e5218] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#854311] ${focusRing}`}
              >
                Vos démarches
              </a>

              <Link
                href="/contact"
                className={`text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] ${focusRing}`}
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
