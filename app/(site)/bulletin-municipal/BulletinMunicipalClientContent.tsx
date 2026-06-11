"use client";

import { Download, FileText, ExternalLink } from "lucide-react";

export default function BulletinMunicipalPage() {
  // Remplace ce chemin par le vrai nom de ton fichier placé dans le dossier /public (ex: "/bulletin-2026.pdf")
  const pdfUrl = "/bulletin-2026.pdf";

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 inline-flex rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Publications officielles
          </span>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Le Bulletin Municipal
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90 font-light">
            Suivez la vie de notre commune : projets réalisés, décisions du
            conseil, budgets et événements à La Bastide d&apos;Engras.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Colonne Gauche : Options et Informations */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-800 mb-4">
                  Édition Courante 2026
                </span>

                <h2 className="text-2xl font-bold text-stone-900 mb-4">
                  Bulletin Annuel
                </h2>

                <p className="text-stone-600 font-light text-sm mb-6 leading-relaxed">
                  Ce document interactif regroupe l&apos;ensemble des bilans de
                  la municipalité, les chantiers d&apos;aménagement du village
                  ainsi que les actus du tissu associatif.
                </p>

                {/* Bouton de téléchargement direct */}
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8a7a5a] px-6 py-3.5 font-medium text-white transition hover:scale-[1.02] shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Télécharger le PDF
                </a>
              </div>
            </div>

            {/* Colonne Droite : Zone d'affichage adaptative */}
            <div className="lg:col-span-8 w-full">
              {/* 📱 AFFICHAGE MOBILE (Masqué sur PC avec 'md:hidden') */}
              <div className="block md:hidden rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-500 mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  Lecture sur smartphone
                </h3>
                <p className="text-stone-600 text-sm font-light mb-6">
                  Pour un confort de lecture optimal et parcourir toutes les
                  pages du bulletin, ouvrez-le directement dans votre navigateur
                  mobile.
                </p>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 px-6 py-3 text-sm font-semibold w-full shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ouvrir et lire le plein écran
                </a>
              </div>

              {/* 💻 AFFICHAGE ORDINATEUR & TABLETTE (Masqué sur mobile avec 'hidden md:block') */}
              <div className="hidden md:block">
                <div className="mb-4 flex items-center gap-2 text-stone-500 text-sm px-2">
                  <FileText className="w-4 h-4" />
                  <span>Visualisation directe du document</span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg h-[700px] w-full">
                  <iframe
                    src={`${pdfUrl}#view=FitH`}
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    title="Lecteur Bulletin Municipal"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
