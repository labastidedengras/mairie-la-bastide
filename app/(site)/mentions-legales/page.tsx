export default function MentionsLegales() {
  return (
    <>
      <div className="w-full h-[84px] bg-stone-900 shrink-0" />
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 text-slate-800">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 border-b pb-4 text-slate-900">
          Mentions Légales
        </h1>

        <p className="mb-6 text-sm text-slate-600 italic">
          Conformément aux dispositions de l&apos;article 6 de la loi n°
          2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
          numérique (LCEN).
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-slate-900">
            1. Éditeur du site
          </h2>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="font-medium">Mairie de La Bastide d&apos;Engras</p>
            <p>9 rue des Mouchards</p>
            <p>30330 La Bastide d&apos;Engras</p>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold">SIRET :</span> 213 000 318 00047
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">Téléphone :</span> 04 66 72 81 45
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">Email :</span>{" "}
              la-bastide-dengras@wanadoo.fr
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-slate-900">
            2. Directeur de la publication
          </h2>
          <p>Le Maire en exercice de la commune de La Bastide d&apos;Engras.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-slate-900">
            3. Hébergement du site
          </h2>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="font-medium">Vercel Inc.</p>
            <p>440 N Barranca Ave #4133</p>
            <p>Covina, CA 91723</p>
            <p>États-Unis</p>
            <p className="mt-2 text-sm">
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://vercel.com
              </a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-slate-900">
            4. Accessibilité (RGAA)
          </h2>
          <p className="text-justify leading-relaxed">
            La mairie de La Bastide d&apos;Engras s&apos;efforce de rendre son
            site internet accessible à tous les citoyens, conformément à
            l&apos;article 47 de la loi n° 2005-102 du 11 février 2005. Des
            améliorations continues sont apportées pour respecter au mieux les
            critères du Référentiel Général d&apos;Amélioration de
            l&apos;Accessibilité (RGAA).
          </p>
        </section>
      </div>
    </>
  );
}
