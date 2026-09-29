import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import { Suspense } from "react";
import AssociationsClientContent from "./associations-client-content";

export const metadata: Metadata = {
  title: "Vie associative",
  description:
    "Les associations de La Bastide-d'Engras : clubs, ateliers et comités qui animent la commune.",
};

export interface Association {
  nom: string;
  slug: string;
  categorie: string;
  description: string;
  contactNom: string;
  telephone: string | null;
  telephoneFixe: string | null;
  email: string | null;
}

async function getAssociations(): Promise<{
  associations: Association[];
  hasError: boolean;
}> {
  try {
    const associations = await client.fetch<Association[]>(
      `*[_type == "association"] | order(nom asc) {
        nom,
        "slug": slug.current,
        categorie,
        description,
        contactNom,
        telephone,
        telephoneFixe,
        email
      }`,
    );
    return { associations, hasError: false };
  } catch (error) {
    console.error("Erreur lors du chargement des associations :", error);
    return { associations: [], hasError: true };
  }
}

export default async function AssociationsPage() {
  const { associations, hasError } = await getAssociations();

  if (hasError) {
    return (
      // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
      <section className="bg-white pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Vie associative
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-700">
            Les associations ne sont pas disponibles pour le moment. Réessayez
            dans quelques instants, ou contactez la mairie si le problème
            persiste.
          </p>
        </div>
      </section>
    );
  }

  return (
    // Requis par Next.js : AssociationsClientContent lit la catégorie via useSearchParams.
    <Suspense>
      <AssociationsClientContent initialAssociations={associations} />
    </Suspense>
  );
}
