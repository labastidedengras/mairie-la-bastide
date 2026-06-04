"use client";

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
          ? "bg-white/90 text-slate-900 shadow-md backdrop-blur-md py-4"
          : "bg-transparent text-white py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Nom de la Mairie */}
          <Link
            href="/"
            className="flex flex-col text-xl font-normal uppercase transition-opacity hover:opacity-80 select-none leading-none"
          >
            {/* Ligne 1 : LA BASTIDE */}
            <span className="tracking-[0.12em]">La Bastide</span>

            <span className="tracking-[0.24em] font-normal">d&apos;Engras</span>
          </Link>

          {/* Liens de navigation */}
          <nav className="hidden md:flex items-center gap-8 text-base font-semibold tracking-wide uppercase">
            <Link
              href="/actualites"
              className="transition-colors hover:opacity-75"
            >
              Actualités
            </Link>
            <Link href="/mairie" className="transition-colors hover:opacity-75">
              La Mairie
            </Link>
            <Link
              href="/vie-locale"
              className="transition-colors hover:opacity-75"
            >
              Vie Locale
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:opacity-75"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
