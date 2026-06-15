import { client } from "@/sanity/lib/client";
import { ArrowLeft, Megaphone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import ArticleClientContent from "./ArticleClientContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. GENERATION DES METADATAS (Côté Serveur)
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const query = `*[_type == "actualite" && slug.current == $slug][0] {
      titre,
      contenu,
      "imageUrl": imagePrincipale.asset->url
    }`;

    const article = await client.fetch(query, { slug });

    if (!article) return { title: "Actualité introuvable" };

    const descriptionSnippet = article.contenu
      ? `${article.contenu.slice(0, 150)}...`
      : "Découvrez la dernière actualité de la commune de La Bastide d'Engras.";

    return {
      title: article.titre,
      description: descriptionSnippet,
      openGraph: {
        title: article.titre,
        description: descriptionSnippet,
        type: "article",
        images: article.imageUrl ? [{ url: article.imageUrl }] : undefined,
      },
    };
  } catch (error) {
    console.error("Erreur generateMetadata:", error);
    return { title: "Actualité" };
  }
}

// En haut ou en bas de ton fichier :
export async function generateStaticParams() {
  // On récupère TOUS les slugs existants dans Sanity
  const query = `*[_type == "actualite"] { "slug": slug.current }`;
  const articles = await client.fetch(query);

  return articles.map((article: { slug: string }) => ({
    slug: article.slug,
  }));
}

// 2. LE COMPOSANT SERVEUR PRINCIPAL
export default async function ArticleUniquePage({ params }: PageProps) {
  const { slug } = await params;

  // Récupération directe des données (fini le useEffect et le useState ici !)
  const query = `*[_type == "actualite" && slug.current == $slug][0] {
    titre,
    "date": datePublication,
    categorie,
    "imageUrl": imagePrincipale.asset->url,
    contenu,
    "pdfUrl": documentJoint.asset->url
  }`;

  const article = await client.fetch(query, { slug });

  // Si l'article n'existe pas
  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center bg-stone-50 min-h-screen flex flex-col items-center">
        <Megaphone className="h-12 w-12 text-stone-300 mb-4" />
        <h1 className="text-2xl font-bold text-stone-900 mb-2">
          Article introuvable
        </h1>
        <p className="text-stone-500 font-light mb-8">
          Cette actualité n&apos;existe pas ou a été retirée.
        </p>
        <Link
          href="/actualites"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8a7a5a] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Retourner aux actualités
        </Link>
      </div>
    );
  }

  // Si l'article existe, on passe les données au composant Client d'affichage
  return <ArticleClientContent article={article} />;
}
