import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Damier : 7/5 puis 5/7. Le ratio de l'image compense la largeur
// pour que les deux images d'une même rangée aient à peu près la même hauteur.
const categories = [
  {
    title: "Animations et loisirs",
    description:
      "Comité des fêtes, animations estivales, clubs de jeux et rencontres conviviales du village.",
    image: "/images/asso/animation.jpg",
    col: "lg:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    title: "Sport et santé",
    description:
      "Activités physiques, clubs sportifs locaux, gym douce et actions de bien-être pour tous.",
    image: "/images/asso/sport.jpg",
    col: "lg:col-span-5",
    aspect: "aspect-[8/7]",
  },
  {
    title: "Nature et chasse",
    description:
      "Préservation de l'environnement, société de chasse, randonnées et valorisation de la garrigue.",
    image: "/images/asso/nature.jpg",
    col: "lg:col-span-5",
    aspect: "aspect-[8/7]",
  },
  {
    title: "Arts et culture",
    description:
      "Ateliers créatifs, sauvegarde du patrimoine historique, musique et événements culturels.",
    image: "/images/asso/culture.jpg",
    col: "lg:col-span-7",
    aspect: "aspect-[16/10]",
  },
];

export default function AssociationsSection() {
  return (
    <section className="border-t border-stone-200/50 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">
              Vie associative
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-600">
              Comités, clubs et ateliers : les associations qui animent le
              village.
            </p>
          </div>

          <Link
            href="/associations"
            className="text-base font-semibold text-stone-800 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218]"
          >
            Toutes les associations
          </Link>
        </div>

        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/associations?categorie=${encodeURIComponent(cat.title)}`}
              className={`group block ${cat.col}`}
            >
              <div
                className={`relative w-full overflow-hidden bg-stone-200 ${cat.aspect}`}
              >
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-stone-900 transition-colors group-hover:text-[#9e5218]">
                    {cat.title}
                  </h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-stone-600">
                    {cat.description}
                  </p>
                </div>
                <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-stone-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9e5218]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
