import { UserRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Le conseil municipal et les élus",
  description: "Le maire et les conseillers municipaux de La Bastide-d'Engras.",
};

const maire = {
  prenom: "Laurent",
  nom: "PARIS",
  photo: null as string | null,
};

const groupes = [
  {
    titre: "Les adjoints au maire",
    membres: [
      {
        prenom: "Nathalie",
        nom: "DUFAUD",
        fonction: "1ère adjointe",
        photo: null,
      },
      {
        prenom: "Valentin",
        nom: "FOUQUET",
        fonction: "2ème adjoint",
        photo: null,
      },
      {
        prenom: "Chantal",
        nom: "CARON",
        fonction: "3ème adjointe",
        photo: "/images/elus/chantal-caron.jpg",
      },
    ],
  },
  {
    titre: "Conseillères et conseillers municipaux",
    membres: [
      {
        prenom: "Jean-Pierre",
        nom: "CARON",
        photo: "/images/elus/jean-pierre-caron.jpg",
      },
      { prenom: "Frédéric", nom: "MASSART", photo: null },
      { prenom: "Chantal", nom: "CHABRIER", photo: null },
      { prenom: "Thierry", nom: "COVELO", photo: null },
      { prenom: "Séverine", nom: "DUFAUD", photo: null },
      { prenom: "Romain", nom: "LANGLASSE", photo: null },
      { prenom: "Marie", nom: "JOUVENEL", photo: null },
    ],
  },
];

function Portrait({
  photo,
  alt,
  className,
  iconClassName,
}: {
  photo: string | null;
  alt: string;
  className: string;
  iconClassName: string;
}) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-stone-100 text-stone-500 ${className}`}
    >
      {photo ? (
        <Image
          src={photo}
          alt={alt}
          fill
          sizes="(max-width: 640px) 64px, 96px"
          className="object-cover"
        />
      ) : (
        <UserRound aria-hidden="true" className={iconClassName} />
      )}
    </div>
  );
}

export default function ElusPage() {
  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Vos élus
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Les décisions du conseil municipal sont publiées dans les{" "}
          <Link
            href="/mairie/comptes-rendus"
            className="font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]"
          >
            comptes rendus
          </Link>
          .
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Le maire : un seul nom, donc un seul grand titre */}
          <div className="lg:col-span-5">
            <Portrait
              photo={maire.photo}
              alt={`${maire.prenom} ${maire.nom}, maire de La Bastide-d'Engras`}
              className="mb-8 aspect-[4/5] w-full max-w-sm"
              iconClassName="size-20"
            />
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Le maire
            </h2>
            <p className="mt-4 font-serif text-4xl font-semibold leading-tight text-stone-900 lg:text-5xl">
              {maire.prenom} {maire.nom}
            </p>
          </div>

          {/* Les autres élus : une liste, pas dix cartes identiques */}
          <div className="space-y-14 lg:col-span-7">
            {groupes.map((groupe) => (
              <div key={groupe.titre}>
                <h2 className="font-serif text-2xl font-semibold text-stone-900">
                  {groupe.titre}
                </h2>
                <ul className="mt-5 grid border-b border-stone-200 sm:grid-cols-2 sm:gap-x-10">
                  {groupe.membres.map((membre) => (
                    <li
                      key={`${membre.prenom}-${membre.nom}`}
                      className="flex items-center gap-4 border-t border-stone-200 py-4"
                    >
                      <Portrait
                        photo={membre.photo}
                        alt={`${membre.prenom} ${membre.nom}`}
                        className="size-16 rounded-full"
                        iconClassName="size-7"
                      />
                      <span>
                        <span className="block font-serif text-xl text-stone-900">
                          {membre.prenom} {membre.nom}
                        </span>
                        {"fonction" in membre && (
                          <span className="mt-1 block text-sm text-stone-600">
                            {membre.fonction}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
