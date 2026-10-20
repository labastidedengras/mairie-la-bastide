import { client } from "@/sanity/lib/client";
import type { PortableTextBlock } from "@portabletext/react";
import { cache } from "react";

// Types et requêtes GROQ regroupés ici : si le modèle de contenu change,
// on modifie un seul endroit. Les fonctions laissent remonter les erreurs ;
// c'est à la page de décider quoi afficher en cas d'échec.

export interface CompteRendu {
  titre: string;
  date: string;
  annee: string;
  url: string;
}

const COMPTES_RENDUS_QUERY = `*[_type == "compteRendu"] | order(datePublication desc) {
  titre,
  "date": datePublication,
  annee,
  "url": fichierPdf.asset->url
}`;

export const getComptesRendus = () =>
  client.fetch<CompteRendu[]>(COMPTES_RENDUS_QUERY);

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

const ASSOCIATIONS_QUERY = `*[_type == "association"] | order(nom asc) {
  nom,
  "slug": slug.current,
  categorie,
  description,
  contactNom,
  telephone,
  telephoneFixe,
  email
}`;

export const getAssociations = () =>
  client.fetch<Association[]>(ASSOCIATIONS_QUERY);

// --- Détail d'une association -------------------------------------------------

export interface AssociationDetail {
  nom: string;
  description: string | null;
  categorie: string | null;
  contenuDetaille: PortableTextBlock[] | null;
  contactNom: string | null;
  telephone: string | null;
  telephoneFixe: string | null;
  email: string | null;
  photos: string[] | null;
}

const ASSOCIATION_QUERY = `*[_type == "association" && slug.current == $slug][0] {
  nom,
  categorie,
  description,
  contenuDetaille,
  contactNom,
  telephone,
  telephoneFixe,
  email,
  "photos": galeriePhotos[].asset->url
}`;

// cache() : la page et generateMetadata partagent un seul appel à Sanity
// par requête, au lieu d'en faire deux identiques.
export const getAssociationBySlug = cache((slug: string) =>
  client.fetch<AssociationDetail | null>(ASSOCIATION_QUERY, { slug }),
);

export const getAssociationSlugs = async () => {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "association" && defined(slug.current)] { "slug": slug.current }`,
  );
  return results.map(({ slug }) => slug);
};

// --- Actualités ---------------------------------------------------------------

export interface Actualite {
  titre: string;
  slug: string;
  date: string;
  dateFin: string | null;
  categorie: string;
  imageUrl: string | null;
  contenu: string | null;
}

const ACTUALITES_QUERY = `*[_type == "actualite"] | order(datePublication desc) {
  titre,
  "slug": slug.current,
  "date": select(categorie == "evenement" => coalesce(dateDebutEvenement, datePublication), datePublication),
  "dateFin": select(categorie == "evenement" && defined(dateDebutEvenement) => dateFinEvenement, null),
  categorie,
  "imageUrl": imagePrincipale.asset->url,
  contenu
}`;

export const getActualites = () => client.fetch<Actualite[]>(ACTUALITES_QUERY);

// --- Détail d'une actualité ---------------------------------------------------

export interface ActualiteDetail extends Omit<Actualite, "slug"> {
  pdfUrl: string | null;
}

const ACTUALITE_QUERY = `*[_type == "actualite" && slug.current == $slug][0] {
  titre,
  "date": select(categorie == "evenement" => coalesce(dateDebutEvenement, datePublication), datePublication),
  "dateFin": select(categorie == "evenement" && defined(dateDebutEvenement) => dateFinEvenement, null),
  categorie,
  "imageUrl": imagePrincipale.asset->url,
  contenu,
  "pdfUrl": documentJoint.asset->url
}`;

// cache() : la page et generateMetadata partagent un seul appel à Sanity.
export const getActualiteBySlug = cache((slug: string) =>
  client.fetch<ActualiteDetail | null>(ACTUALITE_QUERY, { slug }),
);

export const getActualiteSlugs = async () => {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "actualite" && defined(slug.current)] { "slug": slug.current }`,
  );
  return results.map(({ slug }) => slug);
};

// --- Section « Actualités » de la page d'accueil ------------------------------

export interface ActualiteAccueil extends Actualite {
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface Evenement {
  title: string;
  slug: string;
  dateDebut: string;
  dateFin: string | null;
  time?: string;
}

const DERNIERES_ACTUALITES_QUERY = `*[_type == "actualite" && categorie != "alerte"] | order(datePublication desc)[0...3] {
  titre,
  "slug": slug.current,
  "date": select(categorie == "evenement" => coalesce(dateDebutEvenement, datePublication), datePublication),
  "dateFin": select(categorie == "evenement" && defined(dateDebutEvenement) => dateFinEvenement, null),
  categorie,
  "imageUrl": imagePrincipale.asset->url,
  "imageWidth": imagePrincipale.asset->metadata.dimensions.width,
  "imageHeight": imagePrincipale.asset->metadata.dimensions.height,
  contenu
}`;

export const getDernieresActualites = () =>
  client.fetch<ActualiteAccueil[]>(DERNIERES_ACTUALITES_QUERY);

// La date du jour est passée en paramètre ($today) et non collée dans la requête.
const EVENEMENTS_A_VENIR_QUERY = `*[_type == "actualite" && categorie == "evenement" && coalesce(dateFinEvenement, dateDebutEvenement, datePublication) >= $today] | order(coalesce(dateDebutEvenement, datePublication) asc)[0...3] {
  "title": titre,
  "slug": slug.current,
  "dateDebut": coalesce(dateDebutEvenement, datePublication),
  "dateFin": dateFinEvenement,
  time
}`;

// today : date du jour au format AAAA-MM-JJ
export const getEvenementsAVenir = (today: string) =>
  client.fetch<Evenement[]>(EVENEMENTS_A_VENIR_QUERY, { today });
