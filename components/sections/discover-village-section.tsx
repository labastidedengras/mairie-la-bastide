import { Landmark, Compass, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function DiscoverVillageSection() {
  return (
    <section className="bg-[#5c4f3a] py-24 text-white overflow-hidden">
      {/* Passage en 2 colonnes égales (50/50) avec alignement étiré (items-stretch) */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-stretch">
        {/* 🖼️ Colonne Image - Parfaitement alignée sur la hauteur du texte */}
        <div className="relative min-h-[450px] lg:min-h-full">
          {/* Cadre décoratif arrière */}
          <div className="absolute -inset-3 rounded-2xl border border-white/10 bg-white/5 transform -rotate-1 lg:block hidden" />

          <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl border border-white/10">
            <Image
              src="/images/village-discover.jpg"
              alt="La Bastide-d'Engras"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            {/* Dégradé sur le bas */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Badge Localisation */}
            <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/10 border border-white/20 p-4 backdrop-blur-md flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#b5651d] text-white">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                  Localisation
                </p>
                <p className="text-sm font-medium text-white">
                  Gard • Pays d&apos;Uzès • Occitanie
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✍️ Colonne Contenu - Ajustée pour étirer l'ensemble */}
        <div className="flex flex-col justify-center py-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#d98c4a]/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d98c4a]">
                Histoire & Patrimoine
              </span>
            </div>

            {/* Titre large sur une seule ligne sur grand écran */}
            <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl leading-tight">
              Une bastide de caractère{" "}
              <span className="text-white/80 italic block sm:inline">
                au cœur du Gard
              </span>
            </h2>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-white/90 font-light">
              Niché entre nature sauvage et pierres chargées d&apos;histoire, La
              Bastide d&apos;Engras est l&apos;une des plus anciennes bastides
              de France. Son authenticité préservée en fait un havre de paix
              chaleureux, témoin vivant du temps qui passe.
            </p>

            <p className="mt-4 text-sm md:text-base leading-relaxed text-white/70">
              Entre ruelles pittoresques, patrimoine architectural remarquable
              et paysages vallonnés, découvrez un village à taille humaine où
              l&apos;art de vivre occitan se transmet avec convivialité au
              quotidien.
            </p>
          </div>

          {/* 🌟 Grille de Highlights */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:bg-white/10">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white group-hover:bg-[#b5651d] transition duration-300">
                <Landmark className="h-4 w-4" />
              </div>
              <p className="font-semibold text-base">Authenticité médiévale</p>
              <p className="mt-1 text-xs text-white/70 leading-relaxed">
                Un village fortifié historique ayant conservé son âme et ses
                vestiges architecturaux.
              </p>
            </div>

            <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:bg-white/10">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white group-hover:bg-[#5c6b47] transition duration-300">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="font-semibold text-base">Cadre de vie préservé</p>
              <p className="mt-1 text-xs text-white/70 leading-relaxed">
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
