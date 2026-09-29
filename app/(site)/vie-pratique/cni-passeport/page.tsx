import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CNI & passeport",
  description:
    "La mairie de La Bastide-d'Engras ne délivre pas les cartes d'identité et passeports : où faire sa demande et comment préparer son dossier.",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

const nearbyOffices = [
  {
    label: "Mairie d'Uzès",
    href: "https://www.uzes.fr/demarches/formalites-administratives/carte-nationale-didentite-passeport/carte-didentite",
  },
  {
    label: "Trouver une autre mairie équipée dans le Gard",
    href: "https://passeport.ants.gouv.fr/services/geolocaliser-une-mairie-habilitee",
  },
];

const prepareLinks = [
  {
    label: "Faire sa pré-demande en ligne (service-public.fr)",
    href: "https://www.service-public.fr/particuliers/vosdroits/N360",
  },
  {
    label: "Toutes les informations officielles (préfecture du Gard)",
    href: "http://www.gard.gouv.fr/Demarches-administratives/Carte-Nationale-d-Identite/Carte-Nationale-d-Identite",
  },
];

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="mt-4 border-b border-stone-200">
      {items.map((item) => (
        <li key={item.href} className="border-t border-stone-200">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-between gap-6 py-4 text-base font-semibold text-stone-900 transition-colors hover:text-[#9e5218] ${focusRing}`}
          >
            {item.label}
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-stone-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9e5218]"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function CniPasseportPage() {
  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Carte d&apos;identité et passeport
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Les démarches pour créer ou renouveler une carte nationale
          d&apos;identité (CNI) ou un passeport.
        </p>

        <div className="mt-10 border-l-4 border-amber-600 pl-5">
          <p className="text-lg leading-relaxed text-stone-800">
            La mairie de La Bastide-d&apos;Engras{" "}
            <strong className="font-semibold">n&apos;est pas équipée</strong>
            &nbsp;du dispositif de recueil d&apos;empreintes. Le dossier doit
            être déposé dans une mairie équipée,{" "}
            <strong className="font-semibold">
              même si ce n&apos;est pas celle de votre domicile
            </strong>
            .
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Mairies équipées à proximité
          </h2>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-stone-600">
            La mairie d&apos;Uzès est la plus proche. Vous pouvez aussi chercher
            une autre commune équipée dans le Gard.
          </p>
          <LinkList items={nearbyOffices} />
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Préparer son dossier
          </h2>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-stone-600">
            Une pré-demande en ligne, faite avant le rendez-vous, accélère
            nettement le passage en mairie.
          </p>
          <LinkList items={prepareLinks} />
        </div>

        <p className="mt-14 max-w-xl border-l-4 border-stone-200 pl-5 text-base leading-relaxed text-stone-600">
          Les délais de rendez-vous et de fabrication s&apos;allongent souvent à
          l&apos;approche de l&apos;été : mieux vaut anticiper.
        </p>
      </div>
    </section>
  );
}
