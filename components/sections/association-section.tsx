"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AssociationsSection() {
  const categories = [
    {
      title: "Animations & Loisirs",
      description:
        "Comité des fêtes, animations estivales, clubs de jeux et rencontres conviviales du village.",
      image: "/images/asso/animation.jpg",
    },
    {
      title: "Sport & Santé",
      description:
        "Activités physiques, clubs sportifs locaux, gym douce et actions de bien-être pour tous.",
      image: "/images/asso/sport.jpg",
    },
    {
      title: "Nature & Chasse",
      description:
        "Préservation de l'environnement, société de chasse, randonnées et valorisation de la garrigue.",
      image: "/images/asso/nature.jpg",
    },
    {
      title: "Arts & Culture",
      description:
        "Ateliers créatifs, sauvegarde du patrimoine historique, musique et événements culturels.",
      image: "/images/asso/culture.jpg",
    },
  ];

  return (
    <section className="bg-stone-50 py-24 text-stone-900 border-t border-stone-200/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#9e5218]/40" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9e5218]">
                Lien social &amp; Engagement
              </span>
            </div>
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">
              Vie associative &amp; Collective
            </h2>
            <p className="mt-2 max-w-xl text-sm text-stone-500">
              Découvrez le tissu associatif dynamique qui fait vivre La Bastide
              d&apos;Engras au quotidien.
            </p>
          </div>

          <Link
            href="/associations"
            className="inline-flex items-center gap-2 rounded-sm border border-stone-300 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-widest text-stone-700 shadow-sm transition-all duration-200 hover:bg-stone-50 hover:text-stone-900 active:scale-[0.98]"
          >
            Voir toutes les associations
            <ArrowRight className="h-3.5 w-3.5 text-[#9e5218]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={`/associations?categorie=${encodeURIComponent(cat.title)}`}
              className="group flex flex-col overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-104"
                />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#9e5218] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 transition-colors group-hover:text-[#9e5218]">
                    {cat.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-stone-500">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9e5218]">
                  <span>Découvrir</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
