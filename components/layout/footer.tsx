import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white/70">
      {/* Séparateur décoratif */}
      <div className="mx-auto max-w-6xl px-8">
        <div className="flex items-center gap-4 py-10">
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-serif text-xs uppercase tracking-[0.3em] text-white/30">
            La Bastide d&apos;Engras
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      {/* Contenu principal (grille sur 4 colonnes alignées en haut) */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-8 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Colonne 1 — Mairie & Coordonnées */}
        <div>
          <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">
            Mairie
          </h3>
          <address className="space-y-3 text-sm not-italic">
            <p className="leading-relaxed">
              9 rue des Mouchards
              <br />
              30330 La Bastide-d&apos;Engras
              <br />
              France
            </p>
            <p className="pt-2">
              <a
                href="tel:0466728145"
                className="rounded-sm transition-colors hover:text-[#d98a4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
              >
                04 66 72 81 45
              </a>
            </p>
            <p>
              <a
                href="mailto:la-bastide-dengras@wanadoo.fr"
                className="break-all rounded-sm transition-colors hover:text-[#d98a4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
              >
                la-bastide-dengras@wanadoo.fr
              </a>
            </p>
          </address>
        </div>

        {/* Colonne 2 — Horaires */}
        <div>
          <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">
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
            <li className="flex justify-between gap-4 text-white/30 italic">
              <span>Mardi / Jeudi</span>
              <span>Fermé</span>
            </li>
            <li className="flex justify-between gap-4 text-white/30 italic">
              <span>Week-end</span>
              <span>Fermé</span>
            </li>
          </ul>
        </div>

        {/* Colonne 3 — Navigation */}
        <nav aria-label="Navigation du pied de page">
          <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">
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

        {/* Colonne 4 — Intercommunalité & Numéros d'urgence */}
        <div>
          <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">
            Informations utiles
          </h3>

          {/* Intercommunalité */}
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

          {/* Numéros d'urgence */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-white/50">
              Urgences
            </span>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center justify-between border-b border-white/5 pb-1">
                <span>SAMU</span>
                <a
                  href="tel:15"
                  className="font-mono text-white/80 transition-colors hover:text-[#d98a4e]"
                >
                  15
                </a>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1">
                <span>Gendarmerie</span>
                <a
                  href="tel:17"
                  className="font-mono text-white/80 transition-colors hover:text-[#d98a4e]"
                >
                  17
                </a>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1">
                <span>Sapeurs-Pompiers</span>
                <a
                  href="tel:18"
                  className="font-mono text-white/80 transition-colors hover:text-[#d98a4e]"
                >
                  18
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>Appel d&apos;urgence européen</span>
                <a
                  href="tel:112"
                  className="font-mono text-white/80 transition-colors hover:text-[#d98a4e]"
                >
                  112
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-8 py-6 text-xs text-white/50 sm:flex-row">
          <span>
            © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d]"
            >
              Mairie de La Bastide-d&apos;Engras
            </Link>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6">
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
            <span className="h-3 w-px bg-white/10" aria-hidden="true" />
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