import { ArrowUpRight, Hammer, Store, Trees, Wrench } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commerces du village",
  description:
    "Retrouvez les commerces, artisans et services de La Bastide-d'Engras.",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e5218]";

const commerces = [
  {
    categorie: "Bistrot",
    nom: "Bistrot",
    Icon: Store,
  },
  {
    categorie: "Boulangerie",
    nom: "Le Fournil d'Andréa",
    telephone: "06 16 66 80 04",
    telephoneHref: "tel:0616668004",
    url: "https://www.uzes-pontdugard.com/commerce-service/le-fournil-dandrea/",
    lienLabel: "Découvrir Le Fournil d'Andréa",
    Icon: Store,
  },
  {
    categorie: "Vente de vêtements de créateurs",
    nom: "Ateliers des Ours",
    telephone: "06 80 13 47 43",
    telephoneHref: "tel:0680134743",
    url: "https://www.atelierdesours.fr/",
    lienLabel: "Visiter le site des Ateliers des Ours",
    Icon: Store,
  },
  {
    categorie: "Électricien · Plombier",
    nom: "Sébastien Saorin",
    telephone: "04 66 72 87 93",
    telephoneHref: "tel:0466728793",
    Icon: Wrench,
  },
  {
    categorie: "Tous travaux",
    nom: "Franck Multiservices 30",
    telephone: "06 10 07 10 91",
    telephoneHref: "tel:0610071091",
    Icon: Hammer,
  },
  {
    categorie: "Bois de chauffage",
    nom: "Propriétaire exploitant",
    telephone: "06 14 35 56 93",
    telephoneHref: "tel:0614355693",
    Icon: Trees,
  },
  {
    categorie: "Monastère",
    nom: "Monastère de Solan",
    telephone: "04 66 82 94 25",
    telephoneHref: "tel:0466829425",
    url: "https://monastere-de-solan.com/",
    lienLabel: "Visiter le site du Monastère de Solan",
    Icon: Store,
  },
];

export default function CommercesDuVillagePage() {
  return (
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9e5218]">
          Vie locale
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Commerces du village
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-700">
          Retrouvez les commerçants, artisans et services de La
          Bastide-d&apos;Engras. Appuyez sur un numéro pour appeler ou sur un
          lien pour en savoir plus.
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {commerces.map(
            ({
              categorie,
              nom,
              telephone,
              telephoneHref,
              url,
              lienLabel,
              Icon,
            }) => (
              <li
                key={nom}
                className="flex flex-col border border-stone-200 bg-stone-50 p-6 sm:p-8"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#9e5218]">
                  {categorie}
                </p>
                <h2 className="mt-2 flex items-center gap-3 font-serif text-xl font-semibold text-stone-900">
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-stone-500"
                  />
                  {nom}
                </h2>
                {telephone && telephoneHref && (
                  <a
                    href={telephoneHref}
                    className={`mt-4 self-start text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-[#9e5218] hover:decoration-[#9e5218] ${focusRing}`}
                  >
                    {telephone}
                  </a>
                )}
                {url && lienLabel && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 inline-flex items-center gap-2 self-start text-base font-semibold text-stone-700 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-[#9e5218] hover:decoration-[#9e5218] ${focusRing}`}
                  >
                    {lienLabel}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0"
                    />
                    <span className="sr-only"> (nouvelle fenêtre)</span>
                  </a>
                )}
              </li>
            ),
          )}
        </ul>

        <section aria-labelledby="carte-heading" className="mt-14">
          <h2
            id="carte-heading"
            className="font-serif text-2xl font-semibold text-stone-900 sm:text-3xl"
          >
            Localiser le village
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-700">
            Retrouvez La Bastide-d&apos;Engras sur la carte.
          </p>
          <iframe
            title="Carte Google Maps de La Bastide-d'Engras"
            src="https://www.google.com/maps?output=embed&q=La%20Bastide-d%27Engras%2C%20France&z=14&hl=fr"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="mt-5 block h-[24rem] w-full rounded-sm border-0 sm:h-[32rem]"
          />
        </section>
      </div>
    </section>
  );
}
