import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import SallePolyvalenteClient from "./salle-polyvalente-client";

export const metadata: Metadata = {
  title: "Réservation de la salle polyvalente",
  description:
    "Tarifs, disponibilités et demande de réservation de la salle polyvalente de La Bastide-d'Engras.",
};

interface Reservation {
  dateDebut: string;
  dateFin: string;
}

async function getDatesOccupees(): Promise<{
  datesOccupees: string[];
  hasError: boolean;
}> {
  try {
    const reservations = await client.fetch<Reservation[]>(
      `*[_type == "reservation" && statut == "confirmee" && dateFin >= now()] {
        dateDebut, dateFin
      }`,
    );

    const datesSet = new Set<string>();

    for (const res of reservations) {
      const courant = new Date(res.dateDebut);
      courant.setHours(0, 0, 0, 0);
      const fin = new Date(res.dateFin);
      fin.setHours(0, 0, 0, 0);

      while (courant <= fin) {
        datesSet.add(courant.toISOString().split("T")[0]);
        courant.setDate(courant.getDate() + 1);
      }
    }

    return { datesOccupees: Array.from(datesSet), hasError: false };
  } catch (error) {
    console.error("Erreur lors du chargement des réservations :", error);
    return { datesOccupees: [], hasError: true };
  }
}

export default async function SallePolyvalentePage() {
  const { datesOccupees, hasError } = await getDatesOccupees();

  if (hasError) {
    return (
      // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
      <section className="bg-white pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Salle polyvalente
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone-700">
            Le calendrier des disponibilités n&apos;est pas accessible pour le
            moment. Pour vérifier une date ou faire une demande, contactez le
            secrétariat au{" "}
            <a
              href="tel:0466728145"
              className="font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218]"
            >
              04 66 72 81 45
            </a>
            .
          </p>
        </div>
      </section>
    );
  }

  return <SallePolyvalenteClient datesOccupees={datesOccupees} />;
}
