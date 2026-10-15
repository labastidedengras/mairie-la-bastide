import {
  ArrowUpRight,
  CalendarDays,
  Clapperboard,
  HeartHandshake,
  Waves,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loisirs et activités",
  description:
    "Informations sur le CCAS et liens pratiques vers les loisirs et activités autour de La Bastide-d'Engras.",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e5218]";

const activities = [
  {
    title: "Programme de l'Ombrière",
    description:
      "Découvrez les spectacles et les rendez-vous proposés à l'Ombrière, à Uzès.",
    href: "https://lombriere.fr/",
    linkLabel: "Cliquez ici pour consulter le programme de l'Ombrière",
    Icon: CalendarDays,
  },
  {
    title: "Cinéma Le Capitole d'Uzès",
    description:
      "Retrouvez les informations pratiques et l'emplacement du cinéma à Uzès.",
    href: "https://www.cinemacapitole.fr/",
    linkLabel: "Cliquez ici pour trouver le cinéma Le Capitole d'Uzès",
    Icon: Clapperboard,
  },
  {
    title: "Piscine d'Uzès",
    description:
      "Consultez les informations pratiques et l'emplacement de la piscine d'Uzès.",
    href: "https://piscine-ccpaysduzes.fr/",
    linkLabel: "Cliquez ici pour trouver la piscine d'Uzès",
    Icon: Waves,
  },
];

export default function LoisirsActivitesPage() {
  return (
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9e5218]">
          Vie locale
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Loisirs et Activités
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-700">
          Retrouvez ici des informations utiles sur le CCAS et des liens vers
          des activités et équipements à Uzès.
        </p>

        <section
          aria-labelledby="ccas-heading"
          className="mt-12 border-y border-stone-200 py-8"
        >
          <div className="flex items-start gap-4">
            <HeartHandshake
              aria-hidden="true"
              className="mt-1 h-6 w-6 shrink-0 text-[#9e5218]"
            />
            <div>
              <h2
                id="ccas-heading"
                className="font-serif text-2xl font-semibold text-stone-900"
              >
                CCAS
              </h2>
              <p className="mt-3 text-base leading-relaxed text-stone-700">
                Une affiche d&apos;information sur le Centre communal
                d&apos;action sociale est en préparation. Elle sera publiée sur
                cette page dès qu&apos;elle sera disponible.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="sorties-heading" className="mt-14">
          <h2
            id="sorties-heading"
            className="font-serif text-2xl font-semibold text-stone-900 sm:text-3xl"
          >
            Sorties et activités à Uzès
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-700">
            Pour les personnes âgées et toutes celles et ceux qui souhaitent
            accéder à ces informations, chaque lien est indiqué clairement
            ci-dessous.
          </p>

          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {activities.map(({ title, description, href, linkLabel, Icon }) => (
              <li
                key={title}
                className="flex flex-col border border-stone-200 bg-stone-50 p-6 sm:p-8"
              >
                <h3 className="flex items-center gap-3 font-serif text-xl font-semibold text-stone-900">
                  <Icon
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-[#9e5218]"
                  />
                  {title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-stone-700">
                  {description}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex items-center gap-2 self-start text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-[#9e5218] hover:decoration-[#9e5218] ${focusRing}`}
                >
                  {linkLabel}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only"> (nouvelle fenêtre)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
