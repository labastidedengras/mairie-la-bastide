"use client";

import { Download, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CompteRendu } from "./page";

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${parseInt(day, 10)} ${MOIS[parseInt(month, 10) - 1]} ${year}`;
};

export default function ComptesRendusClientContent({
  documents,
}: {
  documents: CompteRendu[];
}) {
  // Regroupement par année, calculé une seule fois
  const byYear = useMemo(() => {
    const grouped: Record<string, CompteRendu[]> = {};
    for (const doc of documents) {
      (grouped[doc.annee] ??= []).push(doc);
    }
    return grouped;
  }, [documents]);

  const years = useMemo(
    () => Object.keys(byYear).sort((a, b) => b.localeCompare(a)),
    [byYear],
  );

  const [activeYear, setActiveYear] = useState(years[0] ?? "");
  const [viewingDoc, setViewingDoc] = useState<CompteRendu | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Ouvre la visionneuse : mémorise le lien cliqué pour lui rendre le focus à la fermeture
  const openViewer = (doc: CompteRendu, e: React.MouseEvent<HTMLElement>) => {
    triggerRef.current = e.currentTarget;
    setViewingDoc(doc);
  };

  const closeViewer = () => {
    setViewingDoc(null);
    triggerRef.current?.focus();
  };

  // Focus sur le bouton fermer à l'ouverture, fermeture au clavier avec Échap
  useEffect(() => {
    if (!viewingDoc) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [viewingDoc]);

  const activeDocuments = byYear[activeYear] ?? [];

  return (
    <>
      {/* pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre */}
      <section className="bg-white pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Comptes rendus du conseil municipal
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-700">
            Les procès-verbaux des séances, publiés après validation par le
            conseil municipal.
          </p>

          {years.length > 0 && (
            <div
              role="tablist"
              aria-label="Filtrer par année"
              className="mt-12 flex flex-wrap gap-x-8 gap-y-3 pb-8"
            >
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  role="tab"
                  aria-selected={activeYear === year}
                  onClick={() => setActiveYear(year)}
                  className="font-serif text-2xl font-semibold text-stone-500 underline decoration-2 underline-offset-8 decoration-transparent transition-colors hover:text-stone-900 hover:decoration-stone-300 aria-selected:text-stone-900 aria-selected:decoration-[#9e5218] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e5218]"
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          {activeDocuments.length > 0 ? (
            <ul className="mt-4 border-b border-stone-200">
              {activeDocuments.map((doc) => (
                <li
                  key={doc.url}
                  className="flex flex-col gap-3 border-t border-stone-200 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-stone-900">
                      {doc.titre}
                    </h2>
                    <p className="mt-1 text-base text-stone-500">
                      Séance du {formatDate(doc.date)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-6">
                    <button
                      type="button"
                      onClick={(e) => openViewer(doc, e)}
                      className="text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]"
                    >
                      Consulter
                    </button>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]"
                    >
                      <Download aria-hidden="true" className="h-4 w-4" />
                      Télécharger
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-14 text-lg text-stone-600">
              Aucun document disponible pour le moment.
            </p>
          )}

          <p className="mt-16 border-l-4 border-stone-200 pl-5 text-base leading-relaxed text-stone-600">
            Les comptes rendus sont affichés en mairie et publiés sur le site
            dans la semaine suivant leur validation par le conseil municipal.
          </p>
        </div>
      </section>

      {viewingDoc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="viewer-title"
          className="fixed inset-0 z-[60] flex flex-col bg-stone-950/90 p-4 md:p-6"
        >
          <div className="flex items-center justify-between gap-4 bg-white px-6 py-4">
            <div className="min-w-0">
              <h2
                id="viewer-title"
                className="truncate font-serif text-lg font-semibold text-stone-900"
              >
                {viewingDoc.titre}
              </h2>
              <p className="mt-0.5 text-base text-stone-500">
                Séance du {formatDate(viewingDoc.date)}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={viewingDoc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-sm bg-[#9e5218] px-4 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#854311]"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                <span className="hidden sm:inline">Télécharger</span>
              </a>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeViewer}
                aria-label="Fermer la visionneuse"
                className="rounded-sm p-2.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-white">
            <iframe
              src={viewingDoc.url}
              title={`Compte rendu : ${viewingDoc.titre}`}
              className="h-full w-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
