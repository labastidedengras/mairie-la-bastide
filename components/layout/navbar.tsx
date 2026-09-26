"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const desktopNavItemClass = isScrolled
    ? "!bg-transparent !text-slate-900 hover:!bg-transparent hover:!text-slate-900 focus-visible:!bg-transparent focus-visible:!text-slate-900"
    : "!bg-transparent !text-white hover:!bg-transparent hover:!text-white focus-visible:!bg-transparent focus-visible:!text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/95 text-slate-900 shadow-md backdrop-blur-md py-4"
          : "bg-transparent text-white py-6"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all duration-200"
            aria-label="Retour à l'accueil — Mairie de La Bastide d'Engras"
          >
            <div className="relative h-9 w-9 shrink-0 sm:h-10 sm:w-10 transition-transform duration-300 group-hover:scale-102">
              <Image
                src="/favicon.ico"
                alt="Blason officiel de la commune de La Bastide d'Engras"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="flex flex-col justify-center leading-tight">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 sm:text-[10px]">
                République Française
              </span>

              <span
                className={`font-serif text-base font-bold transition-colors group-hover:text-[#d98a4e] sm:text-lg ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                Mairie de La Bastide d&apos;Engras
              </span>
            </div>
          </Link>

          <NavigationMenu className="hidden justify-self-center lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={`${navigationMenuTriggerStyle()} ${desktopNavItemClass}`}
                >
                  Accueil
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={desktopNavItemClass}>
                  La Mairie
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 rounded-sm border-t-[3px] border border-stone-200 bg-white p-3 text-stone-900 shadow-sm">
                    <li>
                      <NavigationMenuLink
                        href="/mairie/elus"
                        className="block rounded-sm p-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#9e5218] focus-visible:bg-stone-50 focus-visible:text-[#9e5218]"
                      >
                        Vos Élus
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/mairie/comptes-rendus"
                        className="block rounded-sm p-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#9e5218] focus-visible:bg-stone-50 focus-visible:text-[#9e5218]"
                      >
                        Comptes-rendus du Conseil
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={desktopNavItemClass}>
                  Vie Pratique
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 rounded-sm border-t-[3px] border border-stone-200 bg-white p-3 text-stone-900 shadow-sm">
                    <li>
                      <NavigationMenuLink
                        href="/vie-pratique/cni-passeport"
                        className="block rounded-sm p-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#9e5218] focus-visible:bg-stone-50 focus-visible:text-[#9e5218]"
                      >
                        CNI &amp; Passeport
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/vie-pratique/plu"
                        className="block rounded-sm p-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#9e5218] focus-visible:bg-stone-50 focus-visible:text-[#9e5218]"
                      >
                        Urbanisme &amp; PLU
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/vie-pratique/dechets-tri"
                        className="block rounded-sm p-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#9e5218] focus-visible:bg-stone-50 focus-visible:text-[#9e5218]"
                      >
                        Déchets &amp; Tri
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/vie-pratique/salle-polyvalente"
                        className="block rounded-sm p-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#9e5218] focus-visible:bg-stone-50 focus-visible:text-[#9e5218]"
                      >
                        Salle Polyvalente
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={desktopNavItemClass}>
                  Vie Locale
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 rounded-sm border-t-[3px] border border-stone-200 bg-white p-3 text-stone-900 shadow-sm">
                    <li>
                      <NavigationMenuLink
                        href="/actualites"
                        className="block rounded-sm p-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#9e5218] focus-visible:bg-stone-50 focus-visible:text-[#9e5218]"
                      >
                        Actualités du village
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/associations"
                        className="block rounded-sm p-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#9e5218] focus-visible:bg-stone-50 focus-visible:text-[#9e5218]"
                      >
                        Vie associative
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/mairie/bulletin-municipal"
                        className="block rounded-sm p-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#9e5218] focus-visible:bg-stone-50 focus-visible:text-[#9e5218]"
                      >
                        Bulletin Municipal
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-sm bg-[#d98a4e] px-4 py-2 text-sm font-semibold text-stone-950 transition-colors hover:bg-[#e5a16e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5651d] lg:flex lg:justify-self-end"
          >
            <UserRound aria-hidden="true" className="h-4 w-4" />
            Contacter la mairie
          </Link>

          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger
                aria-label="Ouvrir le menu mobile"
                className={`rounded-sm p-2 transition-colors ${
                  isScrolled
                    ? "text-stone-900 hover:bg-stone-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Menu className="h-6 w-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] border-l border-stone-200 bg-white px-6 py-6 flex flex-col justify-between"
              >
                <div>
                  <SheetTitle className="sr-only">
                    Menu de navigation mobile
                  </SheetTitle>

                  <nav className="mt-2 flex flex-col gap-6 text-stone-900">
                    <Link
                      href="/"
                      className="text-lg font-medium pt-1 hover:text-[#9e5218] transition-colors"
                      onClick={handleLinkClick}
                    >
                      Accueil
                    </Link>

                    <div className="space-y-3 flex flex-col mt-2 text-sm font-medium">
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        La mairie
                      </p>

                      <Link
                        href="/mairie/elus"
                        onClick={handleLinkClick}
                        className="hover:text-[#9e5218] transition-colors"
                      >
                        Vos Élus
                      </Link>

                      <Link
                        href="/mairie/comptes-rendus"
                        onClick={handleLinkClick}
                        className="hover:text-[#9e5218] transition-colors"
                      >
                        Comptes-rendus du Conseil
                      </Link>
                    </div>

                    <div className="space-y-3 flex flex-col mt-3 text-sm font-medium">
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        Vie pratique
                      </p>

                      <Link
                        href="/vie-pratique/cni-passeport"
                        onClick={handleLinkClick}
                        className="hover:text-[#9e5218] transition-colors"
                      >
                        CNI &amp; Passeport
                      </Link>

                      <Link
                        href="/vie-pratique/plu"
                        onClick={handleLinkClick}
                        className="hover:text-[#9e5218] transition-colors"
                      >
                        Urbanisme &amp; PLU
                      </Link>

                      <Link
                        href="/vie-pratique/dechets-tri"
                        onClick={handleLinkClick}
                        className="hover:text-[#9e5218] transition-colors"
                      >
                        Déchets &amp; Tri
                      </Link>

                      <Link
                        href="/vie-pratique/salle-polyvalente"
                        onClick={handleLinkClick}
                        className="hover:text-[#9e5218] transition-colors"
                      >
                        Salle Polyvalente
                      </Link>
                    </div>

                    <div className="space-y-3 flex flex-col mt-3 text-sm font-medium">
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        Vie locale
                      </p>

                      <Link
                        href="/actualites"
                        onClick={handleLinkClick}
                        className="hover:text-[#9e5218] transition-colors"
                      >
                        Actualités du village
                      </Link>

                      <Link
                        href="/associations"
                        onClick={handleLinkClick}
                        className="hover:text-[#9e5218] transition-colors"
                      >
                        Vie associative
                      </Link>

                      <Link
                        href="/mairie/bulletin-municipal"
                        onClick={handleLinkClick}
                        className="hover:text-[#9e5218] transition-colors"
                      >
                        Bulletin Municipal
                      </Link>
                    </div>
                  </nav>
                </div>

                <div className="mt-auto pt-6 border-t border-stone-100">
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#9e5218] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#854311]"
                    onClick={handleLinkClick}
                  >
                    Contacter la mairie
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
