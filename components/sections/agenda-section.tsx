"use client";

import { client } from "@/sanity/lib/client";
import { Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Evenement {
  title: string;
  slug: string;
  dateDebut: string;
  dateFin: string | null;
  description: string | null;
  location?: string;
  time?: string;
}

export default function AgendaSection() {
  const [events, setEvents] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpcomingEvents() {
      try {
        const today = new Date().toISOString().split("T")[0];

        const query = `*[_type == "actualite" && categorie == "evenement" && coalesce(dateFinEvenement, dateDebutEvenement, datePublication) >= "${today}"] | order(coalesce(dateDebutEvenement, datePublication) asc)[0...3] {
          "title": titre,
          "slug": slug.current,
          "dateDebut": coalesce(dateDebutEvenement, datePublication),
          "dateFin": dateFinEvenement,
          "description": contenu,
          time
        }`;

        const data = await client.fetch(query);
        setEvents(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'agenda :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUpcomingEvents();
  }, []);

  // Fonction intelligente pour formater la date du badge
  const formatBadgeDate = (dateDebutStr: string, dateFinStr: string | null) => {
    const moisTexte = [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ];

    const [, monthD, dayD] = dateDebutStr.split("-");
    const jDebut = parseInt(dayD, 10).toString();
    const mDebut = moisTexte[parseInt(monthD, 10) - 1];

    if (dateFinStr) {
      const [, monthF, dayF] = dateFinStr.split("-");
      const jFin = parseInt(dayF, 10).toString();
      const mFin = moisTexte[parseInt(monthF, 10) - 1];

      if (monthD === monthF) {
        return {
          textePrincipal: `${jDebut}-${jFin}`,
          texteSecondaire: mDebut,
        };
      } else {
        return {
          textePrincipal: `${jDebut} ${mDebut.slice(0, 3)}.`,
          texteSecondaire: `au ${jFin} ${mFin.slice(0, 3)}.`,
        };
      }
    }

    return {
      textePrincipal: jDebut,
      texteSecondaire: mDebut,
    };
  };

  return (
    <section id="agenda" className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#b5651d]/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b5651d]">
                Vie locale
              </span>
            </div>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-stone-900 md:text-5xl">
              Agenda du village
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-stone-600">
              Retrouvez les prochains événements, rendez-vous municipaux et
              moments de convivialité organisés au village.
            </p>
          </div>

          <Link
            href="/actualites"
            className="inline-flex rounded-md border border-[#b5651d] bg-white px-6 py-3 font-medium text-[#b5651d] transition hover:bg-[#b5651d] hover:text-white"
          >
            Voir tout l&apos;agenda →
          </Link>
        </div>

        {/* Liste */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#b5651d]" />
          </div>
        ) : events.length > 0 ? (
          <div className="space-y-5">
            {events.map((event) => {
              const badge = formatBadgeDate(event.dateDebut, event.dateFin);

              return (
                <Link
                  key={event.slug}
                  href={`/actualites/${event.slug}`}
                  className="group block rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start lg:items-center">
                    {/* Badge Date */}
                    <div className="flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 flex-col items-center justify-center rounded-xl bg-[#b5651d] text-white shadow-inner px-2 text-center mx-auto sm:mx-0">
                      <span
                        className={`font-serif font-semibold leading-none ${badge.textePrincipal.length > 2 ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"}`}
                      >
                        {badge.textePrincipal}
                      </span>
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/80 mt-1.5 font-medium block">
                        {badge.texteSecondaire}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full">
                      <div className="mb-2">
                        <span className="rounded-md bg-[#5c6b47]/10 border border-[#5c6b47]/20 px-3 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#5c6b47] inline-block">
                          {event.dateFin
                            ? "Festival / Multi-jours"
                            : "Événement"}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 group-hover:text-[#b5651d] transition-colors leading-tight">
                        {event.title}
                      </h3>

                      <p className="mt-2 text-stone-600 line-clamp-2 text-sm leading-relaxed">
                        {event.description ||
                          "Aucune description supplémentaire."}
                      </p>
                    </div>

                    {/* CTA visuel (plus de <Link> ici, juste un span stylé) */}
                    <div className="w-full sm:w-auto pt-2 sm:pt-0 sm:pl-4 flex justify-end shrink-0">
                      <span className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1 rounded-md bg-stone-100 group-hover:bg-[#b5651d] text-stone-800 group-hover:text-white px-5 py-2.5 text-xs font-semibold transition-all">
                        En savoir plus
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center text-stone-400 border border-dashed border-stone-200 bg-white rounded-2xl">
            <Calendar className="mx-auto h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-light">
              Aucun événement n&apos;est programmé pour les semaines à venir.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
