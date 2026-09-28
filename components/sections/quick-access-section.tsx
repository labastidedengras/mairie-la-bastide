import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";

// La mairie ne délivre pas les CNI / passeports : on explique et on redirige.
const featured = {
  title: "CNI & Passeport",
  description:
    "Ces titres ne sont pas délivrés par la mairie. Retrouvez les pièces à fournir et la mairie où déposer votre demande.",
  cta: "Voir où faire ma demande",
  // Si le lien mène vers le site d'une autre mairie, ajouter target="_blank"
  href: "/vie-pratique/cni-passeport",
};

// Les autres : simples lignes, sans carte ni icône.
const links = [
  {
    title: "Comptes rendus",
    description: "Les procès-verbaux des Conseils Municipaux.",
    href: "/mairie/comptes-rendus",
  },
  {
    title: "Urbanisme & PLU",
    description: "Consulter le PLU et préparer un dossier.",
    href: "/vie-pratique/plu",
  },
  {
    title: "Déchets & Tri",
    description: "Calendrier de collecte, consignes de tri, déchèterie.",
    href: "/vie-pratique/dechets-tri",
  },
  {
    title: "Salle polyvalente",
    description: "Tarifs, disponibilités et demande de réservation.",
    href: "/vie-pratique/salle-polyvalente",
  },
  {
    title: "Contact & Horaires",
    description: "Coordonnées du secrétariat et jours d'ouverture.",
    href: "/contact",
  },
];

export default function QuickAccessSection() {
  return (
    <section
      id="demarches"
      className="border-b border-stone-100 bg-white py-20 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Colonne gauche : titre aligné à gauche, collé en haut au scroll */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">
                Vos démarches
              </h2>

              <p className="mt-4 max-w-sm text-base leading-relaxed text-stone-600">
                Les informations utiles au quotidien, et où s&apos;adresser
                quand la mairie n&apos;est pas compétente.
              </p>

              <a
                href="tel:0466728145"
                className="mt-8 inline-flex items-center gap-2 text-base text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218]"
              >
                <Phone className="h-4 w-4 stroke-[1.5]" />
                04 66 72 81 45
              </a>
            </div>
          </div>

          {/* Colonne droite : 1 grosse entrée + une liste */}
          <div className="lg:col-span-8">
            <Link
              href={featured.href}
              className="group flex  flex-col justify-between gap-12 rounded-sm bg-[#9e5218] p-8 text-white transition-colors hover:bg-[#8c4c13] lg:p-10"
            >
              <div>
                <h3 className="font-serif text-3xl font-semibold lg:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-white/90">
                  {featured.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold">
                  {featured.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            <ul className="mt-14 grid border-b border-stone-200 sm:grid-cols-2 sm:gap-x-14">
              {links.map((link) => (
                <li key={link.href} className="border-t border-stone-200">
                  <Link
                    href={link.href}
                    className="group flex items-start justify-between gap-6 py-6"
                  >
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-stone-900 transition-colors group-hover:text-[#9e5218]">
                        {link.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-stone-600">
                        {link.description}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-stone-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9e5218]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
