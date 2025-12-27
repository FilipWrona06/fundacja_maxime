"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // npm install lucide-react
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Galeria", href: "/galeria" },
  { name: "Kontakt", href: "/kontakt" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Obsługa scrolla - efekt pigułki
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-wabi ${
          isScrolled ? "pt-4" : "pt-6"
        }`}
      >
        <div
          className={`
            flex items-center justify-between transition-all duration-700 ease-wabi
            ${
              isScrolled
                ? "w-[90%] max-w-6xl bg-raisinBlack/80 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                : "w-full max-w-7xl px-8 py-4 bg-transparent border-transparent"
            }
          `}
        >
          {/* --- LEWA STRONA: LOGO --- */}
          <Link
            href="/"
            className="relative z-10 group"
            aria-label="Strona główna"
          >
            <Logo
              // Tutaj ustalamy wysokość kontenera. Obrazek w środku dopasuje się do niej.
              className={`transition-all duration-500 ${
                isScrolled ? "h-10" : "h-14"
              }`}
            />
          </Link>

          {/* --- ŚRODEK: LINKI (Desktop) --- */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors duration-300 group"
              >
                {link.name}
                {/* Mikroanimacja Wabi-Sabi: Organiczna kropka zamiast linii */}
                <span className="absolute -bottom-2 left-1/2 w-1 h-1 bg-arylideYellow rounded-full opacity-0 -translate-x-1/2 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125 shadow-[0_0_8px_#EFCB6F]" />
              </Link>
            ))}
          </nav>

          {/* --- PRAWA STRONA: CTA & Mobile Toggle --- */}
          <div className="flex items-center gap-4">
            {/* Przycisk CTA */}
            <a
              href="https://patronite.pl"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                hidden lg:flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-500 ease-out
                ${
                  isScrolled
                    ? "bg-arylideYellow text-raisinBlack hover:bg-white hover:scale-105"
                    : "bg-arylideYellow text-raisinBlack hover:bg-white hover:shadow-[0_0_20px_rgba(239,203,111,0.4)]"
                }
              `}
            >
              Wesprzyj nas
            </a>

            {/* Hamburger (Mobile) */}
            <button
              type="button"
              className="lg:hidden text-white hover:text-arylideYellow transition-colors"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE OVERLAY --- */}
      <div
        className={`
          fixed inset-0 z-60 bg-raisinBlack flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-wabi
          ${
            isMobileOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      >
        <button
          type="button"
          className="absolute top-8 right-8 text-philippineSilver hover:text-white transition-colors"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="w-10 h-10" />
        </button>

        {navLinks.map((link, idx) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileOpen(false)}
            className="text-3xl font-montserrat font-light text-white hover:text-arylideYellow transition-all duration-300 transform hover:scale-105"
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            {link.name}
          </Link>
        ))}

        <a
          href="https://patronite.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 px-8 py-3 bg-arylideYellow text-raisinBlack font-bold text-lg rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(239,203,111,0.2)]"
        >
          Wesprzyj nas na Patronite
        </a>

        {/* Dekoracja w tle (nuta/logo) - subtelne tło */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
          <span className="font-youngest text-9xl text-white">Maxime</span>
        </div>
      </div>
    </>
  );
};