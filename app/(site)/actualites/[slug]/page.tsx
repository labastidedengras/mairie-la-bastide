"use client";

import {
  ArrowLeft,
  Calendar,
  Download,
  FileText,
  Loader2,
  Megaphone,
} from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
// 1. Utilisation de ton nouvel import centralisé
import { client } from "@/sanity/lib/client";

const CATEGORIES_LABELS: Record<string, { label: string; color: string }> = {
  "vie-municipale": {
    label: "Vie Municipale",
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  evenement: {
    label: "Événement & Festivités",
    color: "bg-amber-50 text-amber-700 border-amber-100",
  },
  travaux: {
    label: "Travaux & Routes",
    color: "bg-orange-50 text-orange-700 border-orange-100",
  },
  alerte: {
    label: "Alerte Info",
    color: "bg-red-50 text-red-700 border-red-100 animate-pulse",
  },
};

interface Article {
  titre: string;
  date: string;
  categorie: string;
  imageUrl: string | null;
  contenu: string | null;
  pdfUrl: string | null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleUniquePage({ params }: PageProps) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticleDetails() {
      try {
        const query = `*[_type == "actualite" && slug.current == $slug][0] {
          titre,
          "date": datePublication,
          categorie,
          "imageUrl": imagePrincipale.asset->url,
          contenu,
          "pdfUrl": documentJoint.asset->url
        }`;
        // Utilisation du client importé
        const data = await client.fetch(query, { slug });
        setArticle(data);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchArticleDetails();
  }, [slug]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#8a7a5a]" />
      </div>
    );
  }

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

  const catInfo = CATEGORIES_LABELS[article.categorie] || {
    label: article.categorie,
    color: "bg-stone-100 text-stone-600",
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      {/* 2. LA BANNIÈRE DE FOND POUR LA NAVBAR
        Cette section fait 160px de haut (h-40), utilise la couleur pierre foncée de ta charte 
        et s'affiche pile derrière ta Navbar pour rendre son texte blanc parfaitement lisible.
      */}
      <div className="w-full h-[88px] bg-stone-900 shrink-0" />

      {/* Corps principal de l'article (plus besoin de gros pt-36 ici grâce à la bannière) */}
      <article className="py-12 pb-20 flex-1">
        <div className="mx-auto max-w-3xl px-6">
          {/* Retour arrière */}
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-[#8a7a5a] transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour aux actualités
          </Link>

          {/* Header */}
          <header className="mb-8">
            <span
              className={`inline-block rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider mb-4 ${catInfo.color}`}
            >
              {catInfo.label}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl leading-tight">
              {article.titre}
            </h1>
            <div className="mt-4 flex items-center gap-1.5 text-sm text-stone-400 font-light">
              <Calendar className="h-4 w-4" />
              <span>Publié le {formatDate(article.date)}</span>
            </div>
          </header>

          {/* Affichage Affiche Portrait */}
          {article.imageUrl && (
            <div className="relative w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-950 shadow-sm mb-10 flex items-center justify-center min-h-[350px] max-h-[650px]">
              <img
                src={article.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover blur-xl opacity-25 pointer-events-none"
              />
              <img
                src={article.imageUrl}
                alt={article.titre}
                className="relative z-10 max-w-full max-h-[650px] object-contain p-4 md:p-6"
              />
            </div>
          )}

          {/* Contenu textuel */}
          <div className="prose prose-stone max-w-none bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
            {article.contenu ? (
              <p className="text-stone-700 font-light leading-relaxed whitespace-pre-line text-base">
                {article.contenu}
              </p>
            ) : (
              <p className="text-stone-400 font-light italic text-sm">
                Consultez les détails de cette information sur l&apos;affiche
                ci-dessus ou via le document PDF joint.
              </p>
            )}

            {/* Téléchargement du PDF */}
            {article.pdfUrl && (
              <div className="mt-10 pt-8 border-t border-stone-100">
                <h3 className="text-xs font-bold text-stone-900 mb-4 uppercase tracking-wider">
                  Document utile lié
                </h3>
                <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 p-4 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-stone-900 line-clamp-1">
                        Document complémentaire (PDF)
                      </span>
                      <span className="block text-xs text-stone-400 font-light">
                        Cliquez pour ouvrir ou télécharger
                      </span>
                    </div>
                  </div>
                  <a
                    href={`${article.pdfUrl}?dl=`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 hover:bg-[#8a7a5a] hover:text-white transition shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
