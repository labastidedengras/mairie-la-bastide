"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarDays, FileText, TriangleAlert } from "lucide-react";

// On reprend la configuration des catégories
const CATEGORIES_CONFIG: Record<string, { label: string; isAlerte: boolean }> =
  {
    "vie-municipale": { label: "Vie Municipale", isAlerte: false },
    evenement: { label: "Événement & Festivités", isAlerte: false },
    travaux: { label: "Travaux & Routes", isAlerte: false },
    alerte: { label: "Alerte Info", isAlerte: true },
  };

interface ActualiteCardProps {
  titre: string;
  slug: string;
  date: string;
  categorie: string;
  imageUrl: string | null;
  contenu: string | null;
}

export default function ActualiteCard({
  titre,
  slug,
  date,
  categorie,
  imageUrl,
  contenu,
}: ActualiteCardProps) {
  const config = CATEGORIES_CONFIG[categorie] || {
    label: categorie,
    isAlerte: false,
  };

  // Formater la date en français (ex: 18 juin 2026)
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const mois = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    return `${parseInt(day, 10)} ${mois[parseInt(month, 10) - 1]} ${year}`;
  };

  // CAS 1 : C'est une ALERTE INFO (Design ambré complet)
  if (config.isAlerte) {
    return (
      <article className="overflow-hidden rounded-[2rem] bg-amber-50 shadow-sm ring-1 ring-amber-200 transition hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex h-64 items-center justify-center bg-amber-100">
            <div className="text-center text-amber-700">
              <TriangleAlert className="mx-auto mb-4 h-10 w-10" />
              <span className="text-sm font-medium">{config.label}</span>
            </div>
          </div>

          <div className="p-7">
            <div className="mb-4 flex items-center gap-2 text-sm text-amber-700">
              <CalendarDays className="h-4 w-4" />
              {formatDate(date)}
            </div>
            <h3 className="text-2xl font-semibold text-stone-900 line-clamp-2">
              {titre}
            </h3>
            <p className="mt-3 text-stone-700 line-clamp-3">{contenu}</p>
          </div>
        </div>

        <div className="px-7 pb-7">
          <Link
            href={`/actualites/${slug}`}
            className="font-medium text-amber-800 hover:underline inline-block"
          >
            Plus d’informations →
          </Link>
        </div>
      </article>
    );
  }

  // CAS 2 & 3 : ARTICLE TRADITIONNEL (Avec ou sans image)
  return (
    <article className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between">
      <div>
        {imageUrl ? (
          /* Avec image d'illustration */
          <div className="relative h-64 w-full">
            <Image
              src={imageUrl}
              alt={titre}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute left-5 top-5 rounded-full bg-white/90 text-stone-900 px-4 py-2 text-sm font-medium backdrop-blur">
              {config.label}
            </div>
          </div>
        ) : (
          /* Sans image (Fallback) */
          <div className="flex h-64 items-center justify-center bg-stone-100">
            <div className="text-center text-stone-500">
              <FileText className="mx-auto mb-4 h-10 w-10" />
              <span className="text-sm font-medium">{config.label}</span>
            </div>
          </div>
        )}

        <div className="p-7">
          <div className="mb-4 flex items-center gap-2 text-sm text-stone-500">
            <CalendarDays className="h-4 w-4" />
            {formatDate(date)}
          </div>
          <h3 className="text-2xl font-semibold text-stone-900 line-clamp-2">
            {titre}
          </h3>
          <p className="mt-3 text-stone-600 line-clamp-3">
            {contenu ||
              "Consultez les détails de cette publication en cliquant sur le bouton ci-dessous."}
          </p>
        </div>
      </div>

      <div className="px-7 pb-7">
        <Link
          href={`/actualites/${slug}`}
          className="font-medium text-stone-900 hover:underline inline-block"
        >
          Lire la suite →
        </Link>
      </div>
    </article>
  );
}
