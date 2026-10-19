import { getAssociations, type Association } from "@/sanity/queries";
import type { Metadata } from "next";
import { Suspense } from "react";
import AssociationsClientContent from "./associations-client-content";

export const metadata: Metadata = {
  title: "Vie associative",
  description:
    "Les associations de La Bastide-d'Engras : clubs, ateliers et comités qui animent la commune.",
};

export default async function AssociationsPage() {
  let associations: Association[];

  try {
    associations = await getAssociations();
  } catch (error) {
    console.error("Erreur lors du chargement des associations :", error);

    return (
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
    <Suspense>
      <AssociationsClientContent initialAssociations={associations} />
    </Suspense>
  );
}
