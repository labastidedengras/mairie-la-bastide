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
    href: "/vie-pratique/cni-passeport",
    icon: FileText,
    accent: "#b5651d", // terracotta — administratif
  },
  {
    title: "Comptes rendus",
    description: "Retrouvez les procès-verbaux des Conseils Municipaux.",
    href: "/mairie/comptes-rendus",
    icon: FileSpreadsheet,
    accent: "#b5651d",
  },
  {
    title: "Urbanisme & PLU",
    description: "Consultez le Plan Local d'Urbanisme et vos démarches.",
    href: "/vie-pratique/plu",
    icon: Map,
    accent: "#b5651d",
  },
  {
    title: "Déchets & Tri",
    description: "Calendrier de collecte, consignes de tri et déchèterie.",
    href: "/vie-pratique/dechets-tri",
    icon: Recycle,
    accent: "#5c6b47", // vert garrigue — cadre de vie
  },
  {
    title: "Les Élus",
    description: "Découvrez l'équipe municipale et les commissions.",
    href: "/mairie/elus",
    icon: Users,
    accent: "#6b5b4d", // brun pierre — civique
  },
  {
    title: "Contact & Horaires",
    description: "Coordonnées de la mairie et horaires d'ouverture.",
    href: "/contact",
    icon: Phone,
    accent: "#6b5b4d",
  },
];

export default function QuickAccessSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#b5651d]/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b5651d]">
              Services & Démarches
            </span>
            <span className="h-px w-8 bg-[#b5651d]/40" />
          </div>

          <h2 className="text-4xl font-serif font-semibold tracking-tight text-stone-900 md:text-5xl">
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
                className="group rounded-2xl border border-stone-200 bg-stone-50 p-8 transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:bg-white hover:shadow-lg"
                style={{ borderTopWidth: "3px", borderTopColor: link.accent }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl shadow-sm ring-1 ring-stone-200 transition group-hover:scale-105"
                  style={{ backgroundColor: `${link.accent}15` }}
                >
                  <Icon className="h-7 w-7" style={{ color: link.accent }} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-stone-900">
                  {link.title}
                </h3>

                <p className="mt-3 text-stone-600 text-sm leading-relaxed">
                  {link.description}
                </p>

                <div
                  className="mt-6 flex items-center gap-2 font-medium text-sm"
                  style={{ color: link.accent }}
                >
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
