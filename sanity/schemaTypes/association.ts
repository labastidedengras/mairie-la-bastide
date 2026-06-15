import { defineField, defineType } from "sanity";

export default defineType({
  name: "association",
  title: "Associations",
  type: "document",
  fields: [
    defineField({
      name: "nom",
      title: "Nom de l'association",
      type: "string",
      validation: (Rule) => Rule.required().error("Le nom est obligatoire"),
    }),
    defineField({
      name: "slug",
      title: "Lien de la page (Slug)",
      type: "slug",
      description:
        "Cliquez sur 'Generate' pour créer automatiquement le lien à partir du nom",
      options: {
        source: "nom",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error(
          "Le slug est obligatoire pour créer la page individuelle",
        ),
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Loisirs & Animation", value: "loisirs" },
          { title: "Sport & Santé", value: "sport" },
          { title: "Environnement & Traditions", value: "environnement" },
          { title: "Culture & Art", value: "culture" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description courte",
      type: "text",
      description: "Sera affichée sur la page principale avec tous les blocs.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contenuDetaille",
      title: "Présentation détaillée",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Le texte complet qui apparaîtra sur la page unique de l'association (horaires, tarifs, histoire...)",
    }),
    defineField({
      name: "galeriePhotos",
      title: "Galerie de photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Description de la photo (Pour Google / Accessibilité)",
            },
          ],
        },
      ],
      description: "Ajoutez les photos de l'association",
    }),
    defineField({
      name: "contactNom",
      title: "Nom du contact (Président, Bureau...)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "telephone",
      type: "string",
      title: "Téléphone Mobile",
    }),
    defineField({
      name: "telephoneFixe",
      type: "string",
      title: "Téléphone Fixe",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Adresse Email",
    }),
    defineField({
      name: "iconKey",
      title: "Icône",
      type: "string",
      options: {
        list: [
          { title: "Étoiles (Loisirs)", value: "sparkles" },
          { title: "Trophée (Sport)", value: "trophy" },
          { title: "Cible (Chasse/Environnement)", value: "crosshair" },
          { title: "Haltère (Gym)", value: "dumbbell" },
          { title: "Pinceau (Art/Culture)", value: "paintbrush" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
