"use client";

import { Download, FileText } from "lucide-react";

export default function BulletinMunicipalPage() {
  // Remplace ce chemin par le vrai nom de ton fichier placé dans le dossier /public (ex: "/bulletin-2026.pdf")
  const pdfUrl = "/bulletin-2026.pdf";

  return (
    <>
      {/* Hero Section - Identique à la page Contact */}
      <section
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
          backgroundAttachment: "fixed",
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
            {/* Colonne Gauche : Options et Informations (4 colonnes sur large écran) */}
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

            {/* Colonne Droite : Lecteur PDF Intégré (8 colonnes sur large écran) */}
            <div className="lg:col-span-8">
              <div className="mb-4 flex items-center gap-2 text-stone-500 text-sm px-2">
                <FileText className="w-4 h-4" />
                <span>Visualisation directe du document</span>
              </div>

              {/* Conteneur de l'Iframe avec aspect ratio pour écrans PC et tablettes */}
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
      </section>
    </>
  );
}
