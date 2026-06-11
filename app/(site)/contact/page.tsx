import type { Metadata } from "next";
import ContactClientContent from "./ContactClientContent";

export const metadata: Metadata = {
  title: "Contacter la Mairie",
  description:
    "Coordonnées de la mairie de La Bastide d'Engras : horaires d'ouverture au public, numéro de téléphone, adresse e-mail et formulaire de contact en ligne.",
};

export default function ContactPage() {
  return <ContactClientContent />;
}
