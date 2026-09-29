import { Download, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

// Remplace ce chemin par le vrai nom du fichier PLU placé dans /public (ex. "/plu-la-bastide.pdf")
const PDF_URL = "/plu-la-bastide.pdf";

export const metadata: Metadata = {
  title: "Plan local d'urbanisme (PLU)",
  description:
    "Le règlement du PLU de La Bastide-d'Engras : zonage, hauteurs, implantations et démarches avant travaux.",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

export default function PLUPage() {
  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Plan local d&apos;urbanisme
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Le règlement qui fixe les règles d&apos;aménagement du territoire
          communal : hauteurs, implantations, emprises au sol et aspects
          extérieurs.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={PDF_URL}
            download
            className={`inline-flex items-center gap-2 rounded-sm bg-[#9e5218] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#854311] ${focusRing}`}
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Télécharger le PLU complet
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

        {/* Avant vos travaux : l'information la plus utile de la page, donc en haut, avant le document */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="border-l-4 border-stone-200 pl-5">
            <h2 className="font-serif text-xl font-semibold text-stone-900">
              Avant vos travaux
            </h2>
            <p className="mt-2 text-base leading-relaxed text-stone-700">
              Toute modification de façade ou de clôture, création
              d&apos;ouverture ou construction neuve nécessite le dépôt
              préalable d&apos;un dossier en mairie (déclaration préalable ou
              permis de construire). Le non-respect du PLU peut entraîner des
              poursuites et une obligation de remise en état.
            </p>
          </div>

          <div className="border-l-4 border-stone-200 pl-5">
            <h2 className="font-serif text-xl font-semibold text-stone-900">
              Assistance technique
            </h2>
            <p className="mt-2 text-base leading-relaxed text-stone-700">
              Le plan de zonage grand format est consultable au secrétariat de
              la mairie, aux horaires d&apos;ouverture habituels.
            </p>
          </div>
        </div>

        {/* Lecture intégrée : confortable sur grand écran, remplacée par les liens ci-dessus sur mobile */}
        <div className="mt-14 hidden border-t border-stone-200 pt-10 md:block">
          <iframe
            src={`${PDF_URL}#view=FitH`}
            title="Lecteur du plan local d'urbanisme"
            className="h-[48rem] w-full border border-stone-200"
          />
        </div>

        <p className="mt-14 max-w-md text-base leading-relaxed text-stone-600 md:hidden">
          Sur smartphone, ce document se lit mieux ouvert directement dans le
          navigateur : utilisez le lien « Ouvrir dans un nouvel onglet »
          ci-dessus.
        </p>
      </div>
    </section>
  );
}
