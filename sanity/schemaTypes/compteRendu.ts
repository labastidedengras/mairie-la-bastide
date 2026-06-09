import { defineField, defineType } from "sanity";

export default defineType({
  name: "compteRendu",
  title: "Comptes-rendus de Conseil",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre du compte-rendu",
      type: "string",
      description:
        "Exemple : Procès-verbal du Conseil Municipal - 12 Janvier 2026",
      validation: (Rule) => Rule.required().error("Le titre est obligatoire"),
    }),
    defineField({
      name: "datePublication",
      title: "Date de publication",
      type: "date",
      options: {
        dateFormat: "DD/MM/YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "annee",
      title: "Année du conseil",
      type: "string",
      options: {
        list: ["2026", "2025", "2024"],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fichierPdf",
      title: "Document PDF",
      type: "file",
      description: "Glissez-déposez le fichier PDF du compte-rendu ici",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) =>
        Rule.required().error("Vous devez ajouter un fichier PDF"),
    }),
  ],
});
