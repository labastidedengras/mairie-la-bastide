import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const documents = [
  {
    title: "Dernier conseil municipal",
    description:
      "Le compte rendu de la dernière séance, au format réglementaire.",
    href: "/mairie/comptes-rendus",
  },
  {
    title: "Actes et arrêtés",
    description:
      "Les arrêtés municipaux et préfectoraux en vigueur sur la commune.",
    href: "/mairie/bulletin-municipal",
  },
];

export default function MunicipalLifeSection() {
  return (
    <section className="border-t border-stone-100 bg-stone-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Gauche : le titre en haut, les documents calés en bas,
              pour s'aligner sur le bas de la couverture */}
          <div className="flex flex-col justify-between gap-12 lg:col-span-7">
            <div>
              <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">
                Publications et décisions officielles
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-600">
                Comptes rendus, arrêtés et bulletin : les documents officiels de
                la commune.
              </p>
            </div>

            <ul className="border-b border-stone-300/70">
              {documents.map((doc) => (
                <li key={doc.title} className="border-t border-stone-300/70">
                  <Link
                    href={doc.href}
                    className="group flex items-start justify-between gap-6 py-7"
                  >
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-stone-900 transition-colors group-hover:text-[#9e5218]">
                        {doc.title}
                      </h3>
                      <p className="mt-2 max-w-md text-base leading-relaxed text-stone-600">
                        {doc.description}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-stone-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9e5218]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Droite : le bulletin, avec sa vraie couverture */}
          <div className="lg:col-span-5">
            <Image
              // À exporter depuis la première page du PDF
              src="/images/apercu-bulletin.jpg"
              alt="Couverture du bulletin municipal, édition été 2026"
              width={600}
              height={800}
              sizes="(min-width: 1024px) 24rem, 20rem"
              className="h-auto w-full max-w-xs border border-stone-200 sm:max-w-sm"
            />

            <h3 className="mt-8 font-serif text-2xl font-semibold text-stone-900">
              Bulletin municipal
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-stone-600">
              Les travaux en cours, le budget communal, les projets
              d&apos;urbanisme et l&apos;agenda des animations de l&apos;été.
            </p>

            <a
              href="/documents/bulletin-municipal-latest.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#9e5218] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#854311]"
            >
              <Download className="h-4 w-4" />
              Télécharger le PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
