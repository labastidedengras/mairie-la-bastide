"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

const inputClass =
  "mt-2 block w-full rounded-sm border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 focus:border-[#9e5218] focus:outline focus:outline-2 focus:outline-[#9e5218] disabled:bg-stone-100 disabled:text-stone-500";

const subscribeToDay = () => () => {};
const getClientDay = () => new Date().getDay();
const getServerDay = () => null;

// 0 = dimanche … 6 = samedi
const hours = [
  { label: "Lundi", time: "14h00 – 16h00", days: [1] },
  { label: "Mercredi", time: "09h00 – 11h00", days: [3] },
  { label: "Vendredi", time: "09h00 – 11h00", days: [5] },
  { label: "Mardi, jeudi et week-end", time: "Fermé", days: [0, 2, 4, 6] },
];

const fields = [
  { name: "name", label: "Nom complet", type: "text", autoComplete: "name" },
  {
    name: "email",
    label: "Adresse e-mail",
    type: "email",
    autoComplete: "email",
  },
  { name: "subject", label: "Sujet", type: "text", autoComplete: "off" },
] as const;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const today = useSyncExternalStore(
    subscribeToDay,
    getClientDay,
    getServerDay,
  );
  const successRef = useRef<HTMLHeadingElement>(null);

  // Après l'envoi, on place le focus sur la confirmation (le formulaire a disparu)
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Une erreur est survenue.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'envoyer le message pour le moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre */}
      <section className="bg-white pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Contacter la mairie
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
            Le plus simple est d&apos;appeler pendant les heures
            d&apos;ouverture. Vous pouvez aussi nous écrire avec le formulaire,
            ou passer à la mairie.
          </p>

          <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Coordonnées et horaires : du texte, sans cartes ni icônes */}
            <div className="lg:col-span-5">
              <h2 className="font-serif text-2xl font-semibold text-stone-900">
                Nous joindre
              </h2>

              <a
                href="tel:0466728145"
                className={`mt-4 inline-block font-serif text-4xl font-semibold text-stone-900 underline decoration-stone-300 underline-offset-8 transition-colors hover:decoration-[#9e5218] ${focusRing}`}
              >
                04 66 72 81 45
              </a>

              <p className="mt-4">
                <a
                  href="mailto:la-bastide-dengras@wanadoo.fr"
                  className={`break-words text-lg text-stone-800 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] ${focusRing}`}
                >
                  la-bastide-dengras@wanadoo.fr
                </a>
              </p>

              <address className="mt-8 text-base not-italic leading-relaxed text-stone-700">
                9 rue des Mouchards
                <br />
                30330 La Bastide-d&apos;Engras
                <br />
                France
              </address>

              <h2 className="mt-14 font-serif text-2xl font-semibold text-stone-900">
                Horaires d&apos;ouverture
              </h2>

              <ul className="mt-5 border-b border-stone-200 text-base">
                {hours.map((row) => {
                  const isToday = today !== null && row.days.includes(today);
                  return (
                    <li
                      key={row.label}
                      className={`flex justify-between gap-6 border-t border-stone-200 py-3 ${
                        isToday
                          ? "font-semibold text-stone-900"
                          : "text-stone-700"
                      }`}
                    >
                      <span>
                        {row.label}
                        {isToday && (
                          <span className="ml-2 font-normal text-[#9e5218]">
                            (aujourd&apos;hui)
                          </span>
                        )}
                      </span>
                      <span>{row.time}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-7">
              <div aria-live="polite">
                {submitted ? (
                  <div className="border-l-4 border-[#5c6b47] py-2 pl-6">
                    <h2
                      ref={successRef}
                      tabIndex={-1}
                      className="font-serif text-2xl font-semibold text-stone-900 focus:outline-none"
                    >
                      Message envoyé
                    </h2>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-stone-700">
                      Le secrétariat lira votre message à sa prochaine
                      ouverture.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className={`mt-6 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] ${focusRing}`}
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-stone-900">
                        Écrire à la mairie
                      </h2>
                      <p className="mt-2 text-base text-stone-600">
                        Tous les champs sont obligatoires.
                      </p>
                    </div>

                    {error && (
                      <div
                        role="alert"
                        className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-base text-red-900"
                      >
                        {error}
                      </div>
                    )}

                    {fields.map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-base font-semibold text-stone-900"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          type={field.type}
                          name={field.name}
                          autoComplete={field.autoComplete}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className={inputClass}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-base font-semibold text-stone-900"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={7}
                        className={`${inputClass} resize-y`}
                      />
                    </div>

                    <p className="text-base text-stone-600">
                      Ces informations servent uniquement à répondre à votre
                      demande.{" "}
                      <Link
                        href="/politique-de-confidentialite"
                        className={`underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218] ${focusRing}`}
                      >
                        Politique de confidentialité
                      </Link>
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#9e5218] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#854311] disabled:opacity-70 sm:w-auto ${focusRing}`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            aria-hidden="true"
                            className="h-5 w-5 animate-spin"
                          />
                          Envoi en cours…
                        </>
                      ) : (
                        "Envoyer le message"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La carte va d'un bord à l'autre de l'écran */}
      <section className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 py-10">
          <h2 className="font-serif text-3xl font-semibold text-stone-900">
            Nous localiser
          </h2>
          <a
            href="https://maps.google.com/?q=Mairie+9+Rue+des+Mouchards+30330+La+Bastide-d'Engras"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] ${focusRing}`}
          >
            Ouvrir dans Google Maps
            <span className="sr-only"> (nouvelle fenêtre)</span>
          </a>
        </div>

        <iframe
          title="Carte : emplacement de la mairie de La Bastide-d'Engras"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5730.900773806127!2d4.472076798902452!3d44.09469791763819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5b3e2db84e62d%3A0x400fec186664cf56!2sMAIRIE%20LA%20BASTIDE-D%27ENGRAS!5e0!3m2!1sfr!2sfr!4v1780992225597!5m2!1sfr!2sfr"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[26rem] w-full border-0"
        />
      </section>
    </>
  );
}
