import GalleryLightbox from "@/components/features/associations/gallery-lightbox";
import { client } from "@/sanity/lib/client";
import type {
  PortableTextBlock,
  PortableTextComponentProps,
} from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
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
      <div className="w-full h-20 md:h-[84px] bg-stone-900 shrink-0" />
      <div className="min-h-screen bg-stone-50 py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/associations"
            className="inline-flex items-center gap-2 text-sm text-[#b5651d] mb-6 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Retour aux associations
          </Link>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-stone-900 mb-4 md:mb-6">
            {asso.nom}
          </h1>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Main content */}
            <main className="md:col-span-2">
              <div className="prose prose-stone max-w-none mb-8">
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

              {/* Contact rapide */}
              <div className="rounded-2xl bg-white p-4 border border-stone-200 shadow-sm mb-8">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Contact : {asso.contactNom}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                  {asso.telephone && (
                    <a
                      href={`tel:${asso.telephone.replace(/\s/g, "")}`}
                      className="hover:text-[#b5651d]"
                    >
                      {asso.telephone}
                    </a>
                  )}
                  {asso.telephoneFixe && (
                    <a
                      href={`tel:${asso.telephoneFixe.replace(/\s/g, "")}`}
                      className="hover:text-[#b5651d]"
                    >
                      {asso.telephoneFixe}
                    </a>
                  )}
                  {asso.email && (
                    <a
                      href={`mailto:${asso.email}`}
                      className="hover:text-[#b5651d] break-all"
                    >
                      {asso.email}
                    </a>
                  )}
                </div>
              </div>
            </main>

            {/* Aside / Gallery */}
            {asso.photos && asso.photos.length > 0 && (
              <section className="mb-12">
                <h2 className="font-serif text-lg sm:text-xl font-medium text-stone-900 mb-4">
                  Galerie photos
                </h2>
                <GalleryLightbox photos={asso.photos} title={asso.nom} />
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // On récupère uniquement ce dont on a besoin pour le SEO
  const query = `*[_type == "association" && slug.current == $slug][0] { nom, description }`;
  const asso = await client.fetch(query, { slug });

  // Fallback si l'association n'existe pas
  if (!asso) {
    return {
      title: "Association introuvable - Mairie de La Bastide d'Engras",
    };
  }

  return {
    title: `${asso.nom} - Association à La Bastide d'Engras`,
    description:
      asso.description ||
      `Découvrez l'association ${asso.nom} de la commune de La Bastide d'Engras.`,
    openGraph: {
      title: `${asso.nom} - La Bastide d'Engras`,
      description: asso.description,
      type: "article",
    },
  };
}

// Génération statique magique pour le Webhook !
export async function generateStaticParams() {
  const query = `*[_type == "association"] { "slug": slug.current }`;
  const assos = await client.fetch(query);
  return assos.map((asso: { slug: string }) => ({ slug: asso.slug }));
}
