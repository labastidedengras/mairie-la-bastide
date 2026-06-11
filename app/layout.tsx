import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mairie-labastidedengras.fr";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mairie de La Bastide d'Engras - Site Officiel",
    template: "%s | Mairie de La Bastide d'Engras",
  },
  description:
    "Bienvenue sur le site officiel de la commune de La Bastide d'Engras (30330) dans le Gard. Retrouvez les actualités, démarches administratives et comptes-rendus du conseil municipal.",
  keywords: [
    "La Bastide d'Engras",
    "Mairie La Bastide d'Engras",
    "30330",
    "Commune Gard",
    "Vie municipale",
    "Démarches administratives",
  ],
  authors: [{ name: "Mairie de La Bastide d'Engras" }],
  openGraph: {
    title: "Mairie de La Bastide d'Engras - Site Officiel",
    description:
      "Retrouvez toutes les informations et actualités de la commune de La Bastide d'Engras.",
    url: baseUrl,
    siteName: "Mairie de La Bastide d'Engras",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "La Bastide d'Engras",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(
        "h-full",
        "antialiased",
        jakartaFont.className,
        "font-sans",
      )}
    >
      <body className="min-h-full bg-stone-50 text-stone-900">{children}</body>
    </html>
  );
}
