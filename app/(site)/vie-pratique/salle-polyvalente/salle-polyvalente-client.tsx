"use client";

import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

const inputClass =
  "mt-2 block w-full rounded-sm border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 focus:border-[#9e5218] focus:outline focus:outline-2 focus:outline-[#9e5218] disabled:bg-stone-100 disabled:text-stone-500";

const pricing = [
  { label: "Habitants du village (week-end)", value: "150 €" },
  { label: "Extérieurs (week-end)", value: "350 €" },
  { label: "Caution ménage", value: "80 €" },
  { label: "Caution dégradations", value: "500 €" },
];

interface SallePolyvalenteClientProps {
  datesOccupees: string[];
}

export default function SallePolyvalenteClient({
  datesOccupees,
}: SallePolyvalenteClientProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    email: "",
    evenement: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const isDayDisabled = (date: Date) => {
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return date < aujourdhui || datesOccupees.includes(`${yyyy}-${mm}-${dd}`);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate) return;
    setIsSubmitting(true);
    setError(null);

    const date = selectedDate.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, date }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setSubmitted(true);
      setFormData({ nom: "", telephone: "", email: "", evenement: "" });
      setSelectedDate(undefined);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Impossible d'envoyer la demande.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Salle polyvalente
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Disponible à la location pour les habitants de la commune comme pour
          les personnes extérieures.
        </p>

        <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-16">
          {/* Tarifs et pièces à fournir */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-serif text-2xl font-semibold text-stone-900">
                Tarifs
              </h2>
              <ul className="mt-4 border-b border-stone-200">
                {pricing.map((row) => (
                  <li
                    key={row.label}
                    className="flex justify-between gap-6 border-t border-stone-200 py-3 text-base"
                  >
                    <span className="text-stone-700">{row.label}</span>
                    <span className="font-semibold text-stone-900">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-serif text-xl font-semibold text-stone-900">
                Pièces à fournir à la signature
              </h2>
              <ul className="mt-3 space-y-1.5 text-base leading-relaxed text-stone-700">
                <li>Attestation d&apos;assurance responsabilité civile</li>
                <li>Chèques de caution à l&apos;ordre du Trésor public</li>
              </ul>
            </div>
          </div>

          {/* Réservation : calendrier et formulaire forment un seul parcours en deux étapes */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="border-l-4 border-[#5c6b47] py-2 pl-6">
                <h2
                  ref={successRef}
                  tabIndex={-1}
                  className="font-serif text-2xl font-semibold text-stone-900 focus:outline-none"
                >
                  Demande envoyée
                </h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-stone-700">
                  La mairie vous recontactera pour confirmer la disponibilité et
                  les modalités.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className={`mt-6 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218] ${focusRing}`}
                >
                  Faire une nouvelle demande
                </button>
              </div>
            ) : (
              <div className="grid gap-12 md:grid-cols-2 md:gap-10">
                {/* Étape 1 : la date */}
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-stone-900">
                    <span className="text-stone-400">1.</span> Choisir une date
                  </h2>

                  <div className="mt-6 flex justify-center md:justify-start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={fr}
                      disabled={isDayDisabled}
                      className="p-0"
                      modifiersStyles={{
                        disabled: {
                          textDecoration: "line-through",
                          color: "#d6d3d1",
                          opacity: 0.6,
                        },
                      }}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-base text-stone-600">
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full bg-[#9e5218]"
                      />
                      Disponible
                    </span>
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full bg-stone-300"
                      />
                      Déjà réservé ou passé
                    </span>
                  </div>

                  <p
                    aria-live="polite"
                    className="mt-4 text-base font-semibold text-stone-900"
                  >
                    {selectedDate
                      ? selectedDate.toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Aucune date sélectionnée"}
                  </p>
                </div>

                {/* Étape 2 : le formulaire, avant la date choisie sinon désactivé */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="font-serif text-2xl font-semibold text-stone-900">
                    <span className="text-stone-400">2.</span> Vos coordonnées
                  </h2>

                  {!selectedDate && (
                    <p className="text-base text-stone-500">
                      Choisissez une date à gauche pour activer le formulaire.
                    </p>
                  )}

                  {error && (
                    <div
                      role="alert"
                      className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-base text-red-900"
                    >
                      {error}
                    </div>
                  )}

                  <fieldset
                    disabled={!selectedDate || isSubmitting}
                    className="space-y-6 disabled:opacity-40"
                  >
                    <legend className="sr-only">
                      Coordonnées et description de l&apos;événement
                    </legend>

                    <div>
                      <label
                        htmlFor="nom"
                        className="block text-base font-semibold text-stone-900"
                      >
                        Nom complet
                      </label>
                      <input
                        id="nom"
                        type="text"
                        name="nom"
                        autoComplete="name"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="telephone"
                          className="block text-base font-semibold text-stone-900"
                        >
                          Téléphone
                        </label>
                        <input
                          id="telephone"
                          type="tel"
                          name="telephone"
                          autoComplete="tel"
                          value={formData.telephone}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-base font-semibold text-stone-900"
                        >
                          E-mail
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="evenement"
                        className="block text-base font-semibold text-stone-900"
                      >
                        Nature de l&apos;événement
                      </label>
                      <textarea
                        id="evenement"
                        name="evenement"
                        value={formData.evenement}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Ex. repas d'anniversaire en famille, environ 40 personnes"
                        className={`${inputClass} resize-y`}
                      />
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    disabled={!selectedDate || isSubmitting}
                    aria-busy={isSubmitting}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-base font-semibold text-white transition-colors ${
                      selectedDate && !isSubmitting
                        ? `bg-[#9e5218] hover:bg-[#854311] ${focusRing}`
                        : "cursor-not-allowed bg-stone-300"
                    }`}
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
                      "Envoyer la demande"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
