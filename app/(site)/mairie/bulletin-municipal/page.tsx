import { Download, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

// Remplace ce chemin par le vrai nom du fichier placé dans /public (ex. "/bulletin-2026.pdf")
const PDF_URL = "/bulletin-2026.pdf";

export const metadata: Metadata = {
  title: "Bulletin municipal",
  description:
    "Le bulletin municipal de La Bastide-d'Engras : bilans, projets, budget et vie associative.",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

export default function BulletinMunicipalPage() {
  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Bulletin municipal
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Les bilans de la municipalité, les chantiers en cours et
          l&apos;actualité du tissu associatif.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={PDF_URL}
            download
            className={`inline-flex items-center gap-2 rounded-sm bg-[#9e5218] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#854311] ${focusRing}`}
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Télécharger le PDF
          </a>

          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] ${focusRing}`}
          >
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            Ouvrir dans un nouvel onglet
          </a>
        </div>

        {/* Lecture intégrée : confortable sur grand écran, remplacée par les liens ci-dessus sur mobile */}
        <div className="mt-14 hidden border-t border-stone-200 pt-10 md:block">
          <iframe
            src={`${PDF_URL}#view=FitH`}
            title="Lecteur du bulletin municipal"
            className="h-[42rem] w-full border border-stone-200"
          />
        </div>

        <p className="mt-14 max-w-md text-base leading-relaxed text-stone-600 md:hidden">
          Sur smartphone, le bulletin se lit mieux ouvert directement dans le
          navigateur : utilisez le lien « Ouvrir dans un nouvel onglet »
          ci-dessus.
        </p>
      </div>
    </section>
  );
}
