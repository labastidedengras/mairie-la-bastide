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
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          {/* Logo Géométrique paré pour le scroll */}
          <Link
            href="/"
            className="flex flex-col text-xl font-normal uppercase transition-opacity hover:opacity-80 select-none leading-none"
          >
            <span className="tracking-[0.12em]">La Bastide</span>

            <span className="tracking-[0.22em] font-normal">d&apos;Engras</span>
          </Link>

          {/* Navigation avec Radix UI */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {/* Accueil */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={navigationMenuTriggerStyle()}
                >
                  Accueil
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Menu 1 : La Mairie (Institutionnel) */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>La Mairie</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-2 p-4 bg-white text-slate-900 rounded-xl">
                    <li>
                      <NavigationMenuLink
                        href="/mairie/elus"
                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50"
                      >
                        <div className="text-sm font-medium">Vos Élus</div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/mairie/comptes-rendus"
                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50"
                      >
                        <div className="text-sm font-medium">
                          Comptes-rendus du CM
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/bulletin-municipal"
                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50"
                      >
                        <div className="text-sm font-medium">
                          Bulletin Municipal
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Menu 2 : Vie Pratique (Services au citoyen) */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Vie Pratique</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-2 p-4 bg-white text-slate-900 rounded-xl">
                    <li>
                      <NavigationMenuLink
                        href="/demarches/cni-passeport"
                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50"
                      >
                        <div className="text-sm font-medium">
                          Papiers officiels (CNI, Passeport)
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/urbanisme/plu"
                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50"
                      >
                        <div className="text-sm font-medium">
                          Plan Local d&apos;Urbanisme (PLU)
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/demarches/dechets-tri"
                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50"
                      >
                        <div className="text-sm font-medium">
                          Gestion des déchets & Tri
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Actualités */}
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

              {/* Contact */}
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
        </div>
      </div>
    </header>
  );
}
