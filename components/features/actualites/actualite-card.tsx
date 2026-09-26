"use client";

import { CalendarDays, FileText, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES_CONFIG: Record<
  string,
  { label: string; isAlerte: boolean; accent: string }
> = {
  "vie-municipale": {
    label: "Vie Municipale",
    isAlerte: false,
    accent: "#6b5b4d",
  },
  evenement: {
    label: "Événement & Festivités",
    isAlerte: false,
    accent: "#9e5218",
  },
  travaux: {
    label: "Travaux & Routes",
    isAlerte: false,
    accent: "#5c6b47",
  },
  alerte: {
    label: "Alerte Info",
    isAlerte: true,
    accent: "#b45309",
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

  if (config.isAlerte) {
    return (
      <Link
        href={`/actualites/${slug}`}
        className="group overflow-hidden rounded-sm bg-amber-50 shadow-sm ring-1 ring-amber-200 transition hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
      >
        <div>
          <div className="flex h-64 items-center justify-center bg-amber-100/60 border-b border-amber-200/40">
            <div className="text-center text-amber-800">
              <TriangleAlert className="mx-auto mb-3 h-9 w-9 stroke-[1.5]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {config.label}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-amber-800">
              <CalendarDays className="h-4 w-4" />
              {formatDate(date)}
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 line-clamp-2 transition-colors group-hover:text-amber-900">
              {titre}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-700 line-clamp-3">
              {contenu}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 inline-flex items-center gap-1">
            Plus d&apos;informations
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/actualites/${slug}`}
      className="group overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
    >
      <div>
        {imageUrl ? (
          <div className="relative h-64 w-full overflow-hidden bg-stone-100 p-2 border-b border-stone-100">
            <Image
              src={imageUrl}
              alt={titre}
              fill
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
            <div
              className="absolute left-4 top-4 rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
              style={{ backgroundColor: config.accent }}
            >
              {config.label}
            </div>
          </div>
        ) : (
          <div
            className="flex h-64 items-center justify-center border-b border-stone-100"
            style={{ backgroundColor: `${config.accent}08` }}
          >
            <div className="text-center" style={{ color: config.accent }}>
              <FileText className="mx-auto mb-3 h-9 w-9 stroke-[1.5]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {config.label}
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="mb-3 flex items-center gap-2 text-xs text-stone-400">
            <CalendarDays className="h-4 w-4" />
            {formatDate(date)}
          </div>

          <h3 className="font-serif text-xl font-bold text-stone-900 line-clamp-2 transition-colors group-hover:text-[#9e5218]">
            {titre}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-stone-500 line-clamp-3">
            {contenu ||
              "Consultez les détails de cette publication en cliquant sur le bouton ci-dessous."}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#9e5218] inline-flex items-center gap-1">
          Lire la suite
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
