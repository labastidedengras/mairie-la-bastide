"use client";

import { client } from "@/sanity/lib/client";
import {
  Calendar,
  Download,
  Eye,
  FileText,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

// Définition du type pour nos documents
interface CompteRendu {
  titre: string;
  date: string;
  annee: string;
  url: string;
}

export default function ComptesRendusPage() {
  const [activeYear, setActiveYear] = useState("");
  const [documents, setDocuments] = useState<Record<string, CompteRendu[]>>({});
  const [loading, setLoading] = useState(true);

  // État pour gérer le compte-rendu actuellement visionné
  const [viewingDoc, setViewingDoc] = useState<CompteRendu | null>(null);

  // Récupération des données depuis Sanity
  useEffect(() => {
    async function fetchComptesRendus() {
      try {
        const query = `*[_type == "compteRendu"] | order(datePublication desc) {
          titre,
          "date": datePublication,
          annee,
          "url": fichierPdf.asset->url
        }`;

        const data: CompteRendu[] = await client.fetch(query);

        // On crée l'objet dynamiquement au lieu de figer 2024, 2025, 2026
        const organizedDocs: Record<string, CompteRendu[]> = {};

        data.forEach((doc) => {
          if (doc.date) {
            const [year, month, day] = doc.date.split("-");
            doc.date = `${day}/${month}/${year}`;
          }

          // Si l'année n'existe pas encore dans notre objet, on la crée dynamiquement
          if (!organizedDocs[doc.annee]) {
            organizedDocs[doc.annee] = [];
          }

          organizedDocs[doc.annee].push(doc);
        });

        setDocuments(organizedDocs);

        // On récupère toutes les années trouvées, triées par la plus récente
        const dynamicYears = Object.keys(organizedDocs).sort((a, b) =>
          b.localeCompare(a),
        );

        // Si on a des années disponibles, on sélectionne la plus récente par défaut
        if (dynamicYears.length > 0) {
          setActiveYear(dynamicYears[0]);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données Sanity :",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    fetchComptesRendus();
  }, []);

  // Génère la liste des boutons d'années triée de façon décroissante
  const years = Object.keys(documents).sort((a, b) => b.localeCompare(a));

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
              Vie Citoyenne
            </span>
            <span className="h-px w-8 bg-white/40" />
          </div>

          <h1 className="font-serif text-5xl font-medium tracking-tight text-white md:text-6xl">
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
            <h2 className="font-serif text-3xl font-medium text-stone-900 mb-4">
              Sélectionnez une année
            </h2>

            {/* Sélecteur d'année (Tabs) dynamiques */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-8 py-3 rounded-md text-sm font-semibold transition-all duration-300 ${
                    activeYear === year
                      ? "bg-[#b5651d] text-white shadow-lg"
                      : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20 text-stone-400">
              <Loader2 className="h-8 w-8 animate-spin text-[#b5651d]" />
            </div>
          ) : (
            /* Liste des documents de l'année sélectionnée */
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {documents[activeYear]?.map((doc, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-500 transition-colors group-hover:bg-[#b5651d] group-hover:text-white">
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

                  <div className="flex items-center gap-2">
                    {/* Bouton Voir le document */}
                    <button
                      onClick={() => setViewingDoc(doc)}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-stone-50 text-stone-600 transition hover:bg-stone-200"
                      title="Consulter en ligne"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    {/* Bouton Télécharger */}
                    <a
                      href={`${doc.url}?dl=`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-stone-50 text-stone-600 transition hover:bg-[#b5651d] hover:text-white"
                      title="Télécharger le PDF"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}

              {/* Si aucune année n'est encore enregistrée ou aucun doc trouvé */}
              {(years.length === 0 ||
                !documents[activeYear] ||
                documents[activeYear].length === 0) && (
                <div className="py-20 text-center text-stone-400">
                  <Search className="mx-auto h-12 w-12 mb-4 opacity-20" />
                  <p>Aucun document disponible pour le moment.</p>
                </div>
              )}
            </div>
          )}

          {/* Note informative */}
          <div className="mt-16 rounded-2xl bg-[#b5651d]/5 p-6 border border-[#b5651d]/15 flex gap-4 items-center">
            <div className="bg-white p-2 rounded-md shadow-sm">
              <Calendar className="h-5 w-5 text-[#b5651d]" />
            </div>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Les comptes-rendus sont affichés en mairie et publiés sur le site
              internet dans la semaine suivant la validation du procès-verbal
              par le Conseil Municipal.
            </p>
          </div>
        </div>
      </section>

      {/* 👁️ Visionneuse de PDF plein écran intégrée (Modale) */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex flex-col bg-stone-900/90 backdrop-blur-sm p-4 md:p-6 animate-in fade-in duration-200">
          {/* Barre supérieure d'actions */}
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-t-2xl border-b border-stone-200">
            <div>
              <h2 className="font-serif text-lg font-medium text-stone-900 leading-tight">
                {viewingDoc.titre}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Séance du {viewingDoc.date}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`${viewingDoc.url}?dl=`}
                className="flex items-center gap-2 rounded-md bg-[#b5651d] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#964f17] shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Télécharger</span>
              </a>
              <button
                onClick={() => setViewingDoc(null)}
                className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
                title="Fermer la lecture"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Corps de l'Iframe pour afficher le PDF de Sanity */}
          <div className="flex-1 bg-white rounded-b-2xl overflow-hidden shadow-2xl">
            <iframe
              src={viewingDoc.url}
              className="h-full w-full border-none"
              title={viewingDoc.titre}
            />
          </div>
        </div>
      )}
    </>
  );
}
