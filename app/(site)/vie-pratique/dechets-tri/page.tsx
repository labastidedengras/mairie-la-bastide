import {
  AlertTriangle,
  ArrowRight,
  Leaf,
  Package,
  Phone,
  Sofa,
  Trash2,
  WashingMachine,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déchets et tri sélectif",
  description:
    "Sacs jaunes, compostage, tri des biodéchets et collecte des encombrants à La Bastide-d'Engras.",
};

const sommaire = [
  { id: "sacs-jaunes", label: "Sacs jaunes", dot: "bg-yellow-400" },
  { id: "composteur", label: "Composteur", dot: "bg-emerald-500" },
  { id: "biodechets", label: "Biodéchets", dot: "bg-emerald-500" },
  { id: "encombrants", label: "Encombrants", dot: "bg-stone-400" },
  { id: "sictomu", label: "Contact", dot: "bg-[#9e5218]" },
];

const compostBins = [
  {
    step: "1",
    title: "Matière sèche",
    text: "Stockage du broyat.",
  },
  {
    step: "2",
    title: "Apports",
    text: "On y déverse les biodéchets alimentaires.",
  },
  {
    step: "3",
    title: "Maturation",
    text: "Le compost mûrit.",
  },
  {
    step: "4-5",
    title: "Partage",
    text: "Compost mûr, en libre disposition.",
  },
];

const acceptedLarge = [
  "Réfrigérateur et congélateur",
  "Cuisinière et gros four",
  "Lave-linge et sèche-linge",
  "Lave-vaisselle",
  "Barbecue à gaz",
  "Télévision cathodique",
];

const acceptedFurniture = [
  "Tables",
  "Buffets",
  "Canapés",
  "Armoires",
  "Fauteuils",
];

