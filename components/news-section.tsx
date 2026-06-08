"use client";

import { CalendarDays, FileText, TriangleAlert } from "lucide-react";
import Image from "next/image";

export default function NewsSection() {
  return (
    <section className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-flex rounded-full bg-stone-200 px-4 py-2 text-sm font-medium text-stone-700">
              Vie du village
            </span>

            <h2 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              Actualités & Informations
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-stone-600">
              Retrouvez les événements, informations municipales et actualités
              importantes du village.
            </p>
          </div>

          <button className="rounded-full border border-stone-300 bg-white px-6 py-3 font-medium text-stone-800 transition hover:bg-stone-100">
            Voir toutes les actualités
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Card 1 - Avec image */}
          <article className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-64">
              <Image
                src="/images/event.webp"
                alt="Fête du village"
                fill
                className="object-cover"
              />

              <div className="absolute left-5 top-5 rounded-full bg-white/90 text-stone-900  px-4 py-2 text-sm font-medium backdrop-blur">
                Événement
              </div>
            </div>

            <div className="p-7">
              <div className="mb-4 flex items-center gap-2 text-sm text-stone-500">
                <CalendarDays className="h-4 w-4" />
                18 juin 2026
              </div>

              <h3 className="text-2xl font-semibold text-stone-900">
                Fête du village 2026
              </h3>

              <p className="mt-3 text-stone-600">
                Concerts, marché local, animations et repas partagé sur la place
                du village.
              </p>

              <button className="mt-6 font-medium text-stone-900">
                Lire la suite →
              </button>
            </div>
          </article>

          {/* Card 2 - Sans image */}
          <article className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-64 items-center justify-center bg-stone-100">
              <div className="text-center text-stone-500">
                <FileText className="mx-auto mb-4 h-10 w-10" />
                <span className="text-sm font-medium">
                  Information municipale
                </span>
              </div>
            </div>

            <div className="p-7">
              <div className="mb-4 flex items-center gap-2 text-sm text-stone-500">
                <CalendarDays className="h-4 w-4" />
                12 juin 2026
              </div>

              <h3 className="text-2xl font-semibold text-stone-900">
                Nouveaux horaires de mairie
              </h3>

              <p className="mt-3 text-stone-600">
                Les horaires d’ouverture de la mairie évoluent à partir du mois
                de juin.
              </p>

              <button className="mt-6 font-medium text-stone-900">
                Lire la suite →
              </button>
            </div>
          </article>

          {/* Card 3 - Alerte */}
          <article className="overflow-hidden rounded-[2rem] bg-amber-50 shadow-sm ring-1 ring-amber-200 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-64 items-center justify-center bg-amber-100">
              <div className="text-center text-amber-700">
                <TriangleAlert className="mx-auto mb-4 h-10 w-10" />
                <span className="text-sm font-medium">
                  Information importante
                </span>
              </div>
            </div>

            <div className="p-7">
              <div className="mb-4 flex items-center gap-2 text-sm text-amber-700">
                <CalendarDays className="h-4 w-4" />
                08 juin 2026
              </div>

              <h3 className="text-2xl font-semibold text-stone-900">
                Coupure d’eau temporaire
              </h3>

              <p className="mt-3 text-stone-700">
                Une intervention sur le réseau est prévue ce vendredi entre 9h
                et 13h.
              </p>

              <button className="mt-6 font-medium text-amber-800">
                Plus d’informations →
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
