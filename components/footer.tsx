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
        {/* Colonne 1 — Mairie */}
        <div>
          <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">
            Mairie
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              Place de la Mairie
              <br />
              30330 La Bastide d&apos;Engras
            </li>
            <li>
              <a
                href="tel:+33466000000"
                className="transition-colors hover:text-white"
              >
                04 66 00 00 00
              </a>
            </li>
            <li>
              <a
                href="mailto:mairie@labastidedengras.fr"
                className="transition-colors hover:text-white"
              >
                mairie@labastidedengras.fr
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 2 — Horaires */}
        <div>
          <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">
            Horaires d&apos;ouverture
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between gap-8">
              <span>Lundi – Vendredi</span>
              <span className="text-white/50">9h – 12h</span>
            </li>
            <li className="flex justify-between gap-8">
              <span>Mercredi</span>
              <span className="text-white/50">9h – 12h · 14h – 17h</span>
            </li>
            <li className="flex justify-between gap-8">
              <span>Samedi – Dimanche</span>
              <span className="text-white/50">Fermé</span>
            </li>
          </ul>
        </div>

        {/* Colonne 3 — Navigation */}
        <div>
          <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">
            Navigation
          </h3>
          <ul className="space-y-3 text-sm">
            {["Actualités", "Événements", "Documents & Formulaires"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <span className="h-px w-4 bg-[#8a7a5a]" />
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-8 py-6 text-xs text-white/25 sm:flex-row">
          <span>© {new Date().getFullYear()} La Bastide d&apos;Engras</span>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white/50">
              Mentions légales
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
