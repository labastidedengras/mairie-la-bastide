import { AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déchets et tri sélectif",
  description:
    "Sacs jaunes, compostage, tri des biodéchets et collecte des encombrants à La Bastide-d'Engras.",
};

const compostBins = [
  { label: "Bac 1", text: "Stockage de la matière sèche (broyat)." },
  {
    label: "Bac 2 — Apports",
    text: "C'est ici que l'on déverse les biodéchets alimentaires.",
  },
  { label: "Bac 3", text: "Phase de maturation du compost." },
  {
    label: "Bacs 4 et 5 — Partage",
    text: "Compost mûr, en libre disposition pour tous les habitants.",
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
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Déchets et tri sélectif
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Sacs jaunes, compostage, tri des biodéchets et collecte des
          encombrants.
        </p>

        {/* Sacs jaunes et composteur : deux informations pratiques, côte à côte */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-12">
          <div>
            <h2 className="font-serif text-xl font-semibold text-stone-900">
              Sacs jaunes d&apos;emballages
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Les sacs de tri se retirent à l&apos;Agence postale communale. La
              dotation annuelle est d&apos;
              <strong className="font-semibold">
                un rouleau de 25 sacs de 50 litres par personne
              </strong>{" "}
              du foyer (un foyer de 4 personnes reçoit 4 rouleaux).
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-stone-900">
              Composteur individuel offert
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Un composteur de 400 litres est offert par le SICTOMU à chaque
              foyer, sous condition de suivre une formation de 45 minutes,
              animée par des maîtres-composteurs.
            </p>
          </div>
        </div>

        {/* Biodéchets */}
        <div className="mt-16 border-t border-stone-200 pt-14">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Le tri des biodéchets
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-700">
            Les biodéchets représentent environ un tiers des ordures ménagères
            non triées en France. Depuis le 1er janvier 2024, leur tri à la
            source est obligatoire pour tous, particuliers comme professionnels.
          </p>

          <p className="mt-6 text-base font-semibold text-stone-900">
            Ce qui en fait partie
          </p>
          <ul className="mt-2 max-w-2xl space-y-1.5 text-base leading-relaxed text-stone-700">
            <li>
              <strong className="font-semibold">Déchets de cuisine :</strong>{" "}
              épluchures, coquilles d&apos;œufs, pain rassis, marc de café…
            </li>
            <li>
              <strong className="font-semibold">Déchets de jardin :</strong>{" "}
              tontes, feuilles mortes, petites branches.
            </li>
          </ul>

          <h3 className="mt-10 font-serif text-xl font-semibold text-stone-900">
            Le site de compostage communal
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-700">
            Le respect de la fonction de chaque bac est essentiel pour obtenir
            un bon compost.
          </p>

          <dl className="mt-4 border-b border-stone-200">
            {compostBins.map((bin) => (
              <div
                key={bin.label}
                className="grid gap-1 border-t border-stone-200 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <dt className="font-serif text-lg font-semibold text-[#5c6b47]">
                  {bin.label}
                </dt>
                <dd className="text-base leading-relaxed text-stone-700">
                  {bin.text}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-600">
            Trier réduit le bilan carbone, permet de produire du compost et du
            biogaz par méthanisation, et améliore durablement la qualité des
            sols locaux.
          </p>
        </div>

        {/* Encombrants */}
        <div className="mt-16 border-t border-stone-200 pt-14">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Collecte des encombrants sur rendez-vous
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-700">
            Un service du SICTOMU, à réserver directement auprès du syndicat.
          </p>

          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold text-stone-900">
                Gros électroménager
              </h3>
              <ul className="mt-2 space-y-1 text-base leading-relaxed text-stone-700">
                {acceptedLarge.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-stone-900">
                Mobilier de grand volume
              </h3>
              <ul className="mt-2 space-y-1 text-base leading-relaxed text-stone-700">
                {acceptedFurniture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 border-l-4 border-amber-600 pl-5">
            <AlertTriangle
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
            />
            <p className="text-base leading-relaxed text-stone-800">
              Tout objet ne figurant pas explicitement dans ces listes sera
              refusé lors de la collecte.
            </p>
          </div>

          <h3 className="mt-10 text-base font-semibold text-stone-900">
            Conditions d&apos;acceptation
          </h3>
          <ol className="mt-3 max-w-xl list-decimal space-y-1.5 pl-5 text-base leading-relaxed text-stone-700">
            {conditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ol>
        </div>

        {/* Contact SICTOMU */}
        <div className="mt-16 border-t border-stone-200 pt-14">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
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
              className={`text-lg font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218] ${focusRing}`}
            >
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

          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone-500">
            Siège du SICTOMU : quartier Bord Nègre, D3 bis, 30210 Argilliers.
            Demande de bac, réclamation ou inscription à une formation de
            compostage : rendez-vous sur leur site.
          </p>
        </div>
      </div>
    </section>
  );
}
