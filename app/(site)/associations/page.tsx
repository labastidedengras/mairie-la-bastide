import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import AssociationsClientContent from "./associations-client-content";

export const metadata: Metadata = {
  title: "Vie Associative & Événements",
  description:
    "Découvrez le tissu associatif de La Bastide d'Engras. Retrouvez la liste des associations du village, les activités proposées et l'agenda des festivités.",
};

export default async function AssociationsPage() {
  let associations = [];

  try {
    // Requête GROQ pour extraire toutes les associations triées par nom
    const query = `*[_type == "association"] | order(nom asc) {
      nom,
      "slug": slug.current,
      categorie,
      description,
      contactNom,
      telephone,
      telephoneFixe,
      email,
      iconKey
    }`;

    associations = await client.fetch(query);
  } catch (error) {
    console.error("Erreur lors de la récupération des associations :", error);
  }

  // On injecte les données récupérées côté serveur dans le module de filtrage client
  return <AssociationsClientContent initialAssociations={associations} />;
}
