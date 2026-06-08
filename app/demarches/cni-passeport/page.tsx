"use client";

import {
  ExternalLink,
  FileText,
  Info,
  MapPin,
  ShieldAlert,
} from "lucide-react";

export default function CniPasseportPage() {
  return (
    <>
      {/* Hero Section - Même style que le reste du site */}
      <section
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 inline-flex rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Démarches administratives
          </span>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Carte d&apos;Identité & Passeport
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90 font-light">
            Les modalités et démarches pour créer ou renouveler vos titres
            d&apos;identité à La Bastide d&apos;Engras.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Avertissement important - Dispositif de recueil */}
          <div className="mb-12 rounded-2xl border-2 border-amber-500/30 bg-amber-50/50 p-8 shadow-sm">
            <div className="flex gap-4 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-2">
                  Information importante aux administrés
                </h2>
                <p className="text-stone-700 font-light leading-relaxed text-sm">
                  La mairie de La Bastide d&apos;Engras{" "}
                  <strong className="font-bold">n&apos;est pas équipée</strong>{" "}
                  du dispositif de recueil d&apos;empreintes digitales. Vous
                  devez impérativement déposer votre dossier dans une mairie
                  équipée,{" "}
                  <strong className="font-bold">
                    même si elle n&apos;est pas celle de votre domicile
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Colonne Gauche : Où se rendre à proximité */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2.5">
                  <MapPin className="h-5 w-5 text-[#8a7a5a]" />
                  Mairies à proximité
                </h3>

                <p className="text-stone-600 font-light text-sm mb-6 leading-relaxed">
                  Pour réaliser votre démarche au plus près, vous pouvez prendre
                  rendez-vous auprès de la ville d&apos;Uzès ou consulter la
                  carte officielle du département.
                </p>

                <div className="space-y-4">
                  {/* Lien Uzès */}
                  <a
                    href="https://www.uzes.fr/demarches/formalites-administratives/carte-nationale-didentite-passeport/carte-didentite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-100 hover:border-stone-300 transition group text-sm font-medium text-stone-900"
                  >
                    <span>Mairie d&apos;Uzès</span>
                    <ExternalLink className="h-4 w-4 text-stone-400 group-hover:text-[#8a7a5a] transition" />
                  </a>

                  {/* Lien Cartographie du Gard */}
                  <a
                    href="https://passeport.ants.gouv.fr/services/geolocaliser-une-mairie-habilitee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-100 hover:border-stone-300 transition group text-sm font-medium text-stone-900"
                  >
                    <span>Autres communes équipées (Gard)</span>
                    <ExternalLink className="h-4 w-4 text-stone-400 group-hover:text-[#8a7a5a] transition" />
                  </a>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Pré-demande et informations nationales */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2.5">
                  <FileText className="h-5 w-5 text-[#8a7a5a]" />
                  Préparer son dossier
                </h3>

                <p className="text-stone-600 font-light text-sm mb-6 leading-relaxed">
                  Pour gagner du temps, il est fortement conseillé
                  d&apos;effectuer une pré-demande en ligne et de vérifier la
                  liste des pièces justificatives nécessaires (photos,
                  justificatif de domicile...).
                </p>

                <div className="space-y-4">
                  {/* Lien Services Préfecture / État */}
                  <a
                    href="http://www.gard.gouv.fr/Demarches-administratives/Carte-Nationale-d-Identite/Carte-Nationale-d-Identite#!/Particuliers/page/N358"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-100 hover:border-stone-300 transition group text-sm font-medium text-stone-900"
                  >
                    <span>Toutes les informations officielles</span>
                    <ExternalLink className="h-4 w-4 text-stone-400 group-hover:text-[#8a7a5a] transition" />
                  </a>
                </div>
              </div>

              {/* Petit rappel utile de fin */}
              <div className="mt-6 pt-6 border-t border-stone-100 flex gap-3 items-start text-xs text-stone-500 font-light">
                <Info className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                <span>
                  Pensez à anticiper vos démarches, les délais de rendez-vous et
                  de fabrication peuvent s&apos;allonger à l&apos;approche de la
                  période estivale.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
