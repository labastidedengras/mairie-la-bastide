// components/features/alertes/alert-popup-loader.tsx
// Server Component : va chercher les alertes actives côté serveur, sans JS client.
import { client } from "@/sanity/lib/client";
import AlertStack from "./alert-popup";

export interface AlerteData {
  slug: string;
  titre: string;
  contenu: string | null;
  datePublication: string;
  documentUrl: string | null;
}

export default async function AlertPopupLoader() {
  let alertes: AlerteData[] = [];

  try {
    const today = new Date().toISOString().split("T")[0];

    // On limite à 4 alertes affichées simultanément pour ne pas envahir l'écran
    const query = `*[
      _type == "actualite"
      && categorie == "alerte"
      && dateExpiration >= "${today}"
      && datePublication <= "${today}"
    ] | order(datePublication desc)[0...4] {
      "slug": slug.current,
      titre,
      contenu,
      datePublication,
      "documentUrl": documentJoint.asset->url
    }`;

    alertes = await client.fetch(query);
  } catch (error) {
    console.error("Erreur lors du chargement des alertes :", error);
  }

  if (!alertes.length) return null;

  return <AlertStack alertes={alertes} />;
}