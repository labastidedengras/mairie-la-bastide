import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES_CONFIG: Record<string, { label: string; accent: string }> = {
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

interface ActualiteCardProps {
  titre: string;
  slug: string;
  date: string;
  categorie: string;
  imageUrl: string | null;
  contenu: string | null;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${parseInt(day, 10)} ${MOIS[parseInt(month, 10) - 1]} ${year}`;
};

export default function ActualiteCard({
  titre,
  slug,
  date,
  categorie,
  imageUrl,
  contenu,
}: ActualiteCardProps) {
  const cat = CATEGORIES_CONFIG[categorie] ?? {
    label: categorie,
    accent: "#6b5b4d",
  };
  const isAlerte = categorie === "alerte";

  return (
    <Link
      href={`/actualites/${slug}`}
      className={`group flex flex-col ${
        isAlerte ? "border-l-4 border-red-700 pl-5" : ""
      }`}
    >
      {imageUrl && (
        <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <p className="text-base font-semibold" style={{ color: cat.accent }}>
        {cat.label}
      </p>

      <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-stone-900 transition-colors group-hover:text-[#9e5218]">
        {titre}
      </h3>

      <p className="mt-1 text-base text-stone-500">{formatDate(date)}</p>

      <p className="mt-3 text-base leading-relaxed text-stone-600 line-clamp-3">
        {contenu || "Consultez les détails de cette publication."}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-base font-semibold text-[#9e5218]">
        Lire la suite
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
