import Link from "next/link";
import {
  FileText,
  CalendarDays,
  Building2,
  School,
  Recycle,
  Phone,
} from "lucide-react";

const quickLinks = [
  {
    title: "Démarches",
    description: "Documents administratifs et demandes en ligne",
    href: "/demarches",
    icon: FileText,
  },
  {
    title: "Agenda",
    description: "Événements, fêtes et vie associative",
    href: "/agenda",
    icon: CalendarDays,
  },
  {
    title: "Vie municipale",
    description: "Conseil municipal, comptes rendus et projets",
    href: "/municipalite",
    icon: Building2,
  },
  {
    title: "École & Jeunesse",
    description: "Informations scolaires et périscolaires",
    href: "/ecole",
    icon: School,
  },
  {
    title: "Déchets & Collecte",
    description: "Calendrier de collecte et informations utiles",
    href: "/dechets",
    icon: Recycle,
  },
  {
    title: "Contacts utiles",
    description: "Mairie, urgences et services locaux",
    href: "/contacts",
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
            Services & Informations
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            Accès rapides
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            Retrouvez rapidement les informations et services essentiels du
            village.
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

                <p className="mt-3 text-stone-600">{link.description}</p>

                <div className="mt-6 flex items-center gap-2 font-medium text-stone-900">
                  En savoir plus
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
