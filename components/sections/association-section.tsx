import Image from "next/image";
import Link from "next/link";

export default function AssociationsSection() {
  const categories = [
    {
      title: "Animations & Loisirs",
      image: "/images/asso/animation.jpg", // Remplacez par vos images
    },
    {
      title: "Sport & Santé",
      image: "/images/asso/sport.jpg",
    },
    {
      title: "Nature & Chasse",
      image: "/images/asso/nature.jpg",
    },
    {
      title: "Arts & Culture",
      image: "/images/asso/culture.jpg",
    },
  ];

  return (
    <section className="bg-stone-100 py-20 text-stone-900">
      <div className="mx-auto max-w-6xl px-8">
        {/* En-tête de section */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b5651d]">
              Lien social & Engagement
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
              Vie associative
            </h2>
          </div>
          <Link
            href="/associations"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#b5651d] transition-colors hover:text-[#8c4c13]"
          >
            <span>Voir toutes les associations</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Grille de 4 grandes cartes (1 col mobile, 2 cols PC) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href="/associations"
              className="group relative flex h-72 sm:h-80 w-full items-end overflow-hidden rounded-2xl bg-stone-900 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image de fond avec effet zoom au survol */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dégradé sombre pour garantir la lisibilité du titre */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent transition-opacity duration-300 group-hover:from-stone-950/95" />

              {/* Titre et flèche superposés en bas de carte */}
              <div className="relative z-10 flex w-full items-center justify-between">
                <h3 className="font-serif text-2xl font-medium text-white transition-colors group-hover:text-[#d98a4e]">
                  {cat.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80 group-hover:text-[#d98a4e]">
                  <span className="hidden sm:inline">Découvrir</span>
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}