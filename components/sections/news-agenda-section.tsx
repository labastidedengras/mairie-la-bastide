import ActualiteCard from "@/components/features/actualites/actualite-card";
import { client } from "@/sanity/lib/client";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import Link from "next/link";

// (Tes interfaces Actualite et Evenement restent identiques)
interface Actualite {
  titre: string;
  slug: string;
  date: string;
  categorie: string;
  imageUrl: string | null;
  contenu: string | null;
}

interface Evenement {
  title: string;
  slug: string;
  dateDebut: string;
  dateFin: string | null;
  description: string | null;
  time?: string;
}

const formatBadgeDate = (dateDebutStr: string, dateFinStr: string | null) => {
  const moisTexte = ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."];
  const [, monthD, dayD] = dateDebutStr.split("-");
  const jDebut = parseInt(dayD, 10).toString();
  const mDebut = moisTexte[parseInt(monthD, 10) - 1];

  if (dateFinStr) {
    const [, monthF, dayF] = dateFinStr.split("-");
    const jFin = parseInt(dayF, 10).toString();
    const mFin = moisTexte[parseInt(monthF, 10) - 1];

    if (monthD === monthF) {
      return { textePrincipal: `${jDebut}-${jFin}`, texteSecondaire: mDebut };
    } else {
      return { textePrincipal: `${jDebut} ${mDebut.slice(0, 3)}.`, texteSecondaire: `au ${jFin} ${mFin.slice(0, 3)}.` };
    }
  }
  return { textePrincipal: jDebut, texteSecondaire: mDebut };
};

export default async function NewsAndAgendaSection() {
  const today = new Date().toISOString().split("T")[0];

  const [latestNews, upcomingEvents] = await Promise.all([
    client.fetch<Actualite[]>(
      `*[_type == "actualite" && categorie != "alerte"] | order(datePublication desc)[0...3] {
        titre, "slug": slug.current, "date": datePublication, categorie, "imageUrl": imagePrincipale.asset->url, contenu
      }`
    ),
    client.fetch<Evenement[]>(
      `*[_type == "actualite" && categorie == "evenement" && coalesce(dateFinEvenement, dateDebutEvenement, datePublication) >= "${today}"] | order(coalesce(dateDebutEvenement, datePublication) asc)[0...3] {
        "title": titre, "slug": slug.current, "dateDebut": coalesce(dateDebutEvenement, datePublication), "dateFin": dateFinEvenement, "description": contenu, time
      }`
    )
  ]);

  return (
    <section className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* En-tête de section */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#b5651d]/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b5651d]">
                Vie locale
              </span>
            </div>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-stone-900">
              Actualités du village
            </h2>
          </div>
        </div>

        {/* AGENDA COMPACT (S'affiche uniquement s'il y a des événements) */}
        {upcomingEvents.length > 0 && (
          <div className="mb-12 rounded-2xl bg-white border border-[#b5651d]/20 p-4 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center gap-2 shrink-0 lg:w-48 lg:border-r border-stone-100 lg:pr-4">
                <Calendar className="h-5 w-5 text-[#b5651d]" />
                <span className="font-medium text-stone-800">Prochainement :</span>
              </div>
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {upcomingEvents.map((event) => {
                  const badge = formatBadgeDate(event.dateDebut, event.dateFin);
                  return (
                    <Link 
                      key={event.slug} 
                      href={`/actualites/${event.slug}`}
                      className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-stone-50"
                    >
                      <div className="flex min-w-[3.5rem] shrink-0 flex-col items-center justify-center rounded-md bg-[#b5651d]/10 px-2 py-1.5 text-center text-[#b5651d]">
  <span className="whitespace-nowrap text-sm font-bold leading-tight">
    {badge.textePrincipal}
  </span>
  <span className="mt-0.5 whitespace-nowrap text-[10px] font-semibold uppercase opacity-90">
    {badge.texteSecondaire}
  </span>
</div>
                      <span className="text-sm font-medium text-stone-700 line-clamp-2 group-hover:text-[#b5651d]">
                        {event.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* GRILLE D'ACTUALITÉS (Pleine largeur, prend la place centrale) */}
        {latestNews.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((act) => (
              <ActualiteCard
                key={act.slug}
                titre={act.titre}
                slug={act.slug}
                date={act.date}
                categorie={act.categorie}
                imageUrl={act.imageUrl}
                contenu={act.contenu}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-stone-400 border border-dashed border-stone-200 bg-white rounded-2xl">
            <FileText className="mx-auto h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-light">Aucune actualité récente à afficher.</p>
          </div>
        )}

        {/* Bouton Voir tout global */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            Voir toutes les publications
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}