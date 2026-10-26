import {
  getAssociationBySlug,
  getAssociationSlugs,
  type AssociationDetail,
} from "@/sanity/queries";
import type {
  PortableTextBlock,
  PortableTextComponentProps,
} from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const portableTextComponents = {
  block: {
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="mb-5 whitespace-pre-line text-lg leading-relaxed text-stone-800">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="mb-5 list-disc space-y-1.5 pl-5 text-lg leading-relaxed text-stone-800">
        {children}
      </ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="mb-5 list-decimal space-y-1.5 pl-5 text-lg leading-relaxed text-stone-800">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li>{children}</li>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li>{children}</li>
    ),
  },
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]";

function NotFound({ reason }: { reason: string }) {
  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl">
          Association introuvable
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">{reason}</p>

        <Link
          href="/vie-locale/associations"
          className={`group mt-8 inline-flex items-center gap-2 text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-[#9e5218] ${focusRing}`}
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour aux associations
        </Link>
      </div>
    </section>
  );
}

export default async function AssociationUniquePage({ params }: PageProps) {
  const { slug } = await params;

  let asso: AssociationDetail | null;
  try {
    asso = await getAssociationBySlug(slug);
  } catch (error) {
    console.error("Erreur lors du chargement de l'association :", error);
    return (
      <NotFound reason="Cette page n'est pas disponible pour le moment. Réessayez dans quelques instants." />
    );
  }

  if (!asso) {
    return (
      <NotFound reason="Cette association n'existe pas, ou a été retirée." />
    );
  }

  const photos = asso.photos ?? [];
  const hasContact = Boolean(
    asso.contactNom || asso.telephone || asso.telephoneFixe || asso.email,
  );

  return (
    // pt-32 : la barre de navigation est fixe, elle ne doit pas masquer le titre
    <section className="bg-white pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/vie-locale/associations"
          className={`group inline-flex items-center gap-2 text-base font-semibold text-stone-600 transition-colors hover:text-[#9e5218] ${focusRing}`}
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Toutes les associations
        </Link>

        <header className="mt-8">
          {asso.categorie && (
            <p className="text-base font-semibold text-[#9e5218]">
              {asso.categorie}
            </p>
          )}
          <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl">
            {asso.nom}
          </h1>
        </header>

        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {asso.contenuDetaille ? (
              <PortableText
                value={asso.contenuDetaille}
                components={portableTextComponents}
              />
            ) : asso.description ? (
              <p className="whitespace-pre-line text-lg leading-relaxed text-stone-800">
                {asso.description}
              </p>
            ) : null}

            {hasContact && (
              <div className="mt-12 border-t border-stone-200 pt-8">
                <h2 className="font-serif text-xl font-semibold text-stone-900">
                  Contact
                </h2>
                {asso.contactNom && (
                  <p className="mt-2 text-base text-stone-700">
                    {asso.contactNom}
                  </p>
                )}
                <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                  {asso.telephone && (
                    <li>
                      <a
                        href={`tel:${asso.telephone.replace(/\s/g, "")}`}
                        className={`text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218] ${focusRing}`}
                      >
                        {asso.telephone}
                      </a>
                    </li>
                  )}
                  {asso.telephoneFixe && (
                    <li>
                      <a
                        href={`tel:${asso.telephoneFixe.replace(/\s/g, "")}`}
                        className={`text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218] ${focusRing}`}
                      >
                        {asso.telephoneFixe}
                      </a>
                    </li>
                  )}
                  {asso.email && (
                    <li>
                      <a
                        href={`mailto:${asso.email}`}
                        className={`break-all text-base font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-[#9e5218] ${focusRing}`}
                      >
                        {asso.email}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {photos.length > 0 && (
            <aside className="lg:col-span-5">
              <div className="flex flex-col gap-6">
                {photos.map((photoUrl, index) => (
                  <div
                    key={photoUrl}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100"
                  >
                    <Image
                      src={photoUrl}
                      alt={`${asso.nom} — photo ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 35vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const asso = await getAssociationBySlug(slug);
    if (!asso) return { title: "Association introuvable" };

    const description =
      asso.description || `L'association ${asso.nom}, à La Bastide-d'Engras.`;

    return {
      title: asso.nom,
      description,
      openGraph: { title: asso.nom, description, type: "article" },
    };
  } catch (error) {
    console.error("Erreur generateMetadata (association) :", error);
    return { title: "Association" };
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getAssociationSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Erreur generateStaticParams (association) :", error);
    return [];
  }
}
