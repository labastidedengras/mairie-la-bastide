"use client";

import { client } from "@/sanity/lib/client";
import { FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
// On importe le nouveau composant carte
import ActualiteCard from "@/components/ui/actualite-card";

const CATEGORIES_LABELS = {
  "vie-municipale": "Vie Municipale",
  evenement: "Événement & Festivités",
  travaux: "Travaux & Routes",
  alerte: "Alerte Info",
};

interface Actualite {
  titre: string;
  slug: string;
  date: string;
  categorie: string;
  imageUrl: string | null;
  contenu: string | null;
}

export default function ActualitesPage() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [filteredActualites, setFilteredActualites] = useState<Actualite[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("toutes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActualites() {
      try {
        const query = `*[_type == "actualite"] | order(datePublication desc) {
          titre,
          "slug": slug.current,
          "date": datePublication,
          categorie,
          "imageUrl": imagePrincipale.asset->url,
          contenu
        }`;
        const data: Actualite[] = await client.fetch(query);
        setActualites(data);
        setFilteredActualites(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des actualités :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchActualites();
  }, []);

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === "toutes") {
      setFilteredActualites(actualites);
    } else {
      setFilteredActualites(
        actualites.filter((act) => act.categorie === category),
      );
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[450px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center pt-16">
          <span className="mb-4 inline-flex rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Actualités de la commune
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Le Mag&apos; Info
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90 font-light">
            Suivez au quotidien la vie du village, les décisions de la mairie,
            les chantiers en cours et les prochains événements.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filtres de catégories */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <button
              onClick={() => handleFilter("toutes")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition ${
                selectedCategory === "toutes"
                  ? "bg-stone-900 text-white shadow-md"
                  : "bg-white text-stone-800 border border-stone-300 hover:bg-stone-100"
              }`}
            >
              Tout afficher
            </button>
            {Object.entries(CATEGORIES_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleFilter(key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition ${
                  selectedCategory === key
                    ? "bg-stone-900 text-white shadow-md"
                    : "bg-white text-stone-800 border border-stone-300 hover:bg-stone-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid de contenu ou Loader */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#8a7a5a]" />
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredActualites.map((act) => (
                // Utilisation super propre de ton nouveau composant
                <ActualiteCard
                  key={act.slug}
                  titre={act.titre}
                  slug={act.slug}
                  date={act.date}
                  categorie={act.categorie}
                  imageUrl={act.imageUrl}
                  contenu={act.contenu}
                />
              ))}
            </div>
          )}

          {/* Aucun article */}
          {!loading && filteredActualites.length === 0 && (
            <div className="py-24 text-center text-stone-400 border border-dashed border-stone-200 bg-white rounded-[2rem]">
              <FileText className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-sm font-light">
                Aucune actualité publiée pour le moment dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
