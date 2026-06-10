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
        list: [
          { title: "2024", value: "2024" },
          { title: "2025", value: "2025" },
          { title: "2026", value: "2026" },
          { title: "2027", value: "2027" },
          { title: "2028", value: "2028" },
          { title: "2029", value: "2029" },
          { title: "2030", value: "2030" },
        ],
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
