"use client";

import { Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

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

  // Correction TypeScript : Ajout des types pour l'événement de changement
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Soumission du formulaire connectée à l'API Route de Resend
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Une erreur est survenue.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Impossible d'envoyer le message pour le moment.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center mt-12">
          <span className="mb-4 inline-flex rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Nous contacter
          </span>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Une question ?
          </h1>

          {/* Correction ESLint : Échappement propre de l'apostrophe avec ' */}
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            L&apos;équipe de la mairie est à votre écoute pour répondre à vos
            demandes et questions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form Column */}
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-8">
                Envoyez-nous un message
              </h2>

              {submitted ? (
                <div className="rounded-2xl border border-green-200 bg-green-50/50 p-12 text-center backdrop-blur-sm">
                  <div className="mb-4 text-4xl text-green-600">✓</div>
                  <p className="text-lg font-semibold text-green-900 mb-2">
                    Merci ! Votre message a bien été reçu.
                  </p>
                  <p className="text-green-700 text-sm">
                    Nous vous recontacterons dans les meilleurs délais.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-xs text-stone-500 underline hover:text-stone-800"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-100">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-stone-900 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Votre nom"
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-[#8a7a5a] focus:outline-none focus:ring-1 focus:ring-[#8a7a5a] transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-900 mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="votre@email.com"
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-[#8a7a5a] focus:outline-none focus:ring-1 focus:ring-[#8a7a5a] transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-900 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Sujet de votre message"
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-[#8a7a5a] focus:outline-none focus:ring-1 focus:ring-[#8a7a5a] transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-900 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Votre message..."
                      rows={6} // Correction TypeScript : Attend un nombre {6} et non une string "6"
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-[#8a7a5a] focus:outline-none focus:ring-1 focus:ring-[#8a7a5a] transition-all resize-none disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#8a7a5a] px-7 py-4 font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#76693c] hover:scale-[1.01] hover:shadow-lg disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer le message"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info Column */}
            <div className="space-y-6">
              {/* Coordonnées réelles */}
              <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-stone-900 mb-8">
                  Coordonnées
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-stone-50 border border-stone-100 text-[#8a7a5a]">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Adresse
                      </p>
                      <p className="mt-1 text-sm text-stone-600 leading-relaxed">
                        9 rue des Mouchards
                        <br />
                        30330 La Bastide d&apos;Engras
                        <br />
                        France
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-stone-50 border border-stone-100 text-[#8a7a5a]">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Téléphone
                      </p>
                      <a
                        href="tel:0466728145"
                        className="mt-1 inline-block text-sm text-stone-600 hover:text-[#8a7a5a] transition"
                      >
                        04 66 72 81 45
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-stone-50 border border-stone-100 text-[#8a7a5a]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Adresse électronique
                      </p>
                      <a
                        href="mailto:la-bastide-dengras@wanadoo.fr"
                        className="mt-1 inline-block text-sm text-stone-600 hover:text-[#8a7a5a] transition break-all"
                      >
                        la-bastide-dengras@wanadoo.fr
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horaires réels */}
              <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-50 border border-stone-100 text-[#8a7a5a]">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">
                    Horaires d&apos;ouverture
                  </h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-stone-100 pb-3">
                    <span className="font-medium text-stone-900">Lundi</span>
                    <span className="text-stone-600">14h00 - 16h00</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-3">
                    <span className="font-medium text-stone-900">Mercredi</span>
                    <span className="text-stone-600">09h00 - 11h00</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-3">
                    <span className="font-medium text-stone-900">Vendredi</span>
                    <span className="text-stone-600">09h00 - 11h00</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="font-medium text-stone-400">
                      Mardi / Jeudi / Week-end
                    </span>
                    <span className="text-stone-400 italic">Fermé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localisation Réelle */}
      <section className="bg-white py-24 border-t border-stone-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-stone-900">
              Nous localiser
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              Retrouvez la mairie au cœur du village
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] shadow-sm border border-stone-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5730.900773806127!2d4.472076798902452!3d44.09469791763819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5b3e2db84e62d%3A0x400fec186664cf56!2sMAIRIE%20LA%20BASTIDE-D%27ENGRAS!5e0!3m2!1sfr!2sfr!4v1780992225597!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              aria-label="Carte Google Maps de la Mairie de La Bastide d'Engras"
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://maps.google.com/?q=Mairie+9+Rue+des+Mouchards+30330+La+Bastide-d'Engras"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#8a7a5a] px-7 py-4 font-semibold text-white shadow-md transition hover:bg-[#76693c] hover:scale-[1.02]"
            >
              Ouvrir dans Google Maps
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
