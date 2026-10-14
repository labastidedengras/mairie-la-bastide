"use client";

import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { ExternalLink, FileText, Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

const inputClass =
  "mt-2 block w-full rounded-sm border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 focus:border-[#9e5218] focus:outline focus:outline-2 focus:outline-[#9e5218] disabled:bg-stone-100 disabled:text-stone-500";

const pricing = [
  { label: "Contribuables du village (demi-journée)", value: "100 €" },
  { label: "Bastidains (week-end)", value: "120 €" },
  { label: "Non-contribuables (week-end)", value: "200 €" },
  { label: "Associations du village", value: "Gratuit" },
];

const REGLEMENT_URL = "/reglement-foyer-communal.pdf";

interface SallePolyvalenteClientProps {
  datesOccupees: string[];
}

export default function SallePolyvalenteClient({
  datesOccupees,
}: SallePolyvalenteClientProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    email: "",
    evenement: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reglementAccepte, setReglementAccepte] = useState(false);
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
    if (!selectedRange?.from || !selectedRange.to || !reglementAccepte) return;
    setIsSubmitting(true);
    setError(null);

    const formatDate = (date: Date) =>
      date.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    const toDateInput = (date: Date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    const dateDebut = toDateInput(selectedRange.from);
    const dateFin = toDateInput(selectedRange.to);

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          dateDebut,
          dateFin,
          reglementAccepte,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setSubmitted(true);
      setFormData({ nom: "", telephone: "", email: "", evenement: "" });
      setSelectedRange(undefined);
      setReglementAccepte(false);
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
          Foyer Communal
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Le Foyer Communal est disponible pour les habitants, les personnes
          extérieures et les associations du village. Le formulaire permet
          d&apos;envoyer une pré-demande : la réservation ne sera définitive
          qu&apos;après confirmation de la mairie.
        </p>

        <div className="mt-10 rounded-sm border border-stone-200 bg-stone-50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <FileText
              aria-hidden="true"
              className="h-6 w-6 shrink-0 text-[#9e5218]"
            />
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Règlement du Foyer Communal
            </h2>
          </div>
          <p className="mt-3 text-base leading-relaxed text-stone-700">
            Consultez le règlement avant d&apos;envoyer votre pré-demande.
          </p>
          <iframe
            src={`${REGLEMENT_URL}#view=FitH`}
            title="Règlement du Foyer Communal"
            className="mt-6 h-[32rem] w-full border border-stone-200 bg-white sm:h-[42rem]"
          />
          <a
            href={REGLEMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex items-center gap-2 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] ${focusRing}`}
          >
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            Ouvrir le règlement dans un nouvel onglet
          </a>
        </div>

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

              <p className="mt-5 text-sm leading-relaxed text-stone-600">
                Le tarif de 100 € correspond à une demi-journée. Les tarifs de
                week-end s&apos;appliquent selon le lieu de résidence.
              </p>

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
                  Votre pré-demande a bien été envoyée. La mairie vous
                  recontactera pour confirmer la disponibilité et les modalités
                  ; la réservation n&apos;est définitive qu&apos;après cette
                  confirmation.
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
                {/* Étape 1 : la période */}
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-stone-900">
                    <span className="text-stone-400">1.</span> Choisir une
                    période
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-stone-600">
                    Sélectionnez la date de début, puis celle de fin. Une seule
                    date suffit pour une demande sur une journée.
                  </p>

                  <div className="mt-6 w-full">
                    <Calendar
                      mode="range"
                      selected={selectedRange}
                      onSelect={setSelectedRange}
                      locale={fr}
                      disabled={isDayDisabled}
                      excludeDisabled
                      className="w-full p-0"
                      classNames={{ root: "w-full" }}
                      modifiersStyles={{
                        disabled: {
                          textDecoration: "line-through",
                          color: "#928f8d",
                          opacity: 0.6,
                        },
                      }}
                    />
                  </div>

                  <p
                    aria-live="polite"
                    className="mt-4 text-base font-semibold text-stone-900"
                  >
                    {selectedRange?.from && selectedRange.to
                      ? selectedRange.from.getTime() ===
                        selectedRange.to.getTime()
                        ? selectedRange.from.toLocaleDateString("fr-FR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : `Du ${selectedRange.from.toLocaleDateString("fr-FR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })} au ${selectedRange.to.toLocaleDateString(
                            "fr-FR",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}`
                      : selectedRange?.from
                        ? `Début : ${selectedRange.from.toLocaleDateString(
                            "fr-FR",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )} — sélectionnez la date de fin`
                        : "Aucune période sélectionnée"}
                  </p>
                </div>

                {/* Étape 2 : le formulaire, activé après le choix de la période */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="font-serif text-2xl font-semibold text-stone-900">
                    <span className="text-stone-400">2.</span> Pré-demande et
                    coordonnées
                  </h2>

                  {(!selectedRange?.from || !selectedRange.to) && (
                    <p className="text-base text-stone-500">
                      Choisissez une période à gauche pour activer le formulaire
                      de pré-demande.
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
                    disabled={
                      !selectedRange?.from || !selectedRange.to || isSubmitting
                    }
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
                    type="button"
                    aria-pressed={reglementAccepte}
                    disabled={
                      !selectedRange?.from || !selectedRange.to || isSubmitting
                    }
                    onClick={() => setReglementAccepte((accepted) => !accepted)}
                    className={`inline-flex w-full items-center justify-center rounded-sm border px-7 py-3.5 text-base font-semibold transition-colors ${focusRing} ${
                      !selectedRange?.from || !selectedRange.to || isSubmitting
                        ? "cursor-not-allowed border-stone-300 bg-stone-100 text-stone-400"
                        : reglementAccepte
                          ? "border-[#5c6b47] bg-[#5c6b47]/10 text-stone-900"
                          : "border-[#9e5218] text-stone-900 hover:bg-[#9e5218]/5"
                    }`}
                  >
                    {reglementAccepte
                      ? "Règlement accepté — cliquer pour annuler"
                      : "Accepter le règlement"}
                  </button>

                  <button
                    type="submit"
                    disabled={
                      !selectedRange?.from ||
                      !selectedRange.to ||
                      !reglementAccepte ||
                      isSubmitting
                    }
                    aria-busy={isSubmitting}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-base font-semibold text-white transition-colors ${
                      selectedRange?.from &&
                      selectedRange.to &&
                      reglementAccepte &&
                      !isSubmitting
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
