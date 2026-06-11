import type { Metadata } from "next";
import AssociationsClientContent from "./AssociationsClientContent";

export const metadata: Metadata = {
  title: "Vie Associative & Événements",
  description:
    "Découvrez le tissu associatif de La Bastide d'Engras. Retrouvez la liste des associations du village, les activités proposées et l'agenda des festivités.",
};

export default function AssociationsPage() {
  return <AssociationsClientContent />;
}
