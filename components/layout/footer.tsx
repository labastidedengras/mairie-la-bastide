import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const focusRing =
  "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d98a4e]";
const linkStyle = `transition-colors hover:text-[#d98a4e] ${focusRing}`;

const hours = [
  { day: "Lundi", time: "14h00 – 16h00" },
  { day: "Mercredi", time: "09h00 – 11h00" },
  { day: "Vendredi", time: "09h00 – 11h00" },
  { day: "Mardi, jeudi et week-end", time: "Fermé" },
];

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Actualités et infos", href: "/actualites" },
  { label: "Associations", href: "/associations" },
  { label: "Contact", href: "/contact" },
];

const emergency = [
  { number: "15", label: "SAMU" },
  { number: "17", label: "Gendarmerie" },
  { number: "18", label: "Sapeurs-pompiers" },
  { number: "112", label: "Appel d'urgence européen" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:pt-20">
        {/* Trois colonnes de largeurs différentes : 5 / 4 / 3 */}
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className={`group inline-flex items-center gap-4 ${focusRing}`}
            >
              <Image
                // À remplacer par le vrai fichier du blason (SVG ou PNG), pas le favicon
                src="/favicon.ico"
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 object-contain"
              />
              <span>
                <span className="block text-base text-stone-400">
                  République française
                </span>
                <span className="block font-serif text-2xl font-semibold text-white transition-colors group-hover:text-[#d98a4e]">
                  Mairie de La Bastide d&apos;Engras
                </span>
              </span>
            </Link>

            <address className="mt-10 not-italic">
              <p className="text-base leading-relaxed">
                9 rue des Mouchards
                <br />
                30330 La Bastide-d&apos;Engras
                <br />
                France
              </p>

              <p className="mt-6">
                <a
                  href="tel:0466728145"
                  className={`font-serif text-3xl font-semibold text-white ${linkStyle}`}
                >
                  04 66 72 81 45
                </a>
              </p>

              <p className="mt-3">
                <a
                  href="mailto:la-bastide-dengras@wanadoo.fr"
                  className={`break-words text-base underline decoration-stone-600 underline-offset-4 hover:decoration-[#d98a4e] ${focusRing}`}
                >
                  la-bastide-dengras@wanadoo.fr
                </a>
              </p>
            </address>
          </div>

          <div className="lg:col-span-4">
            <h2 className="font-serif text-xl font-semibold text-white">
              Horaires d&apos;ouverture
            </h2>
            <ul className="mt-5 border-b border-white/10 text-base">
              {hours.map((row) => (
                <li
                  key={row.day}
                  className="flex justify-between gap-6 border-t border-white/10 py-3"
                >
                  <span>{row.day}</span>
                  <span className="text-white">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <nav aria-label="Navigation du pied de page">
              <h2 className="font-serif text-xl font-semibold text-white">
                Le site
              </h2>
              <ul className="mt-5 space-y-3 text-base">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkStyle}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <h2 className="mt-10 font-serif text-xl font-semibold text-white">
              Liens utiles
            </h2>
            <p className="mt-5 text-base">
              <a
                href="https://www.cc-paysduzes.fr"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 ${linkStyle}`}
              >
                Communauté de communes du Pays d&apos;Uzès
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span className="sr-only">(nouvelle fenêtre)</span>
              </a>
            </p>
          </div>
        </div>

        {/* Urgences : un bandeau à part, lisible d'un coup d'œil */}
        <section
          aria-labelledby="urgences"
          className="mt-16 flex flex-col gap-6 border-t border-white/10 py-10 lg:mt-20 lg:flex-row lg:items-baseline lg:justify-between"
        >
          <h2
            id="urgences"
            className="font-serif text-xl font-semibold text-white"
          >
            En cas d&apos;urgence
          </h2>

          <ul className="flex flex-wrap gap-x-10 gap-y-5">
            {emergency.map((item) => (
              <li key={item.number}>
                <a
                  href={`tel:${item.number}`}
                  className={`group flex items-baseline gap-3 ${focusRing}`}
                >
                  <span className="font-serif text-3xl font-semibold text-white transition-colors group-hover:text-[#d98a4e]">
                    {item.number}
                  </span>
                  <span className="text-base">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-base text-stone-400 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} Mairie de La Bastide-d&apos;Engras</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/mentions-legales"
              className={`hover:text-white ${focusRing}`}
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className={`hover:text-white ${focusRing}`}
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/accessibilite"
              className={`hover:text-white ${focusRing}`}
            >
              Accessibilité : non conforme
            </Link>

            <a
              href="https://bastienandredev.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-white ${focusRing}`}
            >
              Site réalisé par Bastien ANDRE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
