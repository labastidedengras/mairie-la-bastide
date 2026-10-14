import { BookOpen, CalendarDays, Clock3 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bibliothèque",
  description:
    "Horaires et calendrier 2026 de la bibliothèque de La Bastide-d'Engras.",
};

const calendrier = [
  { mois: "Janvier", dates: "15 et 29" },
  { mois: "Février", dates: "12 et 19" },
  { mois: "Mars", dates: "12 et 26" },
  { mois: "Avril", dates: "9, 16 et 30" },
  { mois: "Mai", dates: "21" },
  { mois: "Juin", dates: "18 et 25" },
  { mois: "Juillet", dates: "2 et 16" },
  { mois: "Août", dates: "20 et 27" },
  { mois: "Septembre", dates: "10 et 24" },
  { mois: "Octobre", dates: "8 et 15" },
  { mois: "Novembre", dates: "5 et 19" },
  { mois: "Décembre", dates: "3 et 17" },
];

export default function BibliothequePage() {
  return (
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9e5218]">
          Vie pratique
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Bibliothèque
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Arno DAUPHIN vous accueille à la bibliothèque de La Bastide-d&apos;Engras.
        </p>

        <div className="mt-10 grid gap-8 border-y border-stone-200 py-8 sm:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
              <BookOpen aria-hidden="true" className="h-5 w-5 text-[#9e5218]" />
              Bibliothèque du village
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Retrouvez Arno DAUPHIN les jeudis indiqués dans le calendrier
              2026.
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
              <Clock3 aria-hidden="true" className="h-5 w-5 text-[#9e5218]" />
              Horaires
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Le jeudi, de 10 h à 12 h, selon le calendrier.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="flex items-center gap-3 font-serif text-2xl font-semibold text-stone-900">
            <CalendarDays
              aria-hidden="true"
              className="h-6 w-6 text-[#9e5218]"
            />
            Calendrier 2026
          </h2>
          <p className="mt-2 text-base leading-relaxed text-stone-600">
            Permanences de la bibliothèque, le jeudi de 10 h à 12 h.
          </p>

          <ul className="mt-6 grid border-b border-stone-200 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
            {calendrier.map(({ mois, dates }) => (
              <li
                key={mois}
                className="flex items-baseline justify-between gap-4 border-t border-stone-200 py-4"
              >
                <span className="font-serif text-lg font-semibold text-stone-900">
                  {mois}
                </span>
                <span className="text-base text-stone-700">{dates}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
