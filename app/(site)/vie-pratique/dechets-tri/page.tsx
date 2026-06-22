import {
  AlertTriangle,
  Apple,
  CheckCircle2,
  Globe,
  HelpCircle,
  Info,
  Leaf,
  Mail,
  Package,
  Phone,
  Sparkles,
  Trash2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des Déchets & Tri Sélectif",
  description:
    "Consultez le calendrier de collecte des ordures, les consignes de tri sélectif, l'accès aux déchetteries et la gestion des encombrants de la commune.",
};

export default function DechetsTriPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
              Cadre de vie & Environnement
            </span>
            <span className="h-px w-8 bg-white/40" />
          </div>

          <h1 className="font-serif text-5xl font-medium tracking-tight text-white md:text-6xl">
            Gestion des Déchets & Tri
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90 font-light">
            Retrouvez les consignes de tri, le fonctionnement du composteur de
            village et les modalités de collecte des encombrants à La
            Bastide-d&apos;Engras.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* ================= BLOCS DU HAUT : SACS JAUNES & COMPOSTAGE DOMESTIQUE ================= */}
          <div className="grid gap-8 md:grid-cols-2 items-stretch">
            {/* BLOC 1 : Sacs jaunes (Emballages) */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 border border-yellow-100">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">
                      Collecte sélective
                    </span>
                    <h2 className="font-serif text-xl font-medium text-stone-900">
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
                      Example : Un foyer de 4 personnes bénéficiera de 4
                      rouleaux de sacs jaunes.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BLOC 2 : Compostage Domestique SICTOMU */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">
                      Réduction des déchets
                    </span>
                    <h2 className="font-serif text-xl font-medium text-stone-900">
                      Composteur individuel offert
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
                    maison.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= NOUVEAU BLOC : TOUT SUR LE COMPOSTAGE & LE SITE DE LA COMMUNE ================= */}
          <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5c6b47]/10 text-[#5c6b47]">
                <Apple className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">
                  Réglementation & Pratique
                </span>
                <h2 className="font-serif text-2xl font-medium text-stone-900">
                  Le tri des biodéchets & Le site de compostage
                </h2>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Infos Générales */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-stone-50 rounded-xl p-5 border border-stone-100">
                  <h3 className="font-semibold text-stone-900 text-sm mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#5c6b47]" /> Tri à la
                    source obligatoire
                  </h3>
                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    Les biodéchets représentent environ un tiers des ordures
                    ménagères non triées en France. Depuis le{" "}
                    <strong>1er janvier 2024</strong>, le tri à la source des
                    biodéchets a été généralisé pour tous (professionnels et
                    particuliers) afin de leur donner une nouvelle vie !
                  </p>
                </div>

                <div className="bg-stone-50 rounded-xl p-5 border border-stone-100">
                  <h3 className="font-semibold text-stone-900 text-sm mb-2">
                    Qu&apos;est-ce que c&apos;est ?
                  </h3>
                  <ul className="text-xs text-stone-600 font-light space-y-2">
                    <li>
                      • <strong>Déchets de cuisine & table :</strong>{" "}
                      Épluchures, coquilles d&apos;œufs, pain rassis, marc de
                      café...
                    </li>
                    <li>
                      • <strong>Déchets de jardin :</strong> Tontes, feuilles
                      mortes, petites branches.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Les 5 bacs du village */}
              <div className="lg:col-span-2 bg-[#5c6b47]/5 rounded-xl p-6 border border-[#5c6b47]/15 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-medium text-stone-950 mb-1">
                    Le site de compostage de La Bastide-d&apos;Engras
                  </h3>
                  <p className="text-xs text-stone-600 font-light mb-4">
                    Le respect de la fonction de chaque bac est un gage de
                    qualité pour obtenir un bon compost. Notre site communal est
                    structuré de façon précise :
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 text-xs">
                    <div className="bg-white rounded-lg p-3 border border-stone-200">
                      <span className="font-bold text-[#5c6b47] block mb-1">
                        Bac 1
                      </span>
                      <p className="text-stone-600 font-light">
                        Stockage de la matière sèche (broyat).
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-amber-200 bg-amber-50/20">
                      <span className="font-bold text-amber-700 block mb-1">
                        Bac 2 (Apports)
                      </span>
                      <p className="text-stone-600 font-light">
                        Le bac dans lequel on déverse les bio-déchets
                        alimentaires.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-stone-200">
                      <span className="font-bold text-[#5c6b47] block mb-1">
                        Bac 3
                      </span>
                      <p className="text-stone-600 font-light">
                        Dédié à la phase de maturation du compost.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-emerald-200 bg-emerald-50/20 sm:col-span-2 md:col-span-2">
                      <span className="font-bold text-emerald-700 block mb-1">
                        Bacs 4 & 5 (Partage)
                      </span>
                      <p className="text-stone-600 font-light">
                        Stockage du compost mûr mis à la libre disposition de
                        tous les habitants.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-200/60 text-[11px] text-stone-500 italic">
                  Pourquoi trier ? Cela permet de réduire le bilan carbone, de
                  produire du biogaz/compost via la méthanisation et
                  d&apos;améliorer durablement la qualité de nos sols locaux.
                </div>
              </div>
            </div>
          </div>

          {/* ================= NOUVEAU BLOC : COLLECTE DES ENCOMBRANTS ================= */}
          <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">
                  Service SICTOMU
                </span>
                <h2 className="font-serif text-2xl font-medium text-stone-900">
                  Collecte des encombrants sur rendez-vous
                </h2>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Liste des objets acceptés */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">
                  Objets acceptés à la collecte :
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                    <h4 className="font-bold text-xs text-stone-900 mb-2">
                      Gros Électroménagers
                    </h4>
                    <ul className="text-xs text-stone-600 space-y-1 font-light">
                      <li>• Réfrigérateur & Congélateur</li>
                      <li>• Cuisinière & Gros four</li>
                      <li>• Lave-linge & Sèche-linge</li>
                      <li>• Lave-vaisselle</li>
                      <li>• Barbecue & Gaz</li>
                      <li>• Télévision Cathodique</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                    <h4 className="font-bold text-xs text-stone-900 mb-2">
                      Mobiliers de gros volumes
                    </h4>
                    <ul className="text-xs text-stone-600 space-y-1 font-light">
                      <li>• Tables</li>
                      <li>• Buffets</li>
                      <li>• Canapés</li>
                      <li>• Armoires</li>
                      <li>• Fauteuils</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 text-xs text-amber-800 flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <p>
                    <strong>Attention :</strong> Tout objet ne faisant pas
                    explicitement partie de cette liste officielle sera
                    catégoriquement refusé lors de la collecte.
                  </p>
                </div>
              </div>

              {/* Conditions impératives */}
              <div className="bg-stone-900 text-white rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
                    5 Conditions d&apos;acceptation impératives :
                  </h3>
                  <ul className="space-y-3 text-xs font-light">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#7d8f64] shrink-0 mt-0.5" />
                      <span>
                        <strong>Maximum 3 objets</strong> par rendez-vous.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#7d8f64] shrink-0 mt-0.5" />
                      <span>
                        Poids individuel par objet strictement{" "}
                        <strong>inférieur à 70kg</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#7d8f64] shrink-0 mt-0.5" />
                      <span>
                        Les objets doivent être préalablement{" "}
                        <strong>vidés, propres et salubres</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#7d8f64] shrink-0 mt-0.5" />
                      <span>
                        Objets garantis{" "}
                        <strong>ni toxiques, ni dangereux</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#7d8f64] shrink-0 mt-0.5" />
                      <span>
                        Les encombrants doivent être impérativement{" "}
                        <strong>mis en limite de voirie</strong> le jour J.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-white/50">
                  Pour planifier un ramassage, contactez directement le
                  secrétariat du SICTOMU aux coordonnées ci-dessous.
                </div>
              </div>
            </div>
          </div>

          {/* ================= COORDONNÉES DE CONTACT DU SICTOMU ================= */}
          <div className="mt-16 rounded-2xl border border-stone-200 bg-white p-8 shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <Trash2 className="h-5 w-5 text-[#5c6b47]" />
              <h3 className="font-serif text-lg font-medium text-stone-900">
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
                    className="text-sm text-[#5c6b47] hover:underline font-medium mt-0.5 block"
                  >
                    www.sictomu.fr
                  </a>
                </div>
              </div>
            </div>

            {/* Note d&apos;adresse */}
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
