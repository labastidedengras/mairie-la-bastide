"use client";

import { Landmark, User, Users } from "lucide-react";

export default function ElusPage() {
  // Ta liste exacte et complète du conseil municipal
  const conseillers = [
    { nom: "DUFAUD Nathalie", role: "Conseillère Municipale" },
    { nom: "CARON Chantal", role: "Conseillère Municipale" },
    { nom: "CARON Jean-Pierre", role: "Conseiller Municipal" },
    { nom: "MASSART Frédéric", role: "Conseiller Municipal" },
    { nom: "CHABRIER Chantal", role: "Conseillère Municipale" },
    { nom: "COVELO Thierry", role: "Conseiller Municipal" },
    { nom: "DUFAUD Séverine", role: "Conseillère Municipale" },
    { nom: "LANGLASSE Romain", role: "Conseiller Municipal" },
    { nom: "JOUVENEL Marie", role: "Conseillère Municipale" },
    { nom: "FOUQUET Valentin", role: "Conseiller Municipal" },
  ];

  return (
    <>
      {/* Hero Section - Même style fixe que les autres pages */}
      <section
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 inline-flex rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Vie municipale
          </span>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Vos Élus
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90 font-light">
            L&apos;équipe municipale au service des habitants de La Bastide
            d&apos;Engras.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* 1. SECTION : LE MAIRE */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 mb-6">
              <Landmark className="w-4 h-4 text-[#8a7a5a]" />
              Le Maire
            </div>

            <div className="mx-auto max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-stone-50 text-[#8a7a5a] border border-stone-200">
                <User className="h-8 w-8" />
              </div>

              <h2 className="text-2xl font-bold text-stone-900">
                M. PARIS Laurent
              </h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-[#8a7a5a]">
                Maire de la commune
              </p>
            </div>
          </div>

          <hr className="border-stone-200 my-12 max-w-md mx-auto" />

          {/* 2. SECTION : LES CONSEILLERS MUNICIPAUX */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 mb-2">
                <Users className="w-4 h-4 text-stone-400" />
                Le Conseil Municipal
              </div>
              <h3 className="text-3xl font-bold text-stone-900 tracking-tight">
                Les Conseillers Municipaux
              </h3>
            </div>

            {/* Grille des conseillers */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {conseillers.map((conseiller, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-50 text-stone-400 border border-stone-100">
                    <User className="h-6 w-6" />
                  </div>

                  <h4 className="text-base font-semibold text-stone-900">
                    {conseiller.nom}
                  </h4>

                  <p className="mt-1 text-xs text-stone-500 font-light">
                    {conseiller.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
