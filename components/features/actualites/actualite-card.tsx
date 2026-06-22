"use client";

import { CalendarDays, FileText, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Configuration des catégories avec couleur d'accent par type
const CATEGORIES_CONFIG: Record<
  string,
  { label: string; isAlerte: boolean; accent: string }
> = {
  "vie-municipale": {
    label: "Vie Municipale",
    isAlerte: false,
    accent: "#6b5b4d", // brun pierre
  },
  evenement: {
    label: "Événement & Festivités",
    isAlerte: false,
    accent: "#b5651d", // terracotta
  },
  travaux: {
    label: "Travaux & Routes",
    isAlerte: false,
    accent: "#5c6b47", // vert garrigue
  },
  alerte: {
    label: "Alerte Info",
    isAlerte: true,
    accent: "#b45309", // ambre
  },
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
    accent: "#6b5b4d",
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
      <Link
        href={`/actualites/${slug}`}
        className="group overflow-hidden rounded-2xl bg-amber-50 shadow-sm ring-1 ring-amber-200 transition hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
      >
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
            <h3 className="font-serif text-2xl font-medium text-stone-900 line-clamp-2">
              {titre}
            </h3>
            <p className="mt-3 text-stone-700 line-clamp-3">{contenu}</p>
          </div>
        </div>

        <div className="px-7 pb-7">
          <span className="font-medium text-amber-800 inline-flex items-center gap-1">
            Plus d&apos;informations
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    );
  }

  // CAS 2 & 3 : ARTICLE TRADITIONNEL (Avec ou sans image)
  return (
    <Link
      href={`/actualites/${slug}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
    >
      <div>
        {imageUrl ? (
          /* Avec image d'illustration */
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={titre}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div
              className="absolute left-5 top-5 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur"
              style={{ backgroundColor: `${config.accent}cc` }}
            >
              {config.label}
            </div>
          </div>
        ) : (
          /* Sans image (Fallback) teinté selon la catégorie */
          <div
            className="flex h-64 items-center justify-center"
            style={{ backgroundColor: `${config.accent}10` }}
          >
            <div className="text-center" style={{ color: config.accent }}>
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
          <h3 className="font-serif text-2xl font-medium text-stone-900 line-clamp-2">
            {titre}
          </h3>
          <p className="mt-3 text-stone-600 line-clamp-3">
            {contenu ||
              "Consultez les détails de cette publication en cliquant sur le bouton ci-dessous."}
          </p>
        </div>
      </div>

      <div className="px-7 pb-7">
        <span className="font-medium text-stone-900 inline-flex items-center gap-1">
          Lire la suite
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
