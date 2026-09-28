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
  // Une vraie photo vaut mieux qu'une icône : renseigne le chemin ici (ex. "/images/maire.jpg")
  photo: null as string | null,
};

// Le rôle est le titre du groupe : inutile de le répéter sur chaque nom.
// Pour ajouter les adjoints, ajoute un groupe { titre: "Adjoints", membres: [...] } avant celui-ci.
const groupes = [
  {
    titre: "Conseillères et conseillers municipaux",
    membres: [
      { prenom: "Nathalie", nom: "DUFAUD" },
      { prenom: "Chantal", nom: "CARON" },
      { prenom: "Jean-Pierre", nom: "CARON" },
      { prenom: "Frédéric", nom: "MASSART" },
      { prenom: "Chantal", nom: "CHABRIER" },
      { prenom: "Thierry", nom: "COVELO" },
      { prenom: "Séverine", nom: "DUFAUD" },
      { prenom: "Romain", nom: "LANGLASSE" },
      { prenom: "Marie", nom: "JOUVENEL" },
      { prenom: "Valentin", nom: "FOUQUET" },
    ],
  },
];

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
            {maire.photo && (
              <Image
                src={maire.photo}
                alt={`${maire.prenom} ${maire.nom}, maire de La Bastide-d'Engras`}
                width={600}
                height={750}
                className="mb-8 h-auto w-full max-w-sm"
              />
            )}
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
                      className="border-t border-stone-200 py-4 font-serif text-xl text-stone-900"
                    >
                      {membre.prenom} {membre.nom}
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
