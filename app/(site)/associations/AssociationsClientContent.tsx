"use client";

import {
  ArrowRight,
  Crosshair,
  Dumbbell,
  HelpCircle,
  LucideIcon,
  Mail,
  Paintbrush,
  Phone,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const ICON_MAP: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  trophy: Trophy,
  crosshair: Crosshair,
  dumbbell: Dumbbell,
  paintbrush: Paintbrush,
};

interface Association {
  nom: string;
  slug: string;
  categorie: string;
  description: string;
  contactNom: string;
  telephone?: string | null;
  telephoneFixe?: string | null;
  email?: string | null;
  iconKey: string;
}

const categories = [
  { id: "all", label: "Toutes" },
  { id: "sport", label: "Sport & Santé" },
  { id: "culture", label: "Arts & Culture" },
  { id: "loisirs", label: "Animations & Loisirs" },
  { id: "environnement", label: "Nature & Chasse" },
];

export default function AssociationsClientContent({
  initialAssociations,
}: {
  initialAssociations: Association[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredAssociations = useMemo(() => {
    return initialAssociations.filter((asso) => {
      const matchesSearch =
        asso.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asso.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asso.contactNom.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || asso.categorie === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, initialAssociations]);

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* 🖼️ Bannière Hero avec effet Parallax */}
      <section
        className="relative min-h-[450px] flex items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: "url(/images/hero-1.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center mt-12">
          <span className="mb-4 inline-flex rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Vie associative
          </span>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Les Associations
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-white/90 leading-relaxed">
            Découvrez les clubs, ateliers et comités de La Bastide-d&apos;Engras
            qui font vivre et rayonner notre commune au quotidien.
          </p>
        </div>
      </section>

      {/* 🏢 Contenu de la page */}
      <div className="mx-auto max-w-7xl px-6 -mt-10 relative z-20">
        {/* Barre de recherche et Filtres */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-[2rem] border border-stone-200/80 shadow-lg">
          {/* Input de recherche */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Rechercher une activité, un président..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-stone-200 bg-stone-50 py-3 pl-12 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8a7a5a] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8a7a5a] transition-all"
            />
          </div>

          {/* Boutons de catégorie */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#8a7a5a] text-white shadow-md shadow-[#8a7a5a]/20"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des associations */}
        {filteredAssociations.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredAssociations.map((asso) => {
              const IconComponent = ICON_MAP[asso.iconKey] || HelpCircle;
              return (
                <article
                  key={asso.nom}
                  className="relative group flex flex-col justify-between rounded-[2rem] border border-stone-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#8a7a5a]/30"
                >
                  <div>
                    {/* Catégorie + Icône */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-50 border border-stone-100 text-[#8a7a5a] shadow-inner">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                        {categories.find((c) => c.id === asso.categorie)
                          ?.label || asso.categorie}
                      </span>
                    </div>

                    {/* Titre & Description */}
                    <h2 className="text-2xl font-bold text-stone-900 group-hover:text-[#8a7a5a] transition-colors">
                      {/* C'est ce lien invisible (after:inset-0) qui rend toute la carte cliquable */}
                      <Link
                        href={`/associations/${asso.slug}`}
                        className="focus:outline-none after:absolute after:inset-0 after:rounded-[2rem]"
                      >
                        {asso.nom}
                      </Link>
                    </h2>

                    <p className="mt-3 text-stone-600 text-sm leading-relaxed font-light line-clamp-3">
                      {asso.description}
                    </p>

                    {/* Le petit mot discret qui s'anime au survol de la carte */}
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#8a7a5a] group-hover:text-[#76693c] transition-colors">
                      <span>Voir la fiche complète</span>
                      <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Infos Contact Réelles (le z-10 permet de garder ces liens cliquables individuellement sans être bloqués par le lien global) */}
                  <div className="relative z-10 mt-8 pt-6 border-t border-stone-100">
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                      Contact : {asso.contactNom}
                    </p>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-stone-500">
                      {asso.telephone && (
                        <a
                          href={`tel:${asso.telephone.replace(/\s/g, "")}`}
                          className="flex items-center gap-1.5 hover:text-[#8a7a5a] transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5 text-stone-400" />
                          {asso.telephone}
                        </a>
                      )}
                      {asso.telephoneFixe && (
                        <a
                          href={`tel:${asso.telephoneFixe.replace(/\s/g, "")}`}
                          className="flex items-center gap-1.5 hover:text-[#8a7a5a] transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5 text-stone-400" />
                          {asso.telephoneFixe} (Fixe)
                        </a>
                      )}
                      {asso.email && (
                        <a
                          href={`mailto:${asso.email}`}
                          className="flex items-center gap-1.5 hover:text-[#8a7a5a] transition-colors break-all"
                        >
                          <Mail className="h-3.5 w-3.5 text-stone-400" />
                          {asso.email}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Fallback si recherche vide */
          <div className="text-center py-20 bg-white border border-stone-200 rounded-[2rem]">
            <p className="text-stone-500 font-medium">
              Aucune activité ni association ne correspond à vos critères.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 text-sm font-semibold text-[#8a7a5a] underline hover:text-[#76693c]"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Note de pied de page Mairie */}
        <div className="mt-16 text-center bg-stone-200/40 rounded-[1.5rem] p-6 border border-stone-200/60 max-w-2xl mx-auto">
          <p className="text-sm text-stone-600">
            Vous faites partie du bureau d&apos;une de ces associations et vous
            souhaitez modifier une information ou ajouter un événement à
            l&apos;agenda ? Contactez directement le secrétariat de la mairie.
          </p>
        </div>
      </div>
    </div>
  );
}
