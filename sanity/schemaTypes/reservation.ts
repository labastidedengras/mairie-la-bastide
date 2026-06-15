import { defineField, defineType } from "sanity";

export default defineType({
  name: "reservation",
  title: "Réservations de la Salle",
  type: "document",
  fields: [
    defineField({
      name: "evenement",
      title: "Nom de l'événement / Motif",
      type: "string",
      description:
        "Exemple : Mariage - Famille Dupont, Repas Moto Club, AG Association...",
      validation: (Rule) =>
        Rule.required().error("Le nom de l'événement est obligatoire"),
    }),
    defineField({
      name: "typeLocataire",
      title: "Type de locataire",
      type: "string",
      options: {
        list: [
          { title: "Habitant de la commune", value: "habitant" },
          { title: "Extérieur", value: "exterieur" },
          { title: "Association du village", value: "association" },
          { title: "Événement Municipal (Mairie)", value: "mairie" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateDebut",
      title: "Date de début",
      type: "date",
      validation: (Rule) =>
        Rule.required().error("La date de début est obligatoire"),
    }),
    defineField({
      name: "dateFin",
      title: "Date de fin",
      type: "date",
      validation: (Rule) =>
        Rule.required().custom((dateFin, context) => {
          // On récupère la date de début depuis le document parent
          const document = context.document;
          const dateDebut = document?.dateDebut as string | undefined;

          if (!dateFin || !dateDebut) return true;

          // On compare les chaînes de caractères (le format YYYY-MM-DD se compare très bien ainsi)
          if (dateFin < dateDebut) {
            return "La date de fin doit être postérieure ou égale à la date de début";
          }

          return true;
        }),
    }),
    defineField({
      name: "statut",
      title: "Statut de la réservation",
      type: "string",
      options: {
        list: [
          { title: "Confirmée (Bloqué sur le site)", value: "confirmee" },
          { title: "Option / En attente", value: "option" },
        ],
        layout: "radio",
      },
      initialValue: "confirmee",
    }),
    defineField({
      name: "notesInternes",
      title: "Notes internes (Mairie uniquement)",
      type: "text",
      description:
        "Numéro de chèque de caution, état des lieux, remarques... (Ce champ ne sera jamais affiché sur le site)",
    }),
  ],
  preview: {
    select: {
      title: "evenement",
      date: "dateDebut",
    },
    prepare(selection) {
      const { title, date } = selection;
      const formattedDate = date
        ? new Date(date).toLocaleDateString("fr-FR")
        : "";
      return {
        title: title,
        subtitle: `Du ${formattedDate}`,
      };
    },
  },
});
