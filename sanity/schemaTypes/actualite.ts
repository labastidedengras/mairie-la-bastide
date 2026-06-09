import { defineField, defineType } from "sanity";

export default defineType({
  name: "actualite",
  title: "Actualités & Alertes", // Nom du menu pour le maire
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre de l'actualité",
      type: "string",
      validation: (Rule) => Rule.required().error("Le titre est obligatoire"),
    }),
    defineField({
      name: "slug",
      title: "Lien de la page (Slug)",
      type: "slug",
      description:
        'Cliquez simplement sur le bouton "Generate" après avoir écrit le titre.',
      options: {
        source: "titre", // Il prend la source depuis le champ "titre"
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error("Veuillez générer le lien avant de publier"),
    }),
    defineField({
      name: "datePublication",
      title: "Date de publication",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0], // Met automatiquement la date d'aujourd'hui
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Vie Municipale", value: "vie-municipale" },
          { title: "Événement & Festivités", value: "evenement" },
          { title: "Travaux & Routes", value: "travaux" },
          { title: "Alerte Info", value: "alerte" },
        ],
        layout: "radio", // Des boutons à cocher, encore plus simple qu'une liste déroulante
      },
      validation: (Rule) =>
        Rule.required().error("Veuillez choisir une catégorie"),
    }),

    /* 🛠️ AJOUT : Date de Début de l'événement */
    defineField({
      name: "dateDebutEvenement",
      title: "Date de début de l'événement",
      description:
        "À remplir pour les événements à venir. L'agenda utilisera cette date au lieu de la date de publication.",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      hidden: ({ document }) => document?.categorie !== "evenement",
    }),

    /* 🛠️ AJOUT : Date de Fin de l'événement (Optionnelle) */
    defineField({
      name: "dateFinEvenement",
      title: "Date de fin de l'événement (Optionnel)",
      description:
        "À remplir UNIQUEMENT si l'événement dure plusieurs jours (ex: un festival).",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      hidden: ({ document }) => document?.categorie !== "evenement",
    }),

    defineField({
      name: "imagePrincipale",
      title: "Image d'illustration (Optionnel)",
      type: "image",
      options: {
        hotspot: true, // Permet au maire de recadrer visuellement la photo directement dans Sanity !
      },
    }),
    defineField({
      name: "contenu",
      title: "Texte de l'article (Optionnel)",
      type: "text", // Un champ texte simple et propre. Si tu veux du gras/italique plus tard, on mettra du 'array' de block.
      description: "Écrivez les détails de l'actualité ici.",
    }),
    defineField({
      name: "documentJoint",
      title: "Document PDF joint (Optionnel)",
      description:
        "Exemple : Arrêté municipal, programme complet, affiche PDF...",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
  ],
});
