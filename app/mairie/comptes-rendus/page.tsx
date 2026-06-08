"use client";

import { useState } from "react";
import { FileText, Download, Calendar, Search } from "lucide-react";

export default function ComptesRendusPage() {
  const [activeYear, setActiveYear] = useState("2026");

  // On organise les données par année
  const documents = {
    "2026": [
      {
        titre: "Procès-verbal du Conseil Municipal - 12 Janvier 2026",
        date: "12/01/2026",
        url: "#",
      },
      {
        titre: "Procès-verbal du Conseil Municipal - 24 Février 2026",
        date: "24/02/2026",
        url: "#",
      },
    ],
    "2025": [
      {
        titre: "Procès-verbal du Conseil Municipal - 15 Décembre 2025",
        date: "15/12/2025",
        url: "#",
      },
      {
        titre: "Procès-verbal du Conseil Municipal - 10 Octobre 2025",
        date: "10/10/2025",
        url: "#",
      },
      {
        titre: "Procès-verbal du Conseil Municipal - 12 Juillet 2025",
        date: "12/07/2025",
        url: "#",
      },
      {
        titre: "Procès-verbal du Conseil Municipal - 05 Mai 2025",
        date: "05/05/2025",
        url: "#",
      },
      {
        titre: "Procès-verbal du Conseil Municipal - 14 Mars 2025",
        date: "14/03/2025",
        url: "#",
      },
      {
        titre: "Procès-verbal du Conseil Municipal - 20 Janvier 2025",
        date: "20/01/2025",
        url: "#",
      },
    ],
    "2024": [
      {
        titre: "Procès-verbal du Conseil Municipal - 18 Novembre 2024",
        date: "18/11/2024",
        url: "#",
      },
      {
        titre: "Procès-verbal du Conseil Municipal - 22 Septembre 2024",
        date: "22/09/2024",
        url: "#",
      },
      {
        titre: "Procès-verbal du Conseil Municipal - 10 Juin 2024",
        date: "10/06/2024",
        url: "#",
      },
      {
        titre: "Procès-verbal du Conseil Municipal - 15 Avril 2024",
        date: "15/04/2024",
        url: "#",
      },
      {
        titre: "Procès-verbal du Conseil Municipal - 12 Février 2024",
        date: "12/02/2024",
        url: "#",
      },
    ],
  };

  const years = Object.keys(documents).sort((a, b) => b.localeCompare(a));

  return (
    <>
      {/* Hero Section - Identique à ta charte graphique */}
      <section
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 inline-flex rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Vie Citoyenne
          </span>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Comptes-rendus
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90 font-light">
            Retrouvez l&apos;ensemble des délibérations et décisions prises lors
            des séances du Conseil Municipal de La Bastide d&apos;Engras.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Sélectionnez une année
            </h2>

            {/* Sélecteur d'année (Tabs) */}
            <div className="flex justify-center gap-4 mt-8">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeYear === year
                      ? "bg-[#8a7a5a] text-white shadow-lg scale-105"
                      : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Liste des documents de l'année sélectionnée */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {documents[activeYear as keyof typeof documents].map(
              (doc, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-500 transition-colors group-hover:bg-[#8a7a5a] group-hover:text-white">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 leading-tight">
                        {doc.titre}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-xs text-stone-500">
                        <Calendar className="h-3 w-3" />
                        <span>Publié le {doc.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={doc.url}
                      download
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-100 bg-stone-50 text-stone-600 transition hover:bg-[#8a7a5a] hover:text-white"
                      title="Télécharger le PDF"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ),
            )}

            {documents[activeYear as keyof typeof documents].length === 0 && (
              <div className="py-20 text-center text-stone-400">
                <Search className="mx-auto h-12 w-12 mb-4 opacity-20" />
                <p>Aucun document disponible pour cette année.</p>
              </div>
            )}
          </div>

          {/* Note informative */}
          <div className="mt-16 rounded-2xl bg-stone-100/50 p-6 border border-stone-200 flex gap-4 items-center">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Calendar className="h-5 w-5 text-[#8a7a5a]" />
            </div>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Les comptes-rendus sont affichés en mairie et publiés sur le site
              internet dans la semaine suivant la validation du procès-verbal
              par le Conseil Municipal.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
