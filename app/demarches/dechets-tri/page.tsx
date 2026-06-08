"use client";

import {
  AlertTriangle,
  Globe,
  HelpCircle,
  Leaf,
  Mail,
  Package,
  Phone,
  Trash2,
} from "lucide-react";

export default function DechetsTriPage() {
  return (
    <>
      {/* Hero Section - Identique au reste de la charte du site */}
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
            Cadre de vie & Environnement
          </span>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Gestion des Déchets & Tri
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90 font-light">
            Retrouvez les consignes de tri, les modalités de retrait des sacs
            jaunes et les solutions de compostage à La Bastide d&apos;Engras.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* BLOC 1 : Sacs jaunes (Emballages) */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 border border-yellow-100">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">
                      Collecte sélective
                    </span>
                    <h2 className="text-xl font-bold text-stone-900">
                      Sacs jaunes d&apos;emballages
                    </h2>
                  </div>
                </div>

                <p className="text-stone-600 font-light text-sm mb-6 leading-relaxed">
                  Pour assurer une collecte des emballages en porte-à-porte
                  efficace, les habitants peuvent retirer leurs sacs de tri
                  directement à{" "}
                  <strong className="font-semibold text-stone-900">
                    l&apos;Agence Postale Communale
                  </strong>
                  .
                </p>

                <div className="rounded-xl bg-stone-50 border border-stone-100 p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-stone-900">
                    Rappel des modalités de retrait :
                  </h3>
                  <p className="text-stone-600 font-light text-xs leading-relaxed">
                    La dotation annuelle est calculée selon la taille du foyer :
                  </p>
                  <ul className="text-stone-600 font-light text-xs space-y-2 list-disc pl-4">
                    <li>
                      <strong className="font-semibold text-stone-900">
                        1 rouleau de 25 sacs de 50 litres
                      </strong>{" "}
                      par personne présente au foyer.
                    </li>
                    <li className="text-stone-500 italic">
                      Exemple : Un foyer de 4 personnes bénéficiera de 4
                      rouleaux de sacs jaunes.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BLOC 2 : Compostage (Biodéchets) */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">
                      Réduction des déchets
                    </span>
                    <h2 className="text-xl font-bold text-stone-900">
                      Compostage domestique
                    </h2>
                  </div>
                </div>

                <p className="text-stone-600 font-light text-sm mb-4 leading-relaxed">
                  Les composteurs en plastique deviennent{" "}
                  <strong className="font-bold text-stone-900">gratuits</strong>{" "}
                  sur l&apos;ensemble du territoire du SICTOMU.
                </p>

                <p className="text-stone-600 font-light text-sm mb-6 leading-relaxed">
                  Chaque usager peut bénéficier d&apos;un{" "}
                  <strong className="font-semibold text-stone-900">
                    composteur en plastique de 400 litres offert
                  </strong>
                  , à l&apos;unique condition de suivre une formation courte
                  obligatoire.
                </p>

                <div className="rounded-xl bg-stone-50 border border-stone-100 p-5 space-y-2">
                  <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-emerald-600 shrink-0" />
                    Formation requise (45 min)
                  </h3>
                  <p className="text-stone-600 font-light text-xs leading-relaxed">
                    Ces sessions courtes sont animées par des
                    maîtres-composteurs. Elles permettent à chacun de comprendre
                    les gestes essentiels pour réussir son compostage à la
                    maison et valoriser efficacement ses biodéchets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION DU BAS : Informations SICTOMU issue du guide officiel */}
          <div className="mt-16 rounded-2xl border border-stone-200 bg-white p-8 shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <Trash2 className="h-5 w-5 text-[#8a7a5a]" />
              <h3 className="text-lg font-bold text-stone-900">
                Le SICTOMU à votre service
              </h3>
            </div>

            <p className="text-stone-600 font-light text-sm mb-8 leading-relaxed">
              La collecte et le traitement de vos déchets ménagers sont assurés
              par le Syndicat Intercommunal de Collecte et de Traitement des
              Ordures Ménagères de la région d&apos;Uzès (SICTOMU).
              N&apos;oubliez pas que la mise à jour de votre carte d&apos;accès
              en déchèterie est requise pour maintenir votre accès.
            </p>

            {/* Coordonnées de contact du syndicat */}
            <div className="grid gap-6 sm:grid-cols-3 pt-6 border-t border-stone-100">
              <div className="flex gap-3 items-start">
                <Phone className="h-5 w-5 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Téléphone
                  </h4>
                  <p className="text-sm text-stone-900 font-medium mt-0.5">
                    04 66 22 13 70
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Mail className="h-5 w-5 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Courriel
                  </h4>
                  <p className="text-sm text-stone-900 font-medium mt-0.5 break-all">
                    sictomu@sictomu.fr
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Globe className="h-5 w-5 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Démarches en ligne
                  </h4>
                  <a
                    href="https://www.sictomu.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#8a7a5a] hover:underline font-medium mt-0.5 block"
                  >
                    www.sictomu.fr
                  </a>
                </div>
              </div>
            </div>

            {/* Note d'adresse */}
            <div className="mt-8 pt-4 border-t border-stone-50 flex items-start gap-2 text-xs text-stone-400 font-light">
              <HelpCircle className="h-4 w-4 text-stone-300 shrink-0 mt-0.5" />
              <span>
                Siège du SICTOMU : Quartier Bord Nègre - D3 bis, 30210
                Argilliers. Rendez-vous sur leur site internet officiel pour
                toute demande de bac, réclamation ou inscription aux sessions de
                formation de compostage.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
