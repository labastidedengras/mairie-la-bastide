"use client";

import { ArrowRight, Download, FileText, Layers } from "lucide-react";
import Link from "next/link";

export default function MunicipalLifeSection() {
  return (
    <section className="relative bg-white py-24 text-stone-900 border-t border-stone-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#9e5218]/40" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9e5218]">
              Vie Municipale
            </span>
            <span className="h-px w-8 bg-[#9e5218]/40" />
          </div>
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">
            Publications &amp; Décisions Officielles
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-stone-500 md:text-base">
            Restez informé des dernières décisions du conseil municipal et
            consultez les publications officielles de la commune.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex flex-col sm:flex-row gap-6 items-center rounded-lg border border-stone-200 bg-stone-50 p-6 shadow-sm">
            <div className="relative aspect-[3/4] w-40 shrink-0 overflow-hidden rounded border border-stone-300 shadow-md bg-[#9e5218]/5 flex flex-col justify-between p-4 text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#9e5218]">
                Mairie
              </div>
              <div className="my-auto">
                <FileText className="mx-auto h-12 w-12 text-[#9e5218]/40 stroke-[1.2]" />
                <p className="mt-2 font-serif text-xs font-semibold text-stone-800">
                  Bulletin Municipal
                </p>
              </div>
              <div className="text-[10px] font-medium text-stone-500 bg-stone-200/60 py-1 rounded">
                Année 2026
              </div>
            </div>

            <div className="flex flex-col justify-between h-full text-center sm:text-left">
              <div>
                <span className="inline-block rounded bg-[#9e5218]/10 px-2.5 py-1 text-xs font-semibold text-[#9e5218]">
                  Dernière publication
                </span>
                <h3 className="mt-3 font-serif text-xl font-bold text-stone-900">
                  La Bastide d&apos;Engras — Édition Été 2026
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  Retrouvez le point sur les travaux en cours, le budget
                  communal, les projets d&apos;urbanisme et l&apos;agenda des
                  animations estivales du village.
                </p>
              </div>

              <div className="mt-6">
                <a
                  href="/documents/bulletin-municipal-latest.pdf"
                  download
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-[#9e5218] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-200 hover:bg-[#854311]"
                >
                  <Download className="h-4 w-4" />
                  Télécharger le PDF
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-2">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-stone-100 text-stone-700">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-stone-900">
                    Dernier Conseil Municipal
                  </h4>
                  <p className="mt-1 text-sm text-stone-600">
                    Le compte-rendu de la séance du conseil municipal du mois
                    dernier est disponible au format réglementaire.
                  </p>
                  <Link
                    href="/mairie/comptes-rendus"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#9e5218] hover:underline"
                  >
                    Voir le dernier compte-rendu{" "}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6 flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-stone-100 text-stone-700">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-stone-900">
                    Recueil des Actes &amp; Arrêtés
                  </h4>
                  <p className="mt-1 text-sm text-stone-600">
                    Consultez les arrêtés municipaux et préfectoraux en vigueur
                    concernant la vie de la commune.
                  </p>
                  <Link
                    href="/mairie/bulletin-municipal"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#9e5218] hover:underline"
                  >
                    Accéder aux publications <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
