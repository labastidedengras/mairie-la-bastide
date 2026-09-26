import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white/70">
      <div className="mx-auto max-w-6xl px-8">
        <div className="flex items-center gap-4 py-12">
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-serif text-xs uppercase tracking-[0.3em] text-white/30">
            La Bastide d&apos;Engras
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-y-10 px-6 pb-20 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0 lg:px-8">
        <div className="lg:px-4">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#d98a4e]">
            Mairie
          </h3>
          <div className="mb-5 flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-3 transition-all duration-200"
              aria-label="Retour à l'accueil — Mairie de La Bastide d'Engras"
            >
              <div className="relative h-9 w-9 shrink-0 sm:h-10 sm:w-10 transition-transform duration-300 group-hover:scale-102">
                <Image
                  src="/favicon.ico"
                  alt="Blason officiel de la commune de La Bastide d'Engras"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col justify-center leading-tight">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 sm:text-[10px]">
                  République Française
                </span>

                <h1 className="font-serif text-base font-bold text-white transition-colors group-hover:text-[#d98a4e]">
                  Mairie de La Bastide d&apos;Engras
                </h1>
              </div>
            </Link>
          </div>
          <address className="space-y-4 text-sm not-italic">
            <p className="flex items-start gap-3 leading-relaxed">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#d98a4e]"
              />
              <span>
                9 rue des Mouchards
                <br />
                30330 La Bastide-d&apos;Engras
                <br />
                France
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#d98a4e]"
              />
              <a
                href="tel:0466728145"
                className="rounded-sm transition-colors hover:text-[#d98a4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
              >
                04 66 72 81 45
              </a>
            </p>
            <p className="flex items-start gap-3">
              <Mail
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#d98a4e]"
              />
              <a
                href="mailto:la-bastide-dengras@wanadoo.fr"
                className="whitespace-nowrap rounded-sm text-xs transition-colors hover:text-[#d98a4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
              >
                la-bastide-dengras@wanadoo.fr
              </a>
            </p>
          </address>
        </div>

        <div className="sm:border-l sm:border-white/10 sm:pl-6 lg:px-4">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#d98a4e]">
            Horaires d&apos;ouverture
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex justify-between gap-4 border-b border-white/5 pb-2">
              <span>Lundi</span>
              <span className="text-white/50">14h00 – 16h00</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-white/5 pb-2">
              <span>Mercredi</span>
              <span className="text-white/50">09h00 – 11h00</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-white/5 pb-2">
              <span>Vendredi</span>
              <span className="text-white/50">09h00 – 11h00</span>
            </li>
            <li className="flex justify-between gap-4 text-white/50">
              <span>Mardi / Jeudi</span>
              <span className="text-white/70">Fermé</span>
            </li>
            <li className="flex justify-between gap-4 text-white/50">
              <span>Week-end</span>
              <span className="text-white/70">Fermé</span>
            </li>
          </ul>
        </div>

        <nav
          aria-label="Navigation du pied de page"
          className="lg:border-l lg:border-white/10 lg:px-4"
        >
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#d98a4e]">
            Navigation
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Accueil", href: "/" },
              { label: "Actualités & Infos", href: "/actualites" },
              { label: "Associations", href: "/associations" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 rounded-sm transition-colors hover:text-[#d98a4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
                >
                  <span className="h-px w-3 bg-[#b5651d]" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:border-l sm:border-white/10 sm:pl-6 lg:px-4">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#d98a4e]">
            Informations utiles
          </h3>

          <div className="mb-6 space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-white/50">
              Intercommunalité
            </span>
            <a
              href="https://www.cc-paysduzes.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-colors hover:text-[#d98a4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
            >
              <span className="h-px w-3 bg-[#b5651d]" />
              CC Pays d&apos;Uzès
            </a>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-white/50">
              Urgences
            </span>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center justify-between border-b border-white/5 pb-1">
                <span>SAMU</span>
                <a
                  href="tel:15"
                  className="rounded-sm border border-[#d98a4e]/30 bg-[#d98a4e]/10 px-2 py-0.5 font-mono text-sm font-semibold text-white transition-colors hover:bg-[#d98a4e]/20 hover:text-[#f0ad78]"
                >
                  15
                </a>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1">
                <span>Gendarmerie</span>
                <a
                  href="tel:17"
                  className="rounded-sm border border-[#d98a4e]/30 bg-[#d98a4e]/10 px-2 py-0.5 font-mono text-sm font-semibold text-white transition-colors hover:bg-[#d98a4e]/20 hover:text-[#f0ad78]"
                >
                  17
                </a>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1">
                <span>Sapeurs-Pompiers</span>
                <a
                  href="tel:18"
                  className="rounded-sm border border-[#d98a4e]/30 bg-[#d98a4e]/10 px-2 py-0.5 font-mono text-sm font-semibold text-white transition-colors hover:bg-[#d98a4e]/20 hover:text-[#f0ad78]"
                >
                  18
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>Appel d&apos;urgence européen</span>
                <a
                  href="tel:112"
                  className="rounded-sm border border-[#d98a4e]/30 bg-[#d98a4e]/10 px-2 py-0.5 font-mono text-sm font-semibold text-white transition-colors hover:bg-[#d98a4e]/20 hover:text-[#f0ad78]"
                >
                  112
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-7 text-center text-xs text-white/50">
          <span>
            © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
            >
              Mairie de La Bastide-d&apos;Engras
            </Link>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              href="/mentions-legales"
              className="rounded-sm transition-colors hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="rounded-sm transition-colors hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/accessibilite"
              className="rounded-sm transition-colors hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
            >
              Accessibilité : non conforme
            </Link>
            <span
              className="hidden h-3 w-px bg-white/10 sm:block"
              aria-hidden="true"
            />
            <span>
              Site réalisé par{" "}
              <a
                href="https://votre-site-portfolio.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm transition-colors hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
              >
                Bastien ANDRE
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
