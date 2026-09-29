"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Association } from "./page";

// L'identifiant (id) est la valeur stockée dans Sanity et utilisée dans l'URL.
// Le label est ce qui s'affiche. Garde ces id synchronisés avec les liens
// "?categorie=…" utilisés ailleurs sur le site (ex. la page d'accueil).
const categories = [
  { id: "sport", label: "Sport & santé" },
  { id: "culture", label: "Arts & culture" },
  { id: "loisirs", label: "Animations & loisirs" },
  { id: "environnement", label: "Nature & chasse" },
];

const categoryLabel = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? id;

export default function AssociationsClientContent({
  initialAssociations,
}: {
  initialAssociations: Association[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // La catégorie vit dans l'URL, pour rester partageable ; la recherche reste locale.
  const activeCategory = searchParams.get("categorie") ?? "toutes";
  const [searchQuery, setSearchQuery] = useState("");

  const setCategory = (id: string) => {
    const params = new URLSearchParams(searchParams);
    if (id === "toutes") params.delete("categorie");
    else params.set("categorie", id);

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filteredAssociations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return initialAssociations.filter((asso) => {
      const matchesSearch =
        !q ||
        asso.nom.toLowerCase().includes(q) ||
        asso.description.toLowerCase().includes(q) ||
        asso.contactNom.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "toutes" || asso.categorie === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, initialAssociations]);

  const resetFilters = () => {
    setSearchQuery("");
    setCategory("toutes");
  };

  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Vie associative
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Les clubs, ateliers et comités qui font vivre La Bastide-d&apos;Engras
          au quotidien.
        </p>

        <div className="mt-12 flex flex-col gap-6 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-sm">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
            />
            <label htmlFor="asso-search" className="sr-only">
              Rechercher une association
            </label>
            <input
              id="asso-search"
              type="text"
              placeholder="Une activité, un nom, un président…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-b border-stone-300 bg-transparent py-2 pl-8 text-base text-stone-900 placeholder:text-stone-400 focus:border-[#9e5218] focus:outline-none"
            />
          </div>

          <div
            role="tablist"
            aria-label="Filtrer par catégorie"
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "toutes"}
              onClick={() => setCategory("toutes")}
              className="text-base font-semibold text-stone-600 underline decoration-2 underline-offset-8 decoration-transparent transition-colors hover:text-stone-900 hover:decoration-stone-300 aria-selected:text-stone-900 aria-selected:decoration-[#9e5218] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e5218]"
            >
              Toutes
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setCategory(cat.id)}
                className="text-base font-semibold text-stone-600 underline decoration-2 underline-offset-8 decoration-transparent transition-colors hover:text-stone-900 hover:decoration-stone-300 aria-selected:text-stone-900 aria-selected:decoration-[#9e5218] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e5218]"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          {filteredAssociations.length} association
          {filteredAssociations.length > 1 ? "s" : ""} affichée
          {filteredAssociations.length > 1 ? "s" : ""}
        </p>

        {filteredAssociations.length > 0 ? (
          <ul className="mt-4 grid border-b border-stone-200 lg:grid-cols-2 lg:gap-x-14">
            {filteredAssociations.map((asso) => (
              <li key={asso.slug} className="border-t border-stone-200 py-8">
                <p className="text-base font-semibold text-[#9e5218]">
                  {categoryLabel(asso.categorie)}
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-900">
                  <Link
                    href={`/associations/${asso.slug}`}
                    className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]"
                  >
                    {asso.nom}
                  </Link>
                </h2>

                <p className="mt-2 max-w-md text-base leading-relaxed text-stone-600 line-clamp-3">
                  {asso.description}
                </p>

                <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-base text-stone-500">
                  <span>{asso.contactNom}</span>
                  {asso.telephone && (
                    <a
                      href={`tel:${asso.telephone.replace(/\s/g, "")}`}
                      className="font-semibold text-stone-700 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218]"
                    >
                      {asso.telephone}
                    </a>
                  )}
                  {asso.telephoneFixe && (
                    <a
                      href={`tel:${asso.telephoneFixe.replace(/\s/g, "")}`}
                      className="font-semibold text-stone-700 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218]"
                    >
                      {asso.telephoneFixe}
                    </a>
                  )}
                  {asso.email && (
                    <a
                      href={`mailto:${asso.email}`}
                      className="break-all font-semibold text-stone-700 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218]"
                    >
                      {asso.email}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-14 border-t border-stone-200 py-16">
            <p className="text-lg text-stone-600">
              Aucune association ne correspond à ces critères.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218]"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        <p className="mt-16 max-w-2xl border-l-4 border-stone-200 pl-5 text-base leading-relaxed text-stone-600">
          Vous faites partie du bureau d&apos;une de ces associations et
          souhaitez modifier une information ou ajouter un événement à
          l&apos;agenda ?{" "}
          <Link
            href="/contact"
            className="font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218]"
          >
            Contactez le secrétariat de la mairie
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
