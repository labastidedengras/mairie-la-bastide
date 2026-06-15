import { client } from "@/sanity/lib/client";
import type {
  PortableTextBlock,
  PortableTextComponentProps,
} from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const portableTextComponents = {
  block: {
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="whitespace-pre-line mb-4 text-stone-600 leading-relaxed font-light">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="list-disc list-inside mb-4 text-stone-600 font-light space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="list-decimal list-inside mb-4 text-stone-600 font-light space-y-1">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
};

export default async function AssociationUniquePage({ params }: PageProps) {
  const { slug } = await params;

  const query = `*[_type == "association" && slug.current == $slug][0] {
    nom,
    categorie,
    description,
    contenuDetaille,
    contactNom,
    telephone,
    telephoneFixe,
    email,
    "photos": galeriePhotos[].asset->url
  }`;

  const asso = await client.fetch(query, { slug });

  if (!asso)
    return <div className="text-center py-20">Association introuvable</div>;

  return (
    <>
      <div className="w-full h-[84px] bg-stone-900 shrink-0" />
      <div className="min-h-screen bg-stone-50 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/associations"
            className="inline-flex items-center gap-2 text-sm text-[#8a7a5a] mb-8 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Retour aux associations
          </Link>

          <h1 className="text-4xl font-bold text-stone-900 md:text-5xl mb-6">
            {asso.nom}
          </h1>

          {/* Contenu textuel riche */}
          <div className="prose prose-stone max-w-none mb-12">
            {asso.contenuDetaille ? (
              <PortableText
                value={asso.contenuDetaille}
                components={portableTextComponents}
              />
            ) : (
              <p className="text-stone-600 whitespace-pre-line">
                {asso.description}
              </p>
            )}
          </div>

          {/* Galerie photos si elle existe */}
          {asso.photos && asso.photos.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">
                Galerie photos
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {asso.photos.map((url: string, index: number) => (
                  <div
                    key={index}
                    className="relative h-48 overflow-hidden rounded-2xl border border-stone-200 shadow-sm group"
                  >
                    <Image
                      src={url}
                      alt={`Photo ${asso.nom}`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

// Génération statique magique pour le Webhook !
export async function generateStaticParams() {
  const query = `*[_type == "association"] { "slug": slug.current }`;
  const assos = await client.fetch(query);
  return assos.map((asso: { slug: string }) => ({ slug: asso.slug }));
}
