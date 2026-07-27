import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité | Mairie de La Bastide d'Engras",
  description:
    "Déclaration d'accessibilité du site de la Mairie de La Bastide d'Engras, conforme au RGAA.",
};

const NOM_SITE = "mairie-la-bastide-dengras.fr";
const EMAIL_CONTACT = "la-bastide-dengras@wanadoo.fr";
const ADRESSE_MAIRIE = "9 rue des Mouchards, 30330 La Bastide-d'Engras";
const TELEPHONE_MAIRIE = "04 66 72 81 45";
const DATE_DECLARATION = "27 juillet 2026";

export default function AccessibilitePage() {
  return (
    <><div className="w-full h-[84px] bg-stone-900 shrink-0" />
    <main className="mx-auto max-w-3xl px-6 py-16 text-stone-800">
      <p className="mb-12 text-sm text-stone-500">
        <Link
          href="/"
          className="underline underline-offset-2 hover:text-stone-700"
        >
          ← Retour à l&apos;accueil
        </Link>
      </p>
      <p className="mb-2 text-sm uppercase tracking-wide text-orange-600">
        Informations légales
      </p>
      <h1 className="mb-8 font-serif text-4xl text-stone-900">
        Déclaration d&apos;accessibilité
      </h1>

      <p className="mb-6 leading-relaxed">
        La Mairie de La Bastide d&apos;Engras s&apos;engage à rendre son site
        internet accessible conformément à l&apos;article 47 de la loi n°
        2005-102 du 11 février 2005 pour l&apos;égalité des droits et des
        chances, la participation et la citoyenneté des personnes handicapées.
      </p>

      <p className="mb-10 leading-relaxed">
        Cette déclaration d&apos;accessibilité s&apos;applique au site{" "}
        <strong>{NOM_SITE}</strong>.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 font-serif text-2xl text-stone-900">
          État de conformité
        </h2>
        <p className="leading-relaxed">
          Le site <strong>{NOM_SITE}</strong> est <strong>non conforme</strong>{" "}
          au RGAA (Référentiel Général d&apos;Amélioration de
          l&apos;Accessibilité). Le site n&apos;a pas encore fait l&apos;objet
          d&apos;un audit de conformité complet. Un audit ainsi qu&apos;un plan
          de mise en conformité seront réalisés prochainement.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-serif text-2xl text-stone-900">
          Résultats des tests
        </h2>
        <p className="leading-relaxed">
          L&apos;audit de conformité n&apos;a pas encore été réalisé. Un taux de
          conformité global sera publié ici dès qu&apos;un audit conforme à la
          méthode technique du RGAA aura été effectué.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-serif text-2xl text-stone-900">
          Contenus non accessibles
        </h2>
        <p className="mb-3 leading-relaxed">
          Les contenus listés ci-dessous ne sont pas encore pleinement
          accessibles, en attendant l&apos;audit complet et les corrections
          associées :
        </p>
        <ul className="list-inside list-disc space-y-2 leading-relaxed">
          <li>
            Certains documents PDF joints aux actualités peuvent ne pas être
            nativement accessibles (absence de structure ou de balises pour
            lecteurs d&apos;écran).
          </li>
          <li>
            Certaines images publiées peuvent être dépourvues de texte
            alternatif (« alt ») descriptif.
          </li>
          <li>
            Les contrastes de couleurs de certains éléments visuels n&apos;ont
            pas encore été formellement vérifiés selon les critères du RGAA.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-serif text-2xl text-stone-900">
          Établissement de cette déclaration
        </h2>
        <p className="mb-3 leading-relaxed">
          Cette déclaration a été établie le {DATE_DECLARATION}.
        </p>
        <h3 className="mb-2 mt-4 font-medium text-stone-900">
          Technologies utilisées
        </h3>
        <ul className="list-inside list-disc space-y-1 leading-relaxed">
          <li>HTML5</li>
          <li>CSS3</li>
          <li>JavaScript</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-serif text-2xl text-stone-900">
          Retour d&apos;information et contact
        </h2>
        <p className="mb-3 leading-relaxed">
          Si vous n&apos;arrivez pas à accéder à un contenu ou à un service,
          vous pouvez contacter le responsable du site pour être orienté vers
          une alternative accessible ou obtenir le contenu sous une autre forme.
        </p>
        <ul className="list-inside list-disc space-y-1 leading-relaxed">
          <li>
            E-mail :{" "}
            <a
              href={`mailto:${EMAIL_CONTACT}`}
              className="text-orange-600 underline underline-offset-2 hover:text-orange-700"
            >
              {EMAIL_CONTACT}
            </a>
          </li>
          <li>
            Téléphone :{" "}
            <a
              href={`tel:${TELEPHONE_MAIRIE.replace(/\s/g, "")}`}
              className="text-orange-600 underline underline-offset-2 hover:text-orange-700"
            >
              {TELEPHONE_MAIRIE}
            </a>
          </li>
          <li>Adresse : {ADRESSE_MAIRIE}</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="mb-3 font-serif text-2xl text-stone-900">
          Voies de recours
        </h2>
        <p className="mb-3 leading-relaxed">
          Si vous constatez un défaut d&apos;accessibilité vous empêchant
          d&apos;accéder à un contenu ou à une fonctionnalité du site, et que
          vous nous en faites part sans obtenir de réponse satisfaisante de
          notre part, vous êtes en droit de faire parvenir vos doléances ou une
          demande de saisine au Défenseur des droits.
        </p>
        <p className="mb-2 leading-relaxed">
          Plusieurs moyens sont possibles :
        </p>
        <ul className="list-inside list-disc space-y-1 leading-relaxed">
          <li>
            <a
              href="https://formulaire.defenseurdesdroits.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline underline-offset-2 hover:text-orange-700"
            >
              Écrire un message au Défenseur des droits
            </a>
          </li>
          <li>
            Contacter le délégué du Défenseur des droits dans votre région
          </li>
          <li>
            Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre)
            : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07
          </li>
        </ul>
      </section>
    </main>
    </>
  );
}
