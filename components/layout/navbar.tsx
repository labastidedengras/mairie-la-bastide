"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PHONE_LABEL = "04 66 72 81 45";
const PHONE_HREF = "tel:0466728145";

// Seules ces pages ont une photo derrière la barre : ailleurs, elle est pleine dès le départ.
const TRANSPARENT_ROUTES = ["/"];

// Une seule source pour le menu desktop ET mobile.
const menu = [
  {
    label: "La mairie",
    items: [
      { label: "Vos élus", href: "/mairie/elus" },
      { label: "Comptes rendus du conseil", href: "/mairie/comptes-rendus" },
    ],
  },
  {
    label: "Vie pratique",
    items: [
      { label: "CNI & passeport", href: "/vie-pratique/cni-passeport" },
      { label: "Urbanisme & PLU", href: "/vie-pratique/plu" },
      { label: "Déchets & tri", href: "/vie-pratique/dechets-tri" },
      { label: "Salle polyvalente", href: "/vie-pratique/salle-polyvalente" },
    ],
  },
  {
    label: "Vie locale",
    items: [
      { label: "Actualités du village", href: "/actualites" },
      { label: "Vie associative", href: "/associations" },
      { label: "Bulletin municipal", href: "/mairie/bulletin-municipal" },
    ],
  },
];

// Les couleurs viennent de variables définies sur le <header> (voir plus bas).
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nav-ring)]";

const topItem = `inline-flex h-11 items-center gap-1 rounded-sm px-3 text-base font-medium text-[var(--nav-fg)] underline-offset-8 transition-colors hover:underline aria-[current=page]:underline data-[open=true]:underline data-[current=true]:underline ${focusRing}`;

