import {
  FileSpreadsheet,
  FileText,
  Map,
  Phone,
  Recycle,
  Users,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  {
    title: "CNI & Passeport",
    description: "Modalités, pièces à fournir et demandes de rendez-vous.",
    href: "/demarches/cni-passeport",
    icon: FileText,
  },
  {
    title: "Comptes rendus",
    description: "Retrouvez les procès-verbaux des Conseils Municipaux.",
    href: "/mairie/comptes-rendus",
    icon: FileSpreadsheet,
  },
  {
    title: "Urbanisme & PLU",
    description: "Consultez le Plan Local d'Urbanisme et vos démarches.",
    href: "/urbanisme/plu", // Ajuste le lien si nécessaire
    icon: Map,
  },
  {
    title: "Déchets & Tri",
    description: "Calendrier de collecte, consignes de tri et déchèterie.",
    href: "/demarches/dechets-tri",
    icon: Recycle,
  },
  {
    title: "Les Élus",
    description: "Découvrez l'équipe municipale et les commissions.",
    href: "/mairie/elus", // Ajuste le lien si nécessaire
    icon: Users,
  },
  {
    title: "Contact & Horaires",
    description: "Coordonnées de la mairie et horaires d'ouverture.",
    href: "/contact",
    icon: Phone,
  },
];

export default function QuickAccessSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700">
            Services & Démarches
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            Accès rapides
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            Retrouvez rapidement les informations essentielles et vos démarches
            administratives courantes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.title}
                href={link.href}
                className="group rounded-[2rem] border border-stone-200 bg-stone-50 p-8 transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition group-hover:scale-105">
                  <Icon className="h-7 w-7 text-stone-700" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-stone-900">
                  {link.title}
                </h3>

                <p className="mt-3 text-stone-600 text-sm leading-relaxed">
                  {link.description}
                </p>

                <div className="mt-6 flex items-center gap-2 font-medium text-stone-900 text-sm">
                  Y accéder
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
