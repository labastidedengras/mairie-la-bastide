"use client";

import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { CalendarDays, Info, Loader2, Send } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";

interface SallePolyvalenteClientProps {
  datesOccupees: string[];
}

export default function SallePolyvalenteClient({
  datesOccupees,
}: SallePolyvalenteClientProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const isDayDisabled = (date: Date) => {
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const dateLocale = `${yyyy}-${mm}-${dd}`;

    return date < aujourdhui || datesOccupees.includes(dateLocale);
  };

  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    email: "",
    evenement: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* 🖼️ Hero Banner */}
      <section
        className="relative min-h-[400px] flex items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url(/images/hero-1.jpg)" }} // Pense à mettre une belle photo du foyer ici
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center mt-12">
          <span className="mb-4 inline-flex rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Services Municipaux
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Salle Polyvalente
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 leading-relaxed">
            Consultez le calendrier des disponibilités en temps réel et
            planifiez vos événements familiaux ou associatifs.
          </p>
        </div>
      </section>

      {/* 🗓️ Section Calendrier + Infos */}
      <div className="mx-auto max-w-7xl px-6 -mt-10 relative z-20 grid gap-8 lg:grid-cols-3">
        {/* Colonne de Gauche : Tarifs et Infos */}
        <div className="bg-white p-8 rounded-[2rem] border border-stone-200/80 shadow-lg flex flex-col justify-between h-full">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-50 border border-stone-100 text-[#8a7a5a] shadow-inner mb-6">
              <Info className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">
              Modalités de location
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light">
              La salle polyvalente est disponible à la location pour les
              habitants de la commune ainsi que pour les personnes extérieures.
            </p>

            <div className="space-y-4 border-t border-stone-100 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">
                  Habitants du village (Week-end)
                </span>
                <span className="font-semibold text-stone-900">150 €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Extérieurs (Week-end)</span>
                <span className="font-semibold text-stone-900">350 €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Caution ménage</span>
                <span className="font-semibold text-stone-900">80 €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Caution dégradations</span>
                <span className="font-semibold text-stone-900">500 €</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 text-xs text-stone-400 space-y-1">
            <p>⚠️ Pièces à fournir lors de la signature :</p>
            <p>• Attestation d&apos;assurance responsabilité civile</p>
            <p>• Chèques de caution à l&apos;ordre du Trésor Public</p>
          </div>
        </div>

        {/* Colonne du Milieu : Le Calendrier Visuel */}
        <div className="bg-white p-8 rounded-[2rem] border border-stone-200/80 shadow-lg flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-4 self-start">
            <CalendarDays className="h-5 w-5 text-[#8a7a5a]" />
            <h2 className="text-xl font-bold text-stone-900">
              Calendrier des disponibilités
            </h2>
          </div>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={fr}
            disabled={isDayDisabled}
            className="rounded-md border border-stone-100 p-4 bg-stone-50/50 scale-105 md:scale-110 my-4"
            modifiersStyles={{
              disabled: {
                textDecoration: "line-through",
                color: "#d6d3d1",
                opacity: 0.5,
              },
            }}
          />

          <div className="flex gap-6 text-xs mt-4 self-start border-t border-stone-100 pt-4 w-full">
            <div className="flex items-center gap-1.5 text-stone-600">
              <span className="h-3 w-3 rounded-full bg-[#8a7a5a]" /> Disponible
              / Sélectionné
            </div>
            <div className="flex items-center gap-1.5 text-stone-400">
              <span className="h-3 w-3 rounded-full bg-stone-200 line-through" />{" "}
              Déjà réservé ou passé
            </div>
          </div>
        </div>

        {/* Colonne de Droite : Formulaire d'option */}
        <div className="bg-white p-8 rounded-[2rem] border border-stone-200/80 shadow-lg">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Faire une demande
          </h2>
          <p className="text-stone-500 text-xs mb-6">
            Sélectionnez une date sur le calendrier pour pré-remplir votre
            demande.
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-green-200 bg-green-50/50 p-12 text-center">
              <div className="mb-4 text-4xl text-green-600">✓</div>
              <p className="text-lg font-semibold text-green-900 mb-2">
                Demande envoyée !
              </p>
              <p className="text-green-700 text-sm">
                La mairie vous recontactera dans les meilleurs délais.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs text-stone-500 underline hover:text-stone-800"
              >
                Nouvelle demande
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-100">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="M. ou Mme..."
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 px-4 text-sm focus:border-[#8a7a5a] focus:bg-white focus:outline-none transition-all disabled:opacity-50"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="06..."
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 px-4 text-sm focus:border-[#8a7a5a] focus:bg-white focus:outline-none transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="adresse@mail.com"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 px-4 text-sm focus:border-[#8a7a5a] focus:bg-white focus:outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                  Date souhaitée
                </label>
                <input
                  type="text"
                  readOnly
                  value={
                    selectedDate
                      ? selectedDate.toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Veuillez cliquer sur une date"
                  }
                  className="w-full rounded-xl border border-stone-200 bg-stone-100 py-2.5 px-4 text-sm text-stone-600 font-medium focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                  Nature de l&apos;événement
                </label>
                <textarea
                  name="evenement"
                  value={formData.evenement}
                  onChange={handleChange}
                  rows={3}
                  disabled={isSubmitting}
                  placeholder="Ex : Repas d'anniversaire en famille (environ 40 personnes)..."
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 px-4 text-sm focus:border-[#8a7a5a] focus:bg-white focus:outline-none transition-all resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedDate || isSubmitting}
                className={`w-full flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white shadow-md transition-all ${
                  selectedDate && !isSubmitting
                    ? "bg-[#8a7a5a] hover:bg-[#76693c] cursor-pointer"
                    : "bg-stone-300 cursor-not-allowed shadow-none"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Envoi en
                    cours...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Envoyer la demande
                    d&apos;option
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
