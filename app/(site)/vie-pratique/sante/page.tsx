import { Clock3, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Santé",
  description:
    "Informations sur le Centre de santé Ma Région de Lussan à Audabiac, pour les habitants du SIVU Uzège Nord sans médecin traitant.",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

export default function SantePage() {
  return (
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9e5218]">
          Vie pratique
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Santé
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-700">
          Les habitants des communes du SIVU Uzège Nord, dont La
          Bastide-d&apos;Engras fait partie, qui ne disposent pas de médecin
          traitant peuvent, s&apos;ils le souhaitent, être suivis au{" "}
          <strong className="font-semibold text-stone-900">
            Centre de santé Ma Région de Lussan
          </strong>
          , situé à Audabiac. Pensez à préciser votre lieu de résidence lors de
          votre prise de contact.
        </p>

        <div className="mt-10 grid gap-8 border-y border-stone-200 py-8 sm:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
              <Clock3 aria-hidden="true" className="h-5 w-5 text-[#9e5218]" />
              Secrétariat
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Du lundi au vendredi
              <br />
              De 8 h 30 à 12 h et de 13 h à 16 h 30
            </p>
            <p className="mt-3 text-base leading-relaxed text-stone-600">
              Il est recommandé de prendre rendez-vous directement au cabinet.
            </p>
            <a
              href="tel:0411180064"
              className={`mt-4 inline-flex items-center gap-2 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] ${focusRing}`}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              04 11 18 00 64
            </a>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
              <MapPin aria-hidden="true" className="h-5 w-5 text-[#9e5218]" />
              Adresse
            </h2>
            <address className="mt-3 text-base not-italic leading-relaxed text-stone-700">
              3680 route d&apos;Audabiac
              <br />
              Hameau d&apos;Audabiac
              <br />
              30580 Lussan
            </address>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Carte du centre de santé
          </h2>
          <iframe
            title="Carte Google Maps du 3680 route d'Audabiac, 30580 Lussan"
            src="https://www.google.com/maps?output=embed&q=3680%20Audabiac&z=16&hl=fr"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="mt-5 block h-[24rem] w-full rounded-sm border-0 sm:h-[32rem]"
          />
        </div>
      </div>
    </section>
  );
}
