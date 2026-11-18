import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité de la mairie de La Bastide-d'Engras : collecte des données, cookies, cartes Google Maps et droits RGPD.",
};

export default function PolitiqueConfidentialite() {
  return (
    <>
      <div className="h-[84px] w-full shrink-0 bg-stone-900" />
      <div className="mx-auto max-w-4xl px-4 py-12 text-stone-700 md:py-20">
        <h1 className="mb-8 border-b border-stone-200 pb-4 font-serif text-3xl font-medium text-stone-900 md:text-4xl">
          Politique de Confidentialité
        </h1>

        <p className="mb-6 leading-relaxed">
          La mairie de La Bastide-d&apos;Engras s&apos;engage à ce que la
          collecte et le traitement de vos données, effectués à partir du site
          internet officiel, soient conformes au Règlement Général sur la
          Protection des Données (RGPD) et à la loi Informatique et Libertés.
        </p>

        <section className="mb-8">
          <h2 className="mb-3 font-serif text-xl font-medium text-stone-900">
            1. Collecte et finalité des données
          </h2>
          <p className="mb-3 leading-relaxed">
            Le site internet de la commune est principalement informatif. La
            collecte de données à caractère personnel s&apos;effectue uniquement
            via les formulaires présents sur le site (
            <strong>formulaire de contact</strong> et{" "}
            <strong>formulaire de réservation</strong>).
          </p>
          <p className="leading-relaxed">
            Les informations recueillies (nom, prénom, adresse e-mail, numéro de
            téléphone, contenu de votre message ou détails de réservation) font
            l&apos;objet d&apos;un traitement informatique exclusivement destiné
            à permettre aux services de la mairie de répondre à vos demandes
            d&apos;information, de gérer vos réservations (foyer communal,
            salles) ou d&apos;assurer un suivi administratif.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 font-serif text-xl font-medium text-stone-900">
            2. Durée de conservation
          </h2>
          <p className="leading-relaxed">
            Les données personnelles transmises via nos formulaires sont
            conservées uniquement pendant le temps nécessaire au traitement de
            votre demande, et pour une durée maximale de <strong>3 ans</strong>{" "}
            à compter de leur réception (ou du dernier contact avec vous).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 font-serif text-xl font-medium text-stone-900">
            3. Non-transmission des données
          </h2>
          <p className="leading-relaxed">
            Vos données restent strictement confidentielles. Elles sont
            uniquement consultées par le personnel habilité de la mairie et les
            élus de la commune de La Bastide-d&apos;Engras. Elles ne sont en
            aucun cas vendues, cédées ou transmises à des tiers ou à des
            organismes commerciaux.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 font-serif text-xl font-medium text-stone-900">
            4. Cookies et services tiers (Cartes interactives)
          </h2>
          <p className="leading-relaxed">
            Ce site n&apos;utilise aucun cookie publicitaire ni outil de suivi
            statistique. Pour vous permettre de localiser les équipements
            communaux, certaines pages intègrent des cartes interactives
            fournies par <strong>Google Maps</strong>. Afin de protéger votre
            vie privée, le chargement de ces cartes est bloqué par défaut.
            Aucune donnée (telle que votre adresse IP) n&apos;est transmise à
            Google tant que vous n&apos;avez pas explicitement cliqué sur le
            bouton « Afficher la carte ». Une fois activé, votre choix est
            mémorisé localement sur votre navigateur afin de faciliter votre
            navigation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 font-serif text-xl font-medium text-stone-900">
            5. Vos Droits (RGPD)
          </h2>
          <p className="mb-4 leading-relaxed">
            Conformément à la réglementation européenne, vous disposez d&apos;un
            droit d&apos;accès, de rectification, de modification,
            d&apos;effacement ou de limitation du traitement de vos données
            personnelles.
          </p>
          <p className="leading-relaxed">
            Vous pouvez exercer ces droits à tout moment en envoyant un e-mail à
            l&apos;adresse officielle de la mairie (
            <a
              href="mailto:commune-de-la-bastide-dengras7@orange.fr"
              className="underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218]"
            >
              commune-de-la-bastide-dengras7@orange.fr
            </a>
            ) ou un courrier postal à l&apos;adresse suivante : Mairie de La
            Bastide-d&apos;Engras, 9 rue des Mouchards, 30330 La
            Bastide-d&apos;Engras. En cas de doute raisonnable sur votre
            identité, un justificatif pourra vous être demandé. Vous disposez
            également du droit d&apos;introduire une réclamation auprès de la{" "}
            <a
              href="https://www.cnil.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218]"
            >
              CNIL
              <span className="sr-only"> (nouvelle fenêtre)</span>
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
