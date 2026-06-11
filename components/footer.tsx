export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white/70">
      {/* Séparateur décoratif */}
      <div className="mx-auto max-w-6xl px-8">
        <div className="flex items-center gap-4 py-10">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/30">
            La Bastide d&apos;Engras
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-8 pb-16 md:grid-cols-3">
        {/* Colonne 1 — Mairie & Coordonnées */}
        <div>
          <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">
            Mairie
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="leading-relaxed">
              9 rue des Mouchards
              <br />
              30330 La Bastide-d&apos;Engras
              <br />
              France
            </li>
            <li className="pt-2">
              <a
                href="tel:0466728145"
                className="transition-colors hover:text-white"
              >
                04 66 72 81 45
              </a>
            </li>
            <li>
              <a
                href="mailto:la-bastide-dengras@wanadoo.fr"
                className="transition-colors hover:text-white break-all"
              >
                la-bastide-dengras@wanadoo.fr
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 2 — Horaires Réels */}
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

        {/* Colonne 3 — Liens utiles */}
        <div>
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
                <a
                  href={item.href}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <span className="h-px w-3 bg-[#8a7a5a]" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-8 py-6 text-xs text-white/25 sm:flex-row">
          <span>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://labastide-dengras.fr/"
              className="hover:underline hover:text-white/40 transition-colors"
            >
              Mairie de La Bastide-d&apos;Engras
            </a>
          </span>
          <div className="flex items-center gap-6">
            <a
              href="/mentions-legales"
              className="transition-colors hover:text-white/50"
            >
              Mentions légales
            </a>
            <a
              href="/politique-de-confidentialite"
              className="transition-colors hover:text-white/50"
            >
              Politique de confidentialité
            </a>
            <span className="h-3 w-px bg-white/10" />
            <span>
              Site réalisé par{" "}
              <a
                href="#"
                className="text-white/40 transition-colors hover:text-white/70"
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
