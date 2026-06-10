"use client";

import {
  Building,
  Download,
  ExternalLink,
  Info,
  Map,
  ShieldAlert,
} from "lucide-react";

export default function PLUPage() {
  // Remplace ce chemin par le vrai nom de ton fichier PLU placé dans le dossier /public (ex: "/plu-la-bastide.pdf")
  const pdfUrl = "/plu-la-bastide.pdf";

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
            Cadre de vie & Urbanisme
          </span>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Plan Local d&apos;Urbanisme
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90 font-light">
            Consultez les règles d&apos;aménagement, les zones constructibles et
            les dispositions réglementaires de La Bastide d&apos;Engras.
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
                  Document Officiel en Vigueur
                </span>

                <h2 className="text-2xl font-bold text-stone-900 mb-4">
                  Règlement du PLU
                </h2>

                <p className="text-stone-600 font-light text-sm mb-6 leading-relaxed">
                  Ce document fixe les règles générales d&apos;urbanisme
                  applicables sur le territoire de la commune (hauteurs,
                  implantations, emprises au sol, aspects extérieurs).
                </p>

                {/* Bouton de téléchargement direct */}
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8a7a5a] px-6 py-3.5 font-medium text-white transition hover:scale-[1.02] shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Télécharger le PLU complet
                </a>
              </div>

              {/* Box de rappel de bonnes pratiques */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-semibold text-stone-900 text-base flex items-center gap-2">
                  <Building className="w-4 h-4 text-stone-600" />
                  Avant vos travaux
                </h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed">
                  Toute modification de façade, clôture, création
                  d&apos;ouverture ou construction neuve nécessite le dépôt
                  préalable d&apos;un dossier en mairie (Déclaration Préalable
                  ou Permis de Construire).
                </p>
                <div className="pt-2 border-t border-stone-100 flex gap-4 items-start text-xs text-stone-500">
                  <ShieldAlert className="w-4 h-4 text-[#8a7a5a] shrink-0 mt-0.5" />
                  <span>
                    Le non-respect du PLU peut faire l&apos;objet de poursuites
                    et d&apos;une obligation de remise en état.
                  </span>
                </div>
              </div>

              {/* Box Info Mairie */}
              <div className="bg-stone-100/80 border border-stone-200 rounded-2xl p-6 flex gap-4 items-start">
                <Info className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-semibold text-stone-900 mb-1">
                    Assistance technique
                  </h4>
                  <p className="text-stone-600 font-light leading-relaxed">
                    Le plan de zonage papier grand format est consultable
                    directement au secrétariat de la mairie aux horaires
                    d&apos;ouverture habituels.
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Zone d'affichage adaptative */}
            <div className="lg:col-span-8 w-full">
              {/* 📱 AFFICHAGE MOBILE (Masqué sur PC) */}
              <div className="block md:hidden rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-500 mb-4">
                  <Map className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  Lecture sur smartphone
                </h3>
                <p className="text-stone-600 text-sm font-light mb-6">
                  Le règlement d&apos;urbanisme est un document complet. Pour
                  parcourir facilement toutes ses pages et ses tableaux,
                  ouvrez-le directement en plein écran.
                </p>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 px-6 py-3 text-sm font-semibold w-full shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ouvrir le document réglementaire
                </a>
              </div>

              {/* 💻 AFFICHAGE ORDINATEUR & TABLETTE */}
              <div className="hidden md:block">
                <div className="mb-4 flex items-center justify-between text-stone-500 text-sm px-2">
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4" />
                    <span>Consultation du document réglementaire</span>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg h-[800px] w-full">
                  <iframe
                    src={`${pdfUrl}#view=FitH`}
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    title="Lecteur Plan Local d'Urbanisme"
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
