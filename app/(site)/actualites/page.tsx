import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import ActualitesClientContent from "./ActualitesClientContent";

export const metadata: Metadata = {
  title: "Le Mag' Info - Actualités",
  description:
    "Suivez au quotidien l'actualité de la commune de La Bastide d'Engras : décisions de la mairie, chantiers en cours, alertes et événements à venir.",
};

export default async function ActualitesPage() {
  let actualites = [];

  try {
    const query = `*[_type == "actualite"] | order(datePublication desc) {
      titre,
      "slug": slug.current,
      "date": datePublication,
      categorie,
      "imageUrl": imagePrincipale.asset->url,
      contenu
    }`;

    actualites = await client.fetch(query);
  } catch (error) {
    console.error(
      "Erreur lors du chargement des actualités sur le serveur :",
      error,
    );
  }

  return <ActualitesClientContent initialActualites={actualites} />;
}
