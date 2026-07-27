import { Compass, Landmark, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function DiscoverVillageSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#5c4f3a] to-[#4a3f2e] py-24 text-white">
      {/* Grain subtil pour casser la platitude du fond uni */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-stretch lg:gap-16">
        {/* Colonne Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30 lg:aspect-auto lg:min-h-full">
          <Image
            src="/images/village-discover.jpg"
            alt="Vue du clocher et du village de La Bastide-d'Engras"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
          {/* Dégradé bas, uniquement pour garantir la lisibilité du badge */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Badge Localisation — pill compact, contraste renforcé */}
          <div className="absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-full bg-black/50 py-2 pl-2 pr-4 backdrop-blur-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b5651d] text-white">
              <Compass className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="text-xs font-medium tracking-wide text-white">
              Gard <span className="text-white/50">·</span> Pays d&apos;Uzès{" "}
              <span className="text-white/50">·</span> Occitanie
            </p>
          </div>
        </div>

        {/* Colonne Contenu */}
        <div className="flex flex-col justify-center py-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#d98c4a]/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d98c4a]">
                Histoire &amp; Patrimoine
              </span>
            </div>

            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Une bastide de caractère{" "}
              <span className="block italic sm:inline">
                au cœur du Gard
              </span>
            </h2>

            <p className="mt-6 text-base font-light leading-relaxed text-white/90 md:text-lg">
              Niché entre nature sauvage et pierres chargées d&apos;histoire, La
              Bastide d&apos;Engras est l&apos;une des plus anciennes bastides
              de France. Son authenticité préservée en fait un havre de paix
              chaleureux, témoin vivant du temps qui passe.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
              Entre ruelles pittoresques, patrimoine architectural remarquable
              et paysages vallonnés, découvrez un village à taille humaine où
              l&apos;art de vivre occitan se transmet avec convivialité au
              quotidien.
            </p>
          </div>

          {/* Grille de Highlights */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:bg-white/10">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition duration-300 group-hover:bg-[#b5651d]">
                <Landmark className="h-4 w-4" aria-hidden="true" />
              </div>
              <p className="text-base font-semibold">Authenticité médiévale</p>
              <p className="mt-1 text-xs leading-relaxed text-white/70">
                Un village fortifié historique ayant conservé son âme et ses
                vestiges architecturaux.
              </p>
            </div>

            <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:bg-white/10">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition duration-300 group-hover:bg-[#5c6b47]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </div>
              <p className="text-base font-semibold">Cadre de vie préservé</p>
              <p className="mt-1 text-xs leading-relaxed text-white/70">
                Une nature environnante intacte, entourée de vignobles, de
                garrigue et de calme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}