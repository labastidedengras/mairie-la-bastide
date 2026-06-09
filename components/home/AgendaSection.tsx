"use client";

import { client } from "@/sanity/lib/client";
import { Calendar, Clock3, Loader2, MapPin } from "lucide-react";
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

        /* Magie GROQ : 
           On prend la date de fin si elle existe, sinon la date de début, sinon la date de publication.
           L'événement reste visible tant que sa date de fin n'est pas dépassée par rapport à "today".
        */
        const query = `*[_type == "actualite" && categorie == "evenement" && coalesce(dateFinEvenement, dateDebutEvenement, datePublication) >= "${today}"] | order(coalesce(dateDebutEvenement, datePublication) asc)[0...3] {
          "title": titre,
          "slug": slug.current,
          "dateDebut": coalesce(dateDebutEvenement, datePublication),
          "dateFin": dateFinEvenement,
          "description": contenu,
          location,
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

  // Fonction intelligente pour formater la date du badge marron
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

    const [yearD, monthD, dayD] = dateDebutStr.split("-");
    const jDebut = parseInt(dayD, 10).toString();
    const mDebut = moisTexte[parseInt(monthD, 10) - 1];

    if (dateFinStr) {
      const [, monthF, dayF] = dateFinStr.split("-");
      const jFin = parseInt(dayF, 10).toString();
      const mFin = moisTexte[parseInt(monthF, 10) - 1];

      // Si c'est le même mois (ex: 14-16 Juin)
      if (monthD === monthF) {
        return {
          textePrincipal: `${jDebut}-${jFin}`,
          texteSecondaire: mDebut,
        };
      } else {
        // Si ça chevauche deux mois (ex: 30 Juin au 2 Juil.)
        return {
          textePrincipal: `${jDebut} ${mDebut.slice(0, 3)}.`,
          texteSecondaire: `au ${jFin} ${mFin.slice(0, 3)}.`,
        };
      }
    }

    // Événement sur un seul jour (ex: 14 Juin)
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
            <span className="mb-4 inline-flex rounded-full bg-stone-200 px-4 py-2 text-sm font-medium text-stone-700">
              Vie locale
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              Agenda du village
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-stone-600">
              Retrouvez les prochains événements, rendez-vous municipaux et
              moments de convivialité organisés au village.
            </p>
          </div>

          <Link
            href="/actualites"
            className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 font-medium text-stone-800 transition hover:bg-stone-100"
          >
            Voir tout l’agenda
          </Link>
        </div>

        {/* Liste */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#8a7a5a]" />
          </div>
        ) : events.length > 0 ? (
          <div className="space-y-5">
            {events.map((event) => {
              // Récupération des textes dynamiques pour le badge
              const badge = formatBadgeDate(event.dateDebut, event.dateFin);

              return (
                <article
                  key={event.slug}
                  className="group rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                    {/* Badge Date Adapté aux multi-jours */}
                    <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-[1.5rem] bg-[#8a7a5a] text-white shadow-inner px-2 text-center">
                      <span
                        className={`font-bold leading-none ${badge.textePrincipal.length > 2 ? "text-xl" : "text-3xl"}`}
                      >
                        {badge.textePrincipal}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-white/80 mt-1.5 font-medium block">
                        {badge.texteSecondaire}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-3">
                        <span className="rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800">
                          {event.dateFin
                            ? "Festival / Multi-jours"
                            : "Événement"}
                        </span>
                      </div>

                      <h3 className="text-2xl font-semibold text-stone-900 group-hover:text-[#8a7a5a] transition-colors">
                        {event.title}
                      </h3>

                      <p className="mt-2 max-w-3xl text-stone-600 line-clamp-2 text-sm leading-relaxed">
                        {event.description ||
                          "Aucune description supplémentaire."}
                      </p>

                      <div className="mt-4 flex flex-col gap-3 text-xs font-medium text-stone-500 sm:flex-row sm:items-center sm:gap-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-stone-400" />
                          {event.location || "Place du village"}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-stone-400" />
                          {event.time ||
                            (event.dateFin
                              ? "Plusieurs jours"
                              : "Voir les détails")}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="lg:pl-4">
                      <Link
                        href={`/actualites/${event.slug}`}
                        className="inline-flex items-center gap-1 rounded-full bg-stone-100 hover:bg-[#8a7a5a] text-stone-800 hover:text-white px-5 py-2.5 text-xs font-semibold transition-all group-hover:translate-x-1"
                      >
                        En savoir plus →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center text-stone-400 border border-dashed border-stone-200 bg-white rounded-[2rem]">
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
