"use client";

import { Calendar, Landmark } from "lucide-react";
import Image from "next/image";

export default function DiscoverVillageSection() {
  return (
    <section className="relative overflow-hidden bg-[#f3ede4] py-24 text-stone-900">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-stone-200 shadow-xl lg:aspect-square">
          <Image
            src="/images/village-discover.jpg"
            alt="La Tour de l'Horloge de La Bastide-d'Engras"
            fill
            className="object-cover transition-transform duration-700 hover:scale-102"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
            <p className="text-xs italic text-stone-200">
              La Tour de l&apos;Horloge (1893), s&apos;élevant à vingt mètres
              devant la mairie.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#9e5218]/40" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9e5218]">
                Histoire &amp; Patrimoine
              </span>
            </div>

            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
              Des origines médiévales{" "}
              <span className="block italic text-[#9e5218] font-normal sm:inline">
                au charme d&apos;aujourd&apos;hui
              </span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-stone-700 md:text-lg font-normal">
              L&apos;histoire de La Bastide-d&apos;Engras commence entre le XIe
              et le XIIe siècle, à l&apos;époque où les comtes de Toulouse
              régnaient sur la Provence gardoise. Initialement établi autour du
              hameau historique d&apos;Orgerolles, le village actuel s&apos;est
              progressivement structuré au pied de sa barre rocheuse fortifiée.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-stone-600 md:text-base">
              Ancienne place forte autrefois ceinte de hauts remparts, la
              commune abrite un imposant château féodal bâti vers l&apos;an 1300
              ayant appartenu à l&apos;évêque d&apos;Uzès, reconstruit au XVIe
              siècle par la famille de la Fare, ainsi que sa remarquable église
              romane.
            </p>
          </div>

          <div className="mt-8 border-t border-stone-200 pt-8 grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#9e5218]/10 text-[#9e5218]">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  XIe - XIIe Siècle
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  Premières fondations du terroir et construction de la chapelle
                  Saint-Jean d&apos;Orgerolles.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#9e5218]/10 text-[#9e5218]">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Année 1300
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  Érection du château fort protecteur, témoin majeur de
                  l&apos;architecture défensive locale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
