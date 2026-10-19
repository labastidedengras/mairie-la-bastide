import {
  getActualiteBySlug,
  getActualiteSlugs,
  type ActualiteDetail,
} from "@/sanity/queries";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import ArticleClientContent from "./article-client-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function NotFound({ reason }: { reason: string }) {
  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl">
          Actualité introuvable
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">{reason}</p>

        <Link
          href="/actualites"
          className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour aux actualités
        </Link>
      </div>
    </section>
  );
}

export default async function ArticleUniquePage({ params }: PageProps) {
  const { slug } = await params;

  let article: ActualiteDetail | null;
  try {
    article = await getActualiteBySlug(slug);
  } catch (error) {
    console.error("Erreur lors du chargement de l'article :", error);
    return (
      <NotFound reason="Cette actualité n'est pas disponible pour le moment. Réessayez dans quelques instants." />
    );
  }

  if (!article) {
    return (
      <NotFound reason="Cette actualité n'existe pas, ou a été retirée." />
    );
  }

  return <ArticleClientContent article={article} />;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getActualiteBySlug(slug);
    if (!article) return { title: "Actualité introuvable" };

    const description = article.contenu
      ? `${article.contenu.slice(0, 150)}…`
      : "Actualité de la commune de La Bastide-d'Engras.";

    return {
      title: article.titre,
      description,
      openGraph: {
        title: article.titre,
        description,
        type: "article",
        images: article.imageUrl ? [{ url: article.imageUrl }] : undefined,
      },
    };
  } catch (error) {
    console.error("Erreur generateMetadata (article) :", error);
    return { title: "Actualité" };
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getActualiteSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Erreur generateStaticParams (article) :", error);
    return [];
  }
}
