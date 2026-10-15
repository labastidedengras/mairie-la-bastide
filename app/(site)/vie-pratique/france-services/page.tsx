import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "France Services",
  description:
    "Horaires et coordonnées des Maisons France Services d'Uzès et de Lussan.",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

export default function FranceServicesPage() {
  return (
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9e5218]">
          Vie pratique
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          France Services
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-700">
          Les Maisons France Services vous accompagnent gratuitement dans vos
          démarches administratives.
        </p>

        <div className="mt-10 grid gap-8 border-y border-stone-200 py-8 sm:grid-cols-2">
          <section aria-labelledby="uzes-heading">
            <h2
              id="uzes-heading"
              className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900"
            >
              <Clock3 aria-hidden="true" className="h-5 w-5 text-[#9e5218]" />
              Uzès
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Lundi, mercredi et jeudi
              <br />
              De 9 h à 12 h et de 14 h à 17 h
            </p>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Mardi
              <br />
              De 9 h à 12 h
            </p>
            <address className="mt-4 flex items-start gap-2 text-base not-italic leading-relaxed text-stone-700">
              <MapPin
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 text-[#9e5218]"
              />
              Bâtiment Alzon, place des Cordeliers
            </address>
          </section>

          <section aria-labelledby="lussan-heading">
            <h2
              id="lussan-heading"
              className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900"
            >
              <Clock3 aria-hidden="true" className="h-5 w-5 text-[#9e5218]" />
              Lussan
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Vendredi
              <br />
              De 9 h à 12 h
            </p>
            <address className="mt-4 flex items-start gap-2 text-base not-italic leading-relaxed text-stone-700">
              <MapPin
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 text-[#9e5218]"
              />
              Mairie de Lussan, place du Château
            </address>
          </section>
        </div>

        <section aria-labelledby="contact-heading" className="mt-10">
          <h2
            id="contact-heading"
            className="font-serif text-xl font-semibold text-stone-900"
          >
            Contact
          </h2>
          <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:gap-8">
            <a
              href="tel:0466032058"
              className={`inline-flex items-center gap-2 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-[#9e5218] hover:decoration-[#9e5218] ${focusRing}`}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              04 66 03 20 58
            </a>
            <a
              href="mailto:mfs@ccpaysduzes.fr"
              className={`inline-flex items-center gap-2 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-[#9e5218] hover:decoration-[#9e5218] ${focusRing}`}
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              mfs@ccpaysduzes.fr
            </a>
          </div>
        </section>

        <section aria-labelledby="plaquette-heading" className="mt-14">
          <h2
            id="plaquette-heading"
            className="font-serif text-2xl font-semibold text-stone-900 sm:text-3xl"
          >
            Plaquette France Services
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-700">
            Retrouvez les informations sur les sites fixes d&apos;Uzès et de
            Lussan sur l&apos;affiche ci-dessous.
          </p>
          <Image
            src="/images/france-services.jpg"
            alt="Affiche des Maisons France Services fixes et itinérante de la Communauté de communes Pays d'Uzès, avec horaires à Uzès et Lussan et coordonnées de contact."
            width={1755}
            height={1200}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="mt-5 h-auto w-full border border-stone-200"
          />
        </section>
      </div>
    </section>
  );
}
