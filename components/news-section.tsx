// 1. On retire le "use client" ! C'est maintenant un Server Component
import ActualiteCard from "@/components/ui/actualite-card";
import { client } from "@/sanity/lib/client";
import { FileText } from "lucide-react";
import Link from "next/link";

interface Actualite {
  titre: string;
  slug: string;
  date: string;
  categorie: string;
  imageUrl: string | null;
  contenu: string | null;
}

// 2. On rend la fonction async pour fetcher directement côté serveur
export default async function NewsSection() {
  let latestNews: Actualite[] = [];

  try {
    const query = `*[_type == "actualite"] | order(datePublication desc)[0...3] {
      titre,
      "slug": slug.current,
      "date": datePublication,
      categorie,
      "imageUrl": imagePrincipale.asset->url,
      contenu
    }`;

    // On fait le fetch directement ici. Next.js va mettre cette page en cache static.
    latestNews = await client.fetch(query);
  } catch (error) {
    console.error(
      "Erreur lors du chargement des dernières actualités :",
      error,
    );
  }

  return (
    <section className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-flex rounded-full bg-stone-200 px-4 py-2 text-sm font-medium text-stone-700">
              Vie du village
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              Actualités & Informations
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-stone-600">
              Retrouvez les événements, informations municipales et actualités
              importantes du village.
            </p>
          </div>

          <Link
            href="/actualites"
            className="rounded-full border border-stone-300 bg-white px-6 py-3 font-medium text-stone-800 transition hover:bg-stone-100 text-center"
          >
            Voir toutes les actualités
          </Link>
        </div>

        {/* Plus besoin de loader client (l'HTML arrive déjà prêt chez l'utilisateur !) */}
        {latestNews.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((act) => (
              <ActualiteCard
                key={act.slug}
                titre={act.titre}
                slug={act.slug}
                date={act.date}
                categorie={act.categorie}
                imageUrl={act.imageUrl}
                contenu={act.contenu}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-stone-400 border border-dashed border-stone-200 bg-white rounded-[2rem]">
            <FileText className="mx-auto h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-light">
              Aucune actualité récente à afficher.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
