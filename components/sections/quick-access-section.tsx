"use client";

import {
  ArrowRight,
  Building2,
  FileSpreadsheet,
  FileText,
  Map,
  Phone,
  Recycle,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  {
    title: "CNI & Passeport",
    description:
      "Modalités, pièces à fournir et demandes de rendez-vous en ligne.",
    href: "/vie-pratique/cni-passeport",
    icon: FileText,
    accent: "#9e5218",
  },
  {
    title: "Comptes rendus",
    description:
      "Retrouvez les procès-verbaux officiels des Conseils Municipaux.",
    href: "/mairie/comptes-rendus",
    icon: FileSpreadsheet,
    accent: "#6b5b4d",
  },
  {
    title: "Urbanisme & PLU",
    description:
      "Consultez le Plan Local d'Urbanisme et préparez vos démarches.",
    href: "/vie-pratique/plu",
    icon: Map,
    accent: "#2c5234",
  },
  {
    title: "Déchets & Tri",
    description:
      "Calendrier de collecte, consignes de tri et accès à la déchèterie.",
    href: "/vie-pratique/dechets-tri",
    icon: Recycle,
    accent: "#5c6b47",
  },
  {
    title: "Salle polyvalente",
    description: "Tarifs, disponibilités et dépôt de demande de réservation.",
    href: "/vie-pratique/salle-polyvalente",
    icon: Building2,
    accent: "#8c4c13",
  },
  {
    title: "Contact & Horaires",
    description:
      "Coordonnées du secrétariat et horaires d'ouverture au public.",
    href: "/contact",
    icon: Phone,
    accent: "#1e3a5f",
  },
];

export default function QuickAccessSection() {
  return (
    <section className="bg-white py-24 border-b border-stone-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#9e5218]/40" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9e5218]">
              Services &amp; Démarches
            </span>
            <span className="h-px w-8 bg-[#9e5218]/40" />
          </div>

          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">
            Accès rapides
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-stone-500 md:text-base">
            Retrouvez rapidement les informations essentielles et vos démarches
            administratives courantes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.title}
                href={link.href}
                style={{ borderTopColor: link.accent }}
                className="group relative flex flex-col justify-between border-t-[3px] rounded-sm border border-x-stone-200 border-b-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md"
              >
                <div>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded transition-colors"
                    style={{
                      backgroundColor: `${link.accent}10`,
                      color: link.accent,
                    }}
                  >
                    <Icon className="h-5 w-5 stroke-[1.5]" />
                  </div>

                  <h3
                    className="mt-5 font-serif text-xl font-bold text-stone-900 transition-colors"
                    style={
                      { "--hover-color": link.accent } as React.CSSProperties
                    }
                  >
                    <span className="group-hover:text-[var(--hover-color)] transition-colors">
                      {link.title}
                    </span>
                  </h3>

                  <p className="mt-2.5 text-stone-500 text-xs leading-relaxed">
                    {link.description}
                  </p>
                </div>

                <div
                  className="mt-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: link.accent }}
                >
                  <span>Accéder au service</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
