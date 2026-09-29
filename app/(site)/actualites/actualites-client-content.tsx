"use client";

import ActualiteCard from "@/components/features/actualites/actualite-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CATEGORIES_LABELS: Record<string, string> = {
  "vie-municipale": "Vie municipale",
  evenement: "Événements",
  travaux: "Travaux",
  alerte: "Alertes",
};

interface Actualite {
  titre: string;
  slug: string;
  date: string;
  categorie: string;
  imageUrl: string | null;
  contenu: string | null;
}

export default function ActualitesClientContent({
  initialActualites,
}: {
  initialActualites: Actualite[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // La catégorie vit dans l'URL : un lien vers "actualités > travaux" reste partageable.
  const selectedCategory = searchParams.get("categorie") ?? "toutes";

  const filteredActualites =
    selectedCategory === "toutes"
      ? initialActualites
      : initialActualites.filter((act) => act.categorie === selectedCategory);

  const setCategory = (key: string) => {
    const params = new URLSearchParams(searchParams);
    if (key === "toutes") params.delete("categorie");
    else params.set("categorie", key);

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Actualités
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          La vie du village, les décisions de la mairie, les chantiers en cours
          et les événements à venir.
        </p>

        {/* Filtres : des liens, pas des boutons pilule colorés */}
        <div
          role="tablist"
          aria-label="Filtrer les actualités par catégorie"
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-stone-200 pb-8"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === "toutes"}
            onClick={() => setCategory("toutes")}
            className="text-base font-semibold text-stone-900 underline decoration-2 underline-offset-8 decoration-transparent transition-colors hover:decoration-stone-300 aria-selected:decoration-[#9e5218] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e5218]"
          >
            Tout afficher
          </button>

          {Object.entries(CATEGORIES_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selectedCategory === key}
              onClick={() => setCategory(key)}
              className="text-base font-semibold text-stone-600 underline decoration-2 underline-offset-8 decoration-transparent transition-colors hover:text-stone-900 hover:decoration-stone-300 aria-selected:text-stone-900 aria-selected:decoration-[#9e5218] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e5218]"
            >
              {label}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="sr-only">
          {filteredActualites.length} actualité
          {filteredActualites.length > 1 ? "s" : ""} affichée
          {filteredActualites.length > 1 ? "s" : ""}
        </p>

        {filteredActualites.length > 0 ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredActualites.map((act) => (
              <ActualiteCard
                key={act.slug}
                titre={act.titre}
                slug={act.slug}
                date={act.date}
                categorie={act.categorie}
                imageUrl={act.imageUrl}
                contenu={act.contenu}
              />
            ))}
          </div>
        ) : (
          <div className="mt-14 border-t border-stone-200 py-16">
            <p className="text-lg text-stone-600">
              Aucune actualité publiée pour le moment dans cette catégorie.
            </p>
            <button
              type="button"
              onClick={() => setCategory("toutes")}
              className="mt-4 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218]"
            >
              Voir toutes les actualités
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
