// components/features/alertes/alert-popup.tsx
"use client";

import { AlertTriangle, FileText, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { AlerteData } from "./alert-popup-loader";

const STORAGE_PREFIX = "alerte-fermee:";

export default function AlertStack({ alertes }: { alertes: AlerteData[] }) {
  // On ne garde que les alertes que l'utilisateur n'a pas déjà fermées
  // (mémorisées par slug : une nouvelle alerte réapparaît toujours).
  const [visibleSlugs, setVisibleSlugs] = useState<string[]>([]);

  useEffect(() => {
    const remaining = alertes
      .filter((a) => !window.localStorage.getItem(`${STORAGE_PREFIX}${a.slug}`))
      .map((a) => a.slug);

    // Petit délai pour laisser la page se charger avant l'apparition
    const timer = setTimeout(() => setVisibleSlugs(remaining), 400);
    return () => clearTimeout(timer);
  }, [alertes]);

  const handleClose = (slug: string) => {
    window.localStorage.setItem(`${STORAGE_PREFIX}${slug}`, "1");
    setVisibleSlugs((prev) => prev.filter((s) => s !== slug));
  };

  const visibleAlertes = alertes.filter((a) => visibleSlugs.includes(a.slug));

  if (!visibleAlertes.length) return null;

  return (
    <div
      className="fixed right-4 top-24 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-28"
      aria-live="polite"
    >
      {visibleAlertes.map((alerte) => (
        <div
          key={alerte.slug}
          role="status"
          className="rounded-xl border border-stone-200 bg-white p-4 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-600">
                  Information importante
                </p>
                <button
                  onClick={() => handleClose(alerte.slug)}
                  aria-label="Fermer cette alerte"
                  className="-mr-1 -mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <h3 className="mt-1 truncate font-serif text-base font-semibold text-stone-900">
                {alerte.titre}
              </h3>

              {alerte.contenu && (
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-600">
                  {alerte.contenu}
                </p>
              )}

              <div className="mt-2.5">
                {alerte.documentUrl ? (
                  <a
                    href={alerte.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b5651d] hover:underline"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Voir le document
                  </a>
                ) : (
                  <Link
                    href={`/actualites/${alerte.slug}`}
                    onClick={() => handleClose(alerte.slug)}
                    className="text-xs font-semibold text-[#b5651d] hover:underline"
                  >
                    En savoir plus →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}