function MobileLink({
  href,
  label,
  pathname,
  className,
  onClick,
}: {
  href: string;
  label: string;
  pathname: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "block py-2.5 text-base text-stone-700 transition-colors hover:text-[#9e5218] aria-[current=page]:font-semibold aria-[current=page]:text-[#9e5218]",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navRef = useRef<HTMLElement | null>(null);
  // Vrai si le sous-menu a été ouvert par un simple survol à la souris
  const openedByHover = useRef(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll(); // état correct dès le montage (rechargement en milieu de page)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clic ou toucher en dehors du menu : on ferme
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  // Clic / Entrée / Espace sur un titre de sous-menu
  const toggle = (label: string) => {
    if (openMenu === label) {
      if (openedByHover.current) {
        // Ouvert au survol puis cliqué : on "épingle" le menu au lieu de le fermer
        openedByHover.current = false;
        return;
      }
      setOpenMenu(null);
    } else {
      openedByHover.current = false;
      setOpenMenu(label);
    }
  };

  const solid = isScrolled || !TRANSPARENT_ROUTES.includes(pathname);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-white focus:px-4 focus:py-3 focus:text-base focus:font-semibold focus:text-stone-900 focus:outline focus:outline-2 focus:outline-[#9e5218]"
      >
        Aller au contenu
      </a>

      <header
        data-solid={solid}
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent py-4 transition-colors duration-200 [--nav-fg:#ffffff] [--nav-ring:#ffffff] data-[solid=true]:border-stone-200 data-[solid=true]:bg-white data-[solid=true]:[--nav-fg:#1c1917] data-[solid=true]:[--nav-ring:#9e5218]"
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className={`group/logo flex items-center gap-3 ${focusRing}`}
          >
            <Image
              // À remplacer par le vrai fichier du blason (SVG ou PNG)
              src="/favicon.ico"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 object-contain"
            />
            <span className="leading-tight text-[var(--nav-fg)]">
              <span className="hidden text-base opacity-80 sm:block">
                République française
              </span>
              <span className="block font-serif text-lg font-semibold underline-offset-4 group-hover/logo:underline sm:text-xl">
                Mairie de La Bastide d&apos;Engras
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {/* Navigation desktop : boutons "disclosure" + panneaux, sans bibliothèque */}
            <nav
              ref={navRef}
              aria-label="Navigation principale"
              className="hidden xl:block"
            >
              <ul className="flex items-center gap-1">
                <li>
                  <Link
                    href="/"
                    aria-current={pathname === "/" ? "page" : undefined}
                    onClick={() => setOpenMenu(null)}
                    className={topItem}
                  >
                    Accueil
                  </Link>
                </li>

                {menu.map((group, index) => {
                  const isOpen = openMenu === group.label;
                  const isCurrent = group.items.some(
                    (item) => item.href === pathname,
                  );
                  const panelId = `submenu-${index}`;

                  return (
                    <li
                      key={group.label}
                      className="relative"
                      onPointerEnter={(e) => {
                        if (e.pointerType !== "mouse") return;
                        openedByHover.current = true;
                        setOpenMenu(group.label);
                      }}
                      onPointerLeave={(e) => {
                        if (e.pointerType !== "mouse") return;
                        // On ne ferme au départ de la souris que si le menu n'a pas été épinglé
                        if (openedByHover.current) {
                          setOpenMenu((current) =>
                            current === group.label ? null : current,
                          );
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape" && isOpen) {
                          setOpenMenu(null);
                          e.currentTarget.querySelector("button")?.focus();
                        }
                      }}
                      onBlur={(e) => {
                        // Le focus part vers un autre élément hors de ce sous-menu
                        if (
                          e.relatedTarget &&
                          !e.currentTarget.contains(e.relatedTarget as Node)
                        ) {
                          setOpenMenu((current) =>
                            current === group.label ? null : current,
                          );
                        }
                      }}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        data-open={isOpen}
                        data-current={isCurrent}
                        onClick={() => toggle(group.label)}
                        className={topItem}
                      >
                        {group.label}
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Le pt-2 comble l'espace entre le bouton et la boîte : le survol ne se perd pas */}
                      <div
                        id={panelId}
                        className={`absolute left-0 top-full z-50 w-72 pt-2 ${
                          isOpen ? "block" : "hidden"
                        }`}
                      >
                        <ul className="rounded-sm border border-stone-200 bg-white p-2 shadow-sm">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                aria-current={
                                  pathname === item.href ? "page" : undefined
                                }
                                onClick={() => setOpenMenu(null)}
                                className="block rounded-sm px-3 py-2.5 text-base text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#9e5218] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#9e5218] aria-[current=page]:font-semibold aria-[current=page]:text-[#9e5218]"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}

                <li>
                  <Link
                    href="/contact"
                    aria-current={pathname === "/contact" ? "page" : undefined}
                    onClick={() => setOpenMenu(null)}
                    className={topItem}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2 rounded-sm bg-[#9e5218] px-4 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#854311] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nav-ring)] xl:flex"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {PHONE_LABEL}
            </a>

            {/* Menu mobile */}
            <div className="xl:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger
                  aria-label="Ouvrir le menu"
                  className={`flex h-11 w-11 items-center justify-center rounded-sm text-[var(--nav-fg)] transition-colors hover:bg-black/10 ${focusRing}`}
                >
                  <Menu aria-hidden="true" className="h-6 w-6" />
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="flex w-[320px] flex-col overflow-y-auto border-l border-stone-200 bg-white px-6 pb-6 pt-14"
                >
                  <SheetTitle className="sr-only">
                    Menu de navigation
                  </SheetTitle>

                  <nav aria-label="Navigation principale" className="flex-1">
                    <ul className="flex flex-col gap-6">
                      <li>
                        <MobileLink
                          href="/"
                          label="Accueil"
                          pathname={pathname}
                          onClick={() => setIsSheetOpen(false)}
                          className="py-1 font-serif text-xl font-semibold text-stone-900"
                        />
                      </li>

                      {menu.map((group) => (
                        <li key={group.label}>
                          <p className="font-serif text-xl font-semibold text-stone-900">
                            {group.label}
                          </p>
                          <ul className="mt-1">
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <MobileLink
                                  href={item.href}
                                  label={item.label}
                                  pathname={pathname}
                                  onClick={() => setIsSheetOpen(false)}
                                />
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}

                      <li>
                        <MobileLink
                          href="/contact"
                          label="Contact"
                          pathname={pathname}
                          onClick={() => setIsSheetOpen(false)}
                          className="py-1 font-serif text-xl font-semibold text-stone-900"
                        />
                      </li>
                    </ul>
                  </nav>

                  <a
                    href={PHONE_HREF}
                    className="mt-8 flex items-center justify-center gap-2 rounded-sm bg-[#9e5218] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#854311]"
                  >
                    <Phone aria-hidden="true" className="h-4 w-4" />
                    Appeler le {PHONE_LABEL}
                  </a>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
