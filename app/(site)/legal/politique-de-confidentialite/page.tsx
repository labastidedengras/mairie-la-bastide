import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité & RGPD",
  description:
    "Engagement de la mairie de La Bastide d'Engras sur la protection des données personnelles, l'utilisation des formulaires et vos droits d'accès au titre du RGPD.",
};

export default function PolitiqueConfidentialite() {
  return (
    <>
      <div className="w-full h-[84px] bg-stone-900 shrink-0" />
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 text-stone-700">
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-8 border-b border-stone-200 pb-4 text-stone-900">
          Politique de Confidentialité
        </h1>

        <p className="mb-6 leading-relaxed">
          La mairie de La Bastide d&apos;Engras s&apos;engage à ce que la
          collecte et le traitement de vos données, effectués à partir du site
          internet officiel, soient conformes au règlement général sur la
          protection des données (RGPD) et à la loi Informatique et Libertés.
        </p>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-medium mb-3 text-stone-900">
            1. Collecte et finalité des données
          </h2>
          <p className="leading-relaxed text-justify mb-3">
            Le site internet de la commune est purement informatif. La seule
            collecte de données à caractère personnel s&apos;effectue via le{" "}
            <strong>formulaire de contact</strong>.
          </p>
          <p className="leading-relaxed text-justify">
            Les informations recueillies (Nom, adresse e-mail, contenu de votre
            message) font l&apos;objet d&apos;un traitement informatique
            exclusivement destiné à permettre aux services de la mairie de
            répondre à vos demandes d&apos;information ou de traitement
            administratif.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-medium mb-3 text-stone-900">
            2. Durée de conservation
          </h2>
          <p className="leading-relaxed text-justify">
            Les données personnelles transmises via le formulaire de contact
            sont conservées uniquement pendant le temps nécessaire au traitement
            de votre demande, et pour une durée maximale de{" "}
            <strong>3 ans</strong> à compter de leur réception.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-medium mb-3 text-stone-900">
            3. Non-transmission des données
          </h2>
          <p className="leading-relaxed text-justify">
            Vos données restent strictement confidentielles. Elles sont
            uniquement consultées par le personnel habilité de la mairie et les
            élus de la commune de La Bastide d&apos;Engras. Elles ne sont en
            aucun cas vendues, cédées ou transmises à des tiers ou à des
            organismes commerciaux.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-medium mb-3 text-stone-900">
            4. Vos Droits (RGPD)
          </h2>
          <p className="leading-relaxed text-justify mb-4">
            Conformément à la réglementation européenne, vous disposez d&apos;un
            droit d&apos;accès, de rectification, de modification,
            d&apos;effacement ou de limitation du traitement de vos données
            personnelles.
          </p>
          <p className="leading-relaxed text-justify">
            Vous pouvez exercer ces droits à tout moment en envoyant un e-mail à
            l&apos;adresse officielle de la mairie ou un courrier postal signé,
            accompagné d&apos;une copie de votre pièce d&apos;identité, aux
            coordonnées indiquées sur notre page des mentions légales.
          </p>
        </section>
      </div>
    </>
  );
}
