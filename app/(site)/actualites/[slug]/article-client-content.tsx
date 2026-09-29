import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES_LABELS: Record<string, { label: string; accent: string }> = {
  "vie-municipale": { label: "Vie municipale", accent: "#6b5b4d" },
  evenement: { label: "Événement & festivités", accent: "#9e5218" },
  travaux: { label: "Travaux & routes", accent: "#5c6b47" },
  alerte: { label: "Alerte info", accent: "#b91c1c" },
};

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

interface Article {
  titre: string;
  date: string;
  categorie: string;
  imageUrl: string | null;
  contenu: string | null;
  pdfUrl: string | null;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${parseInt(day, 10)} ${MOIS[parseInt(month, 10) - 1]} ${year}`;
};

export default function ArticleClientContent({
  article,
}: {
  article: Article;
}) {
  const cat = CATEGORIES_LABELS[article.categorie] ?? {
    label: article.categorie,
    accent: "#6b5b4d",
  };
  const isAlerte = article.categorie === "alerte";
  const hasImage = Boolean(article.imageUrl);

  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <article className="bg-white pb-24 pt-32 lg:pt-40">
      <div className={`mx-auto px-6 ${hasImage ? "max-w-7xl" : "max-w-3xl"}`}>
        <Link
          href="/actualites"
          className="group inline-flex items-center gap-2 text-base font-semibold text-stone-600 transition-colors hover:text-[#9e5218]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Toutes les actualités
        </Link>

        <header
          className={`mt-8 ${isAlerte ? "border-l-4 border-red-700 pl-5" : ""}`}
        >
          <p className="text-base font-semibold" style={{ color: cat.accent }}>
            {cat.label}
          </p>

          <h1 className="mt-3 max-w-4xl font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 md:text-4xl lg:text-5xl">
            {article.titre}
          </h1>

          <p className="mt-4 text-base text-stone-500">
            Publié le {formatDate(article.date)}
          </p>
        </header>

        <div
          className={
            hasImage
              ? "mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16"
              : "mt-12"
          }
        >
          {hasImage && article.imageUrl && (
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <Image
                src={article.imageUrl}
                alt={article.titre}
                width={900}
                height={1200}
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          )}

          <div className={hasImage ? "lg:col-span-7" : ""}>
            {article.contenu ? (
              <p className="whitespace-pre-line text-lg leading-relaxed text-stone-800">
                {article.contenu}
              </p>
            ) : (
              <p className="text-lg italic text-stone-600">
                Consultez les détails de cette information
                {hasImage ? " sur l'affiche ci-contre" : ""}
                {article.pdfUrl ? " ou dans le document joint" : "."}
              </p>
            )}

            {article.pdfUrl && (
              <div className="mt-10 border-t border-stone-200 pt-8">
                <a
                  href={article.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-2 text-stone-900 transition-colors hover:text-[#9e5218]"
                >
                  <span className="flex items-center gap-3">
                    <FileText
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-stone-400 transition-colors group-hover:text-[#9e5218]"
                    />
                    <span className="text-base font-semibold underline decoration-stone-300 underline-offset-4 group-hover:decoration-[#9e5218]">
                      Document complémentaire (PDF)
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-stone-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9e5218]"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
