import { Clock3, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agence postale communale",
  description:
    "Horaires, services et coordonnées de l'Agence Postale Communale de La Bastide-d'Engras.",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

const agencesVoisines = [
  {
    nom: "Saint-Laurent-la-Vernède",
    horaires: "Du lundi au vendredi, de 9 h à 12 h",
  },
  {
    nom: "La Bruguière",
    horaires: "Du mardi au samedi, de 9 h à 12 h",
  },
  {
    nom: "Cavillargues",
    horaires:
      "Du lundi au vendredi, de 9 h à 18 h ; le mercredi, de 14 h à 18 h",
  },
  {
    nom: "Saint-Pons-la-Calm",
    horaires: "Du lundi au vendredi, de 9 h à 12 h",
  },
];

export default function LaPostePage() {
  return (
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9e5218]">
          Vie pratique
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Agence postale communale
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Audrey RENAULT vous accueille à l&apos;Agence Postale Communale (APC)
          du village, à côté de la mairie.
        </p>

        <div className="mt-10 grid gap-8 border-y border-stone-200 py-8 sm:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
              <MapPin aria-hidden="true" className="h-5 w-5 text-[#9e5218]" />
              Nous trouver
            </h2>
            <address className="mt-3 text-base not-italic leading-relaxed text-stone-700">
              7 rue des Mouchards
              <br />
              30330 La Bastide-d&apos;Engras
              <br />
              À côté de la mairie
            </address>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
              <Clock3 aria-hidden="true" className="h-5 w-5 text-[#9e5218]" />
              Horaires d&apos;ouverture
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Du lundi au samedi, de 9 h à 12 h.
              <br />
              En juillet et août : de 9 h à 11 h.
            </p>
            <a
              href="tel:0466728070"
              className={`mt-4 inline-flex items-center gap-2 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] ${focusRing}`}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              04 66 72 80 70
            </a>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Courrier et colis
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-700">
            Vous pouvez envoyer vos courriers en recommandé, en suivi, en
            Service Plus (2 jours) ou en envoi simple. L&apos;agence propose
            également des enveloppes affranchies (lettre verte, suivi, Service
            Plus et réexpédition), des Colissimo pour la France, l&apos;Europe
            et le monde, des emballages neutres en carton ou à bulles, des
            timbres Marianne ou fantaisie, des pièces à collectionner et des
            cartes postales.
          </p>
          <p className="mt-5 border-l-4 border-stone-200 pl-5 text-base leading-relaxed text-stone-700">
            Vos colis et courriers avisés par le facteur sont conservés à
            l&apos;agence pendant 15 jours. Une tierce personne peut les
            récupérer pour vous en complétant le dos de l&apos;avis de passage.
            Vous pouvez aussi donner gratuitement procuration à un mandataire
            pour une durée de 5 ans, sur le site de La Poste ou dans votre
            agence.
          </p>
          <p className="mt-5 text-base leading-relaxed text-stone-700">
            En cas d&apos;absence, vous pouvez souscrire un contrat de garde ou
            de réexpédition du courrier.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Autres services
          </h2>
          <ul className="mt-5 grid gap-x-10 border-b border-stone-200 sm:grid-cols-2">
            {[
              "Forfaits téléphoniques et forfaits de box internet avec fibre (La Poste Mobile)",
              "Tablettes ARDOIZ avec internet simplifié",
              "Téléassistance pour vos proches",
              "Retraits et dépôts d'argent pour les clients de La Banque Postale",
              "Distribution des sacs jaunes de tri",
              "Points de collecte de bouchons en plastique et de capsules de café pour l'association Treize'or des ti'lions",
              "Collecte des piles, cartouches d'encre et ampoules",
            ].map((service) => (
              <li
                key={service}
                className="border-t border-stone-200 py-4 text-base leading-relaxed text-stone-700"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Horaires des agences postales alentour
          </h2>
          <ul className="mt-5 border-b border-stone-200">
            {agencesVoisines.map((agence) => (
              <li
                key={agence.nom}
                className="flex flex-col gap-1 border-t border-stone-200 py-4 sm:flex-row sm:justify-between sm:gap-6"
              >
                <span className="font-serif text-lg font-semibold text-stone-900">
                  {agence.nom}
                </span>
                <span className="text-base leading-relaxed text-stone-700">
                  {agence.horaires}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}