const conditions = [
  "Trois objets maximum par rendez-vous.",
  "Moins de 70 kg par objet.",
  "Objets vidés, propres et salubres.",
  "Ni toxiques, ni dangereux.",
  "Mis en limite de voirie le jour J.",
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

export default function DechetsTriPage() {
  return (
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Déchets et tri sélectif
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Sacs jaunes, compostage, tri des biodéchets et collecte des
          encombrants.
        </p>

        <nav
          aria-label="Sections de la page"
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
        >
          {sommaire.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`inline-flex items-center gap-2 text-base font-semibold text-stone-700 transition-colors hover:text-stone-900 ${focusRing}`}
            >
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 rounded-full ${item.dot}`}
              />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <div
            id="sacs-jaunes"
            className="scroll-mt-28 rounded-sm border border-yellow-300 bg-yellow-50 p-6"
          >
            <Package aria-hidden="true" className="h-8 w-8 text-yellow-700" />
            <h2 className="mt-4 font-serif text-xl font-semibold text-stone-900">
              Sacs jaunes d&apos;emballages
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-800">
              Les sacs se retirent à l&apos;Agence postale communale.
            </p>
            <p className="mt-3 text-base leading-relaxed text-stone-800">
              Dotation annuelle :{" "}
              <strong className="font-semibold">
                1 rouleau de 25 sacs (50 L) par personne du foyer
              </strong>{" "}
              — un foyer de 4 personnes reçoit 4 rouleaux.
            </p>
          </div>

          <div
            id="composteur"
            className="scroll-mt-28 rounded-sm border border-emerald-300 bg-emerald-50 p-6"
          >
            <Leaf aria-hidden="true" className="h-8 w-8 text-emerald-700" />
            <h2 className="mt-4 font-serif text-xl font-semibold text-stone-900">
              Composteur individuel offert
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-800">
              Un composteur de 400 litres est offert par le SICTOMU à chaque
              foyer, sous condition de suivre une formation de 45 minutes avec
              un maître-composteur.
            </p>
          </div>
        </div>

        <div
          id="biodechets"
          className="mt-16 scroll-mt-28 border-t border-stone-200 pt-14"
        >
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Le tri des biodéchets
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-700">
            Les biodéchets représentent environ un tiers des ordures ménagères
            non triées en France. Depuis le 1er janvier 2024, leur tri à la
            source est obligatoire pour tous.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-sm border border-emerald-200 bg-emerald-50/60 p-5">
              <h3 className="font-serif text-lg font-semibold text-stone-900">
                Déchets de cuisine
              </h3>
              <p className="mt-2 text-base leading-relaxed text-stone-700">
                Épluchures, coquilles d&apos;œufs, pain rassis, marc de café…
              </p>
            </div>
            <div className="rounded-sm border border-emerald-200 bg-emerald-50/60 p-5">
              <h3 className="font-serif text-lg font-semibold text-stone-900">
                Déchets de jardin
              </h3>
              <p className="mt-2 text-base leading-relaxed text-stone-700">
                Tontes, feuilles mortes, petites branches.
              </p>
            </div>
          </div>

          <h3 className="mt-12 font-serif text-xl font-semibold text-stone-900">
            Le circuit du compost communal
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-700">
            Le respect de la fonction de chaque bac est essentiel pour obtenir
            un bon compost.
          </p>

          <ol className="mt-6 grid gap-3 sm:grid-cols-4 sm:items-stretch">
            {compostBins.map((bin, index) => (
              <li key={bin.step} className="flex items-stretch gap-3">
                <div className="flex-1 rounded-sm border border-emerald-200 bg-emerald-50/60 p-4 text-center">
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 font-serif text-base font-semibold text-white"
                  >
                    {bin.step}
                  </span>
                  <h4 className="mt-3 font-serif text-base font-semibold text-stone-900">
                    {bin.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-stone-700">
                    {bin.text}
                  </p>
                </div>

                {index < compostBins.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="hidden shrink-0 self-center text-emerald-300 sm:block"
                  />
                )}
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-600">
            Trier réduit le bilan carbone, permet de produire du compost et du
            biogaz par méthanisation, et améliore durablement la qualité des
            sols locaux.
          </p>
        </div>

        <div
          id="encombrants"
          className="mt-16 scroll-mt-28 border-t border-stone-200 pt-14"
        >
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Collecte des encombrants sur rendez-vous
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-700">
            Un service du SICTOMU, à réserver directement auprès du syndicat.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-sm border border-stone-200 bg-stone-50 p-5">
              <WashingMachine
                aria-hidden="true"
                className="h-7 w-7 text-stone-500"
              />
              <h3 className="mt-3 font-serif text-lg font-semibold text-stone-900">
                Gros électroménager
              </h3>
              <ul className="mt-2 space-y-1 text-base leading-relaxed text-stone-700">
                {acceptedLarge.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm border border-stone-200 bg-stone-50 p-5">
              <Sofa aria-hidden="true" className="h-7 w-7 text-stone-500" />
              <h3 className="mt-3 font-serif text-lg font-semibold text-stone-900">
                Mobilier de grand volume
              </h3>
              <ul className="mt-2 space-y-1 text-base leading-relaxed text-stone-700">
                {acceptedFurniture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-sm border border-amber-300 bg-amber-50 p-5">
            <AlertTriangle
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
            />
            <p className="text-base leading-relaxed text-stone-800">
              Tout objet ne figurant pas explicitement dans ces listes sera
              refusé lors de la collecte.
            </p>
          </div>

          <div className="mt-6 rounded-sm bg-stone-900 p-6 text-white">
            <h3 className="font-serif text-lg font-semibold">
              5 conditions d&apos;acceptation
            </h3>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {conditions.map((condition, index) => (
                <li
                  key={condition}
                  className="flex gap-3 text-base leading-relaxed text-stone-200"
                >
                  <span className="font-serif text-stone-500">{index + 1}</span>
                  {condition}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div
          id="sictomu"
          className="mt-16 scroll-mt-28 rounded-sm border border-[#9e5218]/25 bg-[#9e5218]/5 p-8"
        >
          <Trash2 aria-hidden="true" className="h-7 w-7 text-[#9e5218]" />
          <h2 className="mt-4 font-serif text-2xl font-semibold text-stone-900">
            Le SICTOMU
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-700">
            La collecte et le traitement des déchets sont assurés par le
            Syndicat intercommunal de collecte et de traitement des ordures
            ménagères de la région d&apos;Uzès. La mise à jour de la carte
            d&apos;accès en déchèterie est nécessaire pour conserver son accès.
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <a
              href="tel:0466221370"
              className={`inline-flex items-center gap-2 text-lg font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218] ${focusRing}`}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              04 66 22 13 70
            </a>
            <a
              href="mailto:sictomu@sictomu.fr"
              className={`break-all text-base text-stone-700 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218] ${focusRing}`}
            >
              sictomu@sictomu.fr
            </a>
            <a
              href="https://www.sictomu.fr"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-base text-stone-700 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218] ${focusRing}`}
            >
              www.sictomu.fr
            </a>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-600">
            Siège du SICTOMU : quartier Bord Nègre, D3 bis, 30210 Argilliers.
          </p>
        </div>
      </div>
    </section>
  );
}
