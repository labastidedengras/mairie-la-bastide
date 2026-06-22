import { Landmark, User, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Conseil Municipal & Les Élus",
  description:
    "Présentation de l'équipe municipale de La Bastide d'Engras : découvrez le mot du Maire, la liste des adjoints et les membres du conseil municipal.",
};

export default function ElusPage() {
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
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
              Vie municipale
            </span>
            <span className="h-px w-8 bg-white/40" />
          </div>

          <h1 className="font-serif text-5xl font-medium tracking-tight text-white md:text-6xl">
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
              <Landmark className="w-4 h-4 text-[#b5651d]" />
              Le Maire
            </div>

            <div
              className="mx-auto max-w-sm rounded-2xl border-t-4 border-stone-200 bg-white p-8 shadow-sm transition hover:shadow-md"
              style={{ borderTopColor: "#b5651d" }}
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#b5651d]/10 text-[#b5651d]">
                <User className="h-8 w-8" />
              </div>

              <h2 className="font-serif text-2xl font-medium text-stone-900">
                M. PARIS Laurent
              </h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-[#b5651d]">
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
              <h3 className="font-serif text-3xl font-medium text-stone-900 tracking-tight">
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
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                    <User className="h-6 w-6" />
                  </div>

                  <h4 className="font-serif text-base font-medium text-stone-900">
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
