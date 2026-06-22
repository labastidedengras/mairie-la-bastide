import { client } from "@/sanity/lib/client";
import { MetadataRoute } from "next";

// Récupération des slugs pour les actualités
async function getSanityArticles(): Promise<string[]> {
  try {
    const query = `*[_type == "actualite" && defined(slug.current)].slug.current`;
    const slugs: string[] = await client.fetch(query);
    return slugs;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles Sanity pour le sitemap:",
      error,
    );
    return [];
  }
}

// 🛠️ Récupération dynamique des slugs pour les associations
async function getSanityAssociations(): Promise<string[]> {
  try {
    const query = `*[_type == "association" && defined(slug.current)].slug.current`;
    const slugs: string[] = await client.fetch(query);
    return slugs;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des associations Sanity pour le sitemap:",
      error,
    );
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.mairie-labastidedengras.fr";
  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/actualites`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/associations`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/vie-pratique/salle-polyvalente`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mairie/bulletin-municipal`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/vie-pratique/cni-passeport`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/vie-pratique/dechets-tri`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/mairie/comptes-rendus`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mairie/elus`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/vie-pratique/plu`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-de-confidentialite`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Génération des routes dynamiques pour les actualités
  const articleSlugs = await getSanityArticles();
  const articleRoutes = articleSlugs.map((slug) => ({
    url: `${baseUrl}/actualites/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 🛠️ Génération des routes dynamiques pour les associations
  const associationSlugs = await getSanityAssociations();
  const associationRoutes = associationSlugs.map((slug) => ({
    url: `${baseUrl}/associations/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const, // Les fiches d'assos changent moins souvent que les actus
    priority: 0.6,
  }));

  // On fusionne tout proprement (Statiques + Actus + Assos)
  return [...staticRoutes, ...articleRoutes, ...associationRoutes];
}
