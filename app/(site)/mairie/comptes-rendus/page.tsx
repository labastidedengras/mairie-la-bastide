import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import ComptesRendusClientContent from "./comptes-rendus-client-content";

export const metadata: Metadata = {
  title: "Comptes rendus du conseil municipal",
  description:
    "Les procès-verbaux et comptes rendus officiels des séances du conseil municipal de La Bastide-d'Engras.",
};

export interface CompteRendu {
  titre: string;
  date: string;
  annee: string;
  url: string;
}

async function getComptesRendus(): Promise<{
  documents: CompteRendu[];
  hasError: boolean;
}> {
  try {
    const documents = await client.fetch<CompteRendu[]>(
      `*[_type == "compteRendu"] | order(datePublication desc) {
        titre,
        "date": datePublication,
        annee,
        "url": fichierPdf.asset->url
      }`,
    );
    return { documents, hasError: false };
  } catch (error) {
    console.error("Erreur lors du chargement des comptes rendus :", error);
    return { documents: [], hasError: true };
  }
}

export default async function ComptesRendusPage() {
  const { documents, hasError } = await getComptesRendus();

  if (hasError) {
    return (
      // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
      <section className="bg-white pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Comptes rendus du conseil municipal
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-700">
            Les comptes rendus ne sont pas disponibles pour le moment. Réessayez
            dans quelques instants, ou contactez la mairie si le problème
            persiste.
          </p>
        </div>
      </section>
    );
  }

  return <ComptesRendusClientContent documents={documents} />;
}
