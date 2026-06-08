import { Clock3, MapPin } from "lucide-react";
import Link from "next/link";

const events = [
  {
    date: {
      day: "14",
      month: "Juin",
    },
    title: "Marché local",
    description:
      "Retrouvez producteurs locaux et artisans sur la place du village.",
    location: "Place du village",
    time: "08h00 - 13h00",
    category: "Marché",
  },
  {
    date: {
      day: "18",
      month: "Juin",
    },
    title: "Fête du village",
    description:
      "Animations, concert et repas convivial pour tous les habitants.",
    location: "Centre du village",
    time: "18h30",
    category: "Événement",
  },
  {
    date: {
      day: "22",
      month: "Juin",
    },
    title: "Conseil municipal",
    description: "Réunion du conseil municipal ouverte au public.",
    location: "Mairie",
    time: "19h00",
    category: "Municipalité",
  },
];

export default function AgendaSection() {
  return (
    <section className="bg-stone-50 py-24">
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
              Retrouvez les événements, rendez-vous municipaux et moments de
              convivialité organisés au village.
            </p>
          </div>

          <Link
            href="/agenda"
            className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 font-medium text-stone-800 transition hover:bg-stone-100"
          >
            Voir tout l’agenda
          </Link>
        </div>

        {/* Events */}
        <div className="space-y-5">
          {events.map((event) => (
            <article
              key={event.title}
              className="group rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                {/* Date */}
                <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-[1.5rem] bg-[#8a7a5a] text-white">
                  <span className="text-3xl font-bold">{event.date.day}</span>

                  <span className="text-sm uppercase tracking-wide text-white/80">
                    {event.date.month}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700">
                      {event.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-stone-900">
                    {event.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-stone-600">
                    {event.description}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 text-sm text-stone-500 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      {event.time}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/agenda"
                  className="font-medium text-stone-900 transition group-hover:translate-x-1"
                >
                  En savoir plus →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
