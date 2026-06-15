import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import SallePolyvalenteClient from "./SallePolyvalenteClient";

export const metadata: Metadata = {
  title: "Réservation de la Salle Polyvalente",
  description:
    "Consultez le calendrier des disponibilités de la salle des fêtes de La Bastide d'Engras et effectuez votre demande de location en ligne.",
};

export default async function SallePolyvalentePage() {
  let datesOccupees: string[] = [];

  try {
    // On récupère uniquement les réservations validées et futures
    const query = `*[_type == "reservation" && statut == "confirmee" && dateFin >= now()] {
      dateDebut,
      dateFin
    }`;

    const reservations = await client.fetch(query);

    // Petit script pour lister TOUTES les dates individuelles (jours) qui tombent entre le début et la fin d'une réservation
    const datesSet = new Set<string>();

    reservations.forEach((res: { dateDebut: string; dateFin: string }) => {
      const debut = new Date(res.dateDebut);
      const fin = new Date(res.dateFin);

      // On boucle jour par jour du début à la fin de la réservation
      const courant = new Date(debut);
      courant.setHours(0, 0, 0, 0);
      const finMinuit = new Date(fin);
      finMinuit.setHours(0, 0, 0, 0);

      while (courant <= finMinuit) {
        datesSet.add(courant.toISOString().split("T")[0]);
        courant.setDate(courant.getDate() + 1);
      }
    });

    datesOccupees = Array.from(datesSet);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
  }

  return <SallePolyvalenteClient datesOccupees={datesOccupees} />;
}
