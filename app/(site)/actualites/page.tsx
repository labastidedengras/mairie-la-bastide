import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import { Suspense } from "react";
import ActualitesClientContent from "./actualites-client-content";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "L'actualité de la commune de La Bastide-d'Engras : décisions de la mairie, chantiers en cours, alertes et événements à venir.",
};

interface Actualite {
  titre: string;
  slug: string;
  date: string;
  categorie: string;
  imageUrl: string | null;
  contenu: string | null;
}

async function getActualites(): Promise<{
  actualites: Actualite[];
  hasError: boolean;
}> {
  try {
    const actualites = await client.fetch<Actualite[]>(
      `*[_type == "actualite"] | order(datePublication desc) {
        titre,
        "slug": slug.current,
        "date": datePublication,
        categorie,
        "imageUrl": imagePrincipale.asset->url,
        contenu
      }`,
    );
    return { actualites, hasError: false };
  } catch (error) {
    console.error("Erreur lors du chargement des actualités :", error);
    return { actualites: [], hasError: true };
  }
}

export default async function ActualitesPage() {
  const { actualites, hasError } = await getActualites();

  if (hasError) {
    return (
      // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
      <section className="bg-white pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Actualités
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-700">
            Les actualités ne sont pas disponibles pour le moment. Réessayez
            dans quelques instants, ou contactez la mairie si le problème
            persiste.
          </p>
        </div>
      </section>
    );
  }

  return (
    <Suspense>
      <ActualitesClientContent initialActualites={actualites} />
    </Suspense>
  );
}
