import {
  getDernieresActualites,
  getEvenementsAVenir,
  type ActualiteAccueil,
  type Evenement,
} from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
  "vie-municipale": "Vie municipale",
  evenement: "Événement & festivités",
  travaux: "Travaux & routes",
  alerte: "Alerte info",
  presse: "Articles de presse",
};

const MOIS_LONGS = [
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

const MOIS_COURTS = [
  "janv.",
  "févr.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
];

// "2026-06-09" -> "9 juin 2026"
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${parseInt(day, 10)} ${MOIS_LONGS[parseInt(month, 10) - 1]} ${year}`;
};

// "12–15 juin", "28 juin – 2 juil." ou "12 juin"
const formatEventDate = (debut: string, fin: string | null) => {
  const [, mD, dD] = debut.split("-");
  const jD = parseInt(dD, 10);
  const moisD = MOIS_COURTS[parseInt(mD, 10) - 1];

  if (!fin) return `${jD} ${moisD}`;

  const [, mF, dF] = fin.split("-");
  const jF = parseInt(dF, 10);
  const moisF = MOIS_COURTS[parseInt(mF, 10) - 1];

  return mD === mF ? `${jD}–${jF} ${moisD}` : `${jD} ${moisD} – ${jF} ${moisF}`;
};

function Meta({
  categorie,
  date,
  dateFin,
}: {
  categorie: string;
  date: string;
  dateFin: string | null;
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-4 text-base text-stone-600">
      <span className="font-semibold text-[#9e5218]">
        {CATEGORY_LABELS[categorie] ?? categorie}
      </span>
      <span>
        {categorie === "evenement" && dateFin
          ? `Du ${formatDate(date)} au ${formatDate(dateFin)}`
          : formatDate(date)}
      </span>
    </p>
  );
}

// L'actualité principale : l'affiche est montrée en entier, sans cadre gris.
// Sans image, le texte prend toute la largeur : pas de faux visuel.
function FeaturedNews({ item }: { item: ActualiteAccueil }) {
  return (
    <Link
      href={`/actualites/${item.slug}`}
      className="group grid gap-8 md:grid-cols-5 md:items-start"
    >
      {item.imageUrl && (
        <div className="md:col-span-2">
          <Image
            src={item.imageUrl}
            alt={item.titre}
            width={item.imageWidth ?? 800}
            height={item.imageHeight ?? 1100}
            className="h-auto w-full"
            unoptimized
          />
        </div>
      )}

      <div className={item.imageUrl ? "md:col-span-3" : "md:col-span-5"}>
        <Meta
          categorie={item.categorie}
          date={item.date}
          dateFin={item.dateFin}
        />

        <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-stone-900 lg:text-4xl">
          {item.titre}
        </h3>

        {item.contenu && (
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-700 line-clamp-5">
            {item.contenu}
          </p>
        )}

        <span className="mt-6 inline-block text-base font-semibold text-[#9e5218] underline decoration-[#9e5218]/30 underline-offset-4 transition-colors group-hover:decoration-[#9e5218]">
          Lire la suite
        </span>
      </div>
    </Link>
  );
}

// Les actualités suivantes : lignes compactes, miniature seulement si elle existe.
function NewsRow({ item }: { item: ActualiteAccueil }) {
  return (
    <li className="border-t border-stone-300/70">
      <Link
        href={`/actualites/${item.slug}`}
        className="group flex items-start justify-between gap-6 py-6"
      >
        <div>
          <Meta
            categorie={item.categorie}
            date={item.date}
            dateFin={item.dateFin}
          />

          <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-stone-900 transition-colors group-hover:text-[#9e5218]">
            {item.titre}
          </h3>

          {item.contenu && (
            <p className="mt-2 max-w-xl text-base leading-relaxed text-stone-600 line-clamp-2">
              {item.contenu}
            </p>
          )}
        </div>

        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt=""
            width={96}
            height={128}
            className="h-28 w-20 shrink-0 object-cover object-top sm:h-32 sm:w-24"
            unoptimized
          />
        )}
      </Link>
    </li>
  );
}

export default async function NewsAndAgendaSection() {
  const today = new Date().toISOString().split("T")[0];

  let latestNews: ActualiteAccueil[];
  let upcomingEvents: Evenement[];

  try {
    [latestNews, upcomingEvents] = await Promise.all([
      getDernieresActualites(),
      getEvenementsAVenir(today),
    ]);
  } catch (error) {
    // Une panne de Sanity ne doit pas faire tomber toute la page d'accueil
    console.error("Erreur lors du chargement des actualités :", error);

    return (
      <section className="border-t border-stone-200/50 bg-stone-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">
            Actualités du village
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-700">
            Les actualités ne sont pas disponibles pour le moment.{" "}
            <Link
              href="/actualites"
              className="font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218]"
            >
              Consulter la page des actualités
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  const eventsByDate = latestNews
    .filter((item) => item.categorie === "evenement")
    .sort((a, b) => a.date.localeCompare(b.date));
  let eventIndex = 0;
  const orderedLatestNews = latestNews.map((item) =>
    item.categorie === "evenement" ? eventsByDate[eventIndex++] : item,
  );

  const [featured, ...others] = orderedLatestNews;
  const hasEvents = upcomingEvents.length > 0;

  return (
    <section className="border-t border-stone-200/50 bg-stone-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">
            Actualités du village
          </h2>

          <Link
            href="/actualites"
            className="text-base font-semibold text-stone-800 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218]"
          >
            Toutes les publications
          </Link>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className={hasEvents ? "lg:col-span-8" : "lg:col-span-12"}>
            {featured ? (
              <>
                <FeaturedNews item={featured} />

                {others.length > 0 && (
                  <ul className="mt-12 border-b border-stone-300/70">
                    {others.map((item) => (
                      <NewsRow key={item.slug} item={item} />
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="text-base text-stone-600">
                Aucune actualité récente à afficher.
              </p>
            )}
          </div>

          {hasEvents && (
            <aside className="lg:col-span-4 lg:border-l lg:border-stone-300/70 lg:pl-10">
              <h3 className="font-serif text-2xl font-semibold text-stone-900">
                À venir
              </h3>

              <ul className="mt-6">
                {upcomingEvents.map((event) => (
                  <li key={event.slug} className="border-t border-stone-300/70">
                    <Link
                      href={`/actualites/${event.slug}`}
                      className="group block py-5"
                    >
                      <p className="font-serif text-xl font-semibold text-[#9e5218]">
                        {formatEventDate(event.dateDebut, event.dateFin)}
                      </p>
                      <p className="mt-1 text-base font-semibold leading-snug text-stone-800 underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-stone-400">
                        {event.title}
                      </p>
                      {event.time && (
                        <p className="mt-1 text-base text-stone-600">
                          {event.time}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
