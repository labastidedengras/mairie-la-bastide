import type { Metadata } from "next";
import ActualitesClientContent from "./ActualitesClientContent";

// Les métadonnées lues par les moteurs de recherche
export const metadata: Metadata = {
  title: "Le Mag' Info - Actualités",
  description:
    "Suivez au quotidien l'actualité de la commune de La Bastide d'Engras : décisions de la mairie, chantiers en cours, alertes et événements à venir.",
};

export default function ActualitesPage() {
  return <ActualitesClientContent />;
}
