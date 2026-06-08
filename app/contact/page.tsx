"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 inline-flex rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Nous contacter
          </span>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Une question ?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            L'équipe de la mairie est à votre écoute pour répondre à vos
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
                <div className="rounded-2xl border-2 border-green-500 bg-green-50 p-12 text-center">
                  <div className="mb-4 text-4xl">✓</div>
                  <p className="text-lg font-semibold text-green-900 mb-2">
                    Merci ! Votre message a bien été reçu.
                  </p>
                  <p className="text-green-800">
                    Nous vous recontacterons dans les meilleurs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="Votre nom"
                      className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
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
                      placeholder="votre@email.com"
                      className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
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
                      placeholder="Sujet de votre message"
                      className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
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
                      placeholder="Votre message..."
                      rows="6"
                      className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#8a7a5a] px-7 py-4 font-medium text-white transition hover:scale-[1.02]"
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>

            {/* Info Column */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div className="rounded-2xl border border-stone-200 bg-white p-8 transition hover:shadow-lg">
                <h3 className="text-2xl font-semibold text-stone-900 mb-8">
                  Coordonnées
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-stone-100">
                      <MapPin className="h-6 w-6 text-stone-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Adresse
                      </p>
                      <p className="mt-1 text-stone-600">
                        123 Place du Village
                        <br />
                        30000 Votre Commune
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-stone-100">
                      <Phone className="h-6 w-6 text-stone-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Téléphone
                      </p>
                      <a
                        href="tel:0466000000"
                        className="mt-1 text-stone-600 hover:text-stone-900 transition"
                      >
                        04 66 00 00 00
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-stone-100">
                      <Mail className="h-6 w-6 text-stone-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Email
                      </p>
                      <a
                        href="mailto:contact@mairie.fr"
                        className="mt-1 text-stone-600 hover:text-stone-900 transition"
                      >
                        contact@mairie.fr
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="rounded-2xl border border-stone-200 bg-white p-8 transition hover:shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100">
                    <Clock className="h-6 w-6 text-stone-700" />
                  </div>
                  <h3 className="text-2xl font-semibold text-stone-900">
                    Horaires
                  </h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-900">
                      Lundi - Vendredi
                    </span>
                    <span className="text-stone-600">9h00 - 12h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span></span>
                    <span className="text-stone-600">14h00 - 17h00</span>
                  </div>
                  <div className="border-t border-stone-200 pt-4 flex justify-between">
                    <span className="font-medium text-stone-900">Samedi</span>
                    <span className="text-stone-600">9h00 - 12h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-900">Dimanche</span>
                    <span className="text-stone-600">Fermé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-stone-900">
              Nous localiser
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              Trouvez facilement la mairie sur la carte
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.1234567890!2d4.2345!3d44.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5a5a5a5a5a5a5%3A0x1234567890abcdef!2sLa%20Bastide-d'Engras!5e0!3m2!1sfr!2sfr!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://maps.google.com/?q=La+Bastide-d'Engras"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#8a7a5a] px-7 py-4 font-medium text-white transition hover:scale-[1.02]"
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
