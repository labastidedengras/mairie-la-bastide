import { ImageIcon, Signpost, Trees } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aire de jeux et sentier d'interprétation",
  description:
    "Découvrez l'aire de jeux et le sentier d'interprétation de La Bastide-d'Engras.",
};

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-stone-100 px-6 text-center text-stone-600"
    >
      <ImageIcon aria-hidden="true" className="h-10 w-10 text-stone-400" />
      <span className="text-base font-medium">{label}</span>
    </div>
  );
}

export default function AireDeJeuxPage() {
  return (
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9e5218]">
          Vie locale
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Aire de jeux et sentier d&apos;interprétation
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-700">
          Retrouvez sur cette page l&apos;aire de jeux du village et le sentier
          d&apos;interprétation.
        </p>

        <div className="mt-12 grid gap-10">
          <article className="grid gap-6 border-y border-stone-200 py-8 md:grid-cols-2 md:items-center md:gap-10">
            <PhotoPlaceholder label="Photo de l'aire de jeux à ajouter" />
            <div>
              <h2 className="flex items-center gap-3 font-serif text-2xl font-semibold text-stone-900">
                <Trees
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 text-[#9e5218]"
                />
                Aire de jeux
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700">
                Un espace de jeux pour les enfants du village et leurs familles.
                La photo de l&apos;aire de jeux sera ajoutée ici.
              </p>
            </div>
          </article>

          <article className="grid gap-6 border-b border-stone-200 pb-8 md:grid-cols-2 md:items-center md:gap-10">
            <div className="md:order-2">
              <PhotoPlaceholder label="Photo du panneau de départ à ajouter" />
            </div>
            <div className="md:order-1">
              <h2 className="flex items-center gap-3 font-serif text-2xl font-semibold text-stone-900">
                <Signpost
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 text-[#9e5218]"
                />
                Sentier d&apos;interprétation
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700">
                Le panneau de départ et les informations sur le sentier seront
                présentés ici. La photo du panneau pourra être ajoutée dès
                qu&apos;elle sera disponible.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
