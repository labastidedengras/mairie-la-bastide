import { client } from "@/sanity/lib/client";
import { MetadataRoute } from "next";

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
      priority: 0.6,
    },
    {
      url: `${baseUrl}/bulletin-municipal`,
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
      url: `${baseUrl}/demarches/cni-passeport`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/demarches/dechets-tri`,
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
      url: `${baseUrl}/urbanisme/plu`,
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

  const articleSlugs = await getSanityArticles();
  const dynamicRoutes = articleSlugs.map((slug) => ({
    url: `${baseUrl}/actualites/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
