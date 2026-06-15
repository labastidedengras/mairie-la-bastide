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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/95 text-slate-900 shadow-md backdrop-blur-md py-4"
          : "bg-transparent text-white py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col leading-none uppercase transition-opacity hover:opacity-80 font-medium"
          >
            <span className="text-sm/4 tracking-[0.12em] sm:text-lg/4">
              La Bastide
            </span>

            <span className="text-sm/4 tracking-[0.22em] sm:text-lg/4">
              d&apos;Engras
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={navigationMenuTriggerStyle()}
                >
                  Accueil
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>La Mairie</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-2 rounded-xl bg-white p-4 text-slate-900">
                    <li>
                      <NavigationMenuLink
                        href="/mairie/elus"
                        className="block rounded-lg p-3 transition hover:bg-slate-50"
                      >
                        Vos Élus
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink
                        href="/mairie/comptes-rendus"
                        className="block rounded-lg p-3 transition hover:bg-slate-50"
                      >
                        Comptes-rendus du CM
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink
                        href="/bulletin-municipal"
                        className="block rounded-lg p-3 transition hover:bg-slate-50"
                      >
                        Bulletin Municipal
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Vie Pratique</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-2 rounded-xl bg-white p-4 text-slate-900">
                    <li>
                      <NavigationMenuLink
                        href="/demarches/cni-passeport"
                        className="block rounded-lg p-3 transition hover:bg-slate-50"
                      >
                        CNI & Passeport
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink
                        href="/urbanisme/plu"
                        className="block rounded-lg p-3 transition hover:bg-slate-50"
                      >
                        Urbanisme & PLU
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink
                        href="/demarches/dechets-tri"
                        className="block rounded-lg p-3 transition hover:bg-slate-50"
                      >
                        Déchets & Tri
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/actualites"
                  className={navigationMenuTriggerStyle()}
                >
                  Actualités
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/associations"
                  className={navigationMenuTriggerStyle()}
                >
                  Associations
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger
                aria-label="Ouvrir le menu mobile"
                className="rounded-full p-2 transition hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] border-l border-stone-200 bg-white px-6 py-6" // py-8 -> py-6 pour s'aligner sur le top-3 du bouton close
              >
                {/* mt-10 -> mt-2 : On remonte le menu pour aligner parfaitement "Accueil" avec la croix */}
                <nav className="mt-2 flex flex-col gap-6 text-slate-900">
                  <Link
                    href="/"
                    className="text-lg font-medium pt-1" // pt-1 pour peaufiner l'alignement au millimètre
                    onClick={handleLinkClick}
                  >
                    Accueil
                  </Link>

                  {/* Ajout d'un mt-2 pour détacher le bloc "La mairie" du lien Accueil */}
                  <div className="space-y-3 flex flex-col mt-2">
                    <p className="text-sm font-semibold uppercase text-stone-500">
                      La mairie
                    </p>

                    <Link href="/mairie/elus" onClick={handleLinkClick}>
                      Vos Élus
                    </Link>

                    <Link
                      href="/mairie/comptes-rendus"
                      onClick={handleLinkClick}
                    >
                      Comptes-rendus
                    </Link>

                    <Link href="/bulletin-municipal" onClick={handleLinkClick}>
                      Bulletin Municipal
                    </Link>
                  </div>

                  {/* Ajout d'un mt-3 pour créer l'espace souhaité entre "La Mairie" et "Vie pratique" */}
                  <div className="space-y-3 flex flex-col mt-3">
                    <p className="text-sm font-semibold uppercase text-stone-500">
                      Vie pratique
                    </p>

                    <Link
                      href="/demarches/cni-passeport"
                      onClick={handleLinkClick}
                    >
                      CNI & Passeport
                    </Link>

                    <Link href="/urbanisme/plu" onClick={handleLinkClick}>
                      Urbanisme & PLU
                    </Link>

                    <Link
                      href="/demarches/dechets-tri"
                      onClick={handleLinkClick}
                    >
                      Déchets & Tri
                    </Link>
                  </div>

                  {/* Les liens seuls ont un mt-2 pour s'aérer des blocs du dessus */}
                  <Link
                    className="text-lg font-medium mt-2"
                    href="/actualites"
                    onClick={handleLinkClick}
                  >
                    Actualités
                  </Link>

                  <Link
                    className="text-lg font-medium mt-1"
                    href="/associations"
                    onClick={handleLinkClick}
                  >
                    Associations
                  </Link>

                  <Link
                    className="text-lg font-medium mt-1"
                    href="/contact"
                    onClick={handleLinkClick}
                  >
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
