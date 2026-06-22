"use client";

import ActualiteCard from "@/components/ui/actualite-card";
import { FileText } from "lucide-react";
import { useState } from "react";

const CATEGORIES_LABELS = {
  "vie-municipale": "Vie Municipale",
  evenement: "Événement & Festivités",
  travaux: "Travaux & Routes",
  alerte: "Alerte Info",
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
  const [selectedCategory, setSelectedCategory] = useState<string>("toutes");

  const filteredActualites =
    selectedCategory === "toutes"
      ? initialActualites
      : initialActualites.filter((act) => act.categorie === selectedCategory);

  return (
    <>
      <section
        className="relative min-h-[450px] flex items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url(/images/hero-1.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center pt-16">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
              Actualités de la commune
            </span>
            <span className="h-px w-8 bg-white/40" />
          </div>
          <h1 className="font-serif text-5xl font-medium tracking-tight text-white md:text-6xl">
            Le Mag&apos; Info
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90 font-light">
            Suivez au quotidien la vie du village, les décisions de la mairie,
            les chantiers en cours et les prochains événements.
          </p>
        </div>
      </section>

      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <button
              onClick={() => setSelectedCategory("toutes")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition ${
                selectedCategory === "toutes"
                  ? "bg-[#b5651d] text-white shadow-md"
                  : "bg-white text-stone-800 border border-stone-300 hover:bg-stone-100"
              }`}
            >
              Tout afficher
            </button>
            {Object.entries(CATEGORIES_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition ${
                  selectedCategory === key
                    ? "bg-[#b5651d] text-white shadow-md"
                    : "bg-white text-stone-800 border border-stone-300 hover:bg-stone-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {filteredActualites.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="py-24 text-center text-stone-400 border border-dashed border-stone-200 bg-white rounded-2xl">
              <FileText className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-sm font-light">
                Aucune actualité publiée pour le moment dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
