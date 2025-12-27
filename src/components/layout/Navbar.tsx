"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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

  // Blokowanie scrollowania strony gdy menu mobilne jest otwarte
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileOpen]);

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
          {/* --- LEWA STRONA: LOGO (Desktop) --- */}
          <Link
            href="/"
            className="relative z-10 group"
            aria-label="Strona główna"
            onClick={() => setIsMobileOpen(false)}
          >
            <Logo
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
              className="lg:hidden text-white hover:text-arylideYellow transition-colors active:scale-90 duration-200"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Otwórz menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE OVERLAY --- */}
      <div
        className={`
          fixed inset-0 z-60 bg-raisinBlack/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 
          transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]
          ${
            isMobileOpen
              ? "opacity-100 visible translate-y-0 scale-100 blur-0"
              : "opacity-0 invisible translate-y-8 scale-95 blur-sm pointer-events-none"
          }
        `}
      >
        {/* Przycisk X (Prawy górny róg) */}
        <button
          type="button"
          className={`
            absolute top-8 right-8 text-philippineSilver hover:text-white 
            transition-all duration-500 hover:rotate-90 active:scale-90
            ${isMobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}
          `}
          onClick={() => setIsMobileOpen(false)}
          aria-label="Zamknij menu"
        >
          <X className="w-10 h-10" />
        </button>

        {/* Logo na środku */}
        <Link
          href="/"
          onClick={() => setIsMobileOpen(false)}
          className={`
             mb-4 transition-all duration-700 delay-100
             ${
               isMobileOpen
                 ? "opacity-100 translate-y-0 scale-100"
                 : "opacity-0 translate-y-8 scale-90"
             }
          `}
        >
          <Logo className="h-20" />
        </Link>

        {/* Linki */}
        {navLinks.map((link, idx) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileOpen(false)}
            className={`
              text-3xl font-montserrat font-light text-white hover:text-arylideYellow 
              transition-all duration-500 transform
              ${
                isMobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }
            `}
            style={{
              transitionDelay: `${isMobileOpen ? idx * 100 + 200 : 0}ms`,
            }}
          >
            {link.name}
          </Link>
        ))}

        {/* CTA Button - TERAZ TAKI SAM JAK NA DESKTOPIE */}
        <a
          href="https://patronite.pl"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            mt-8 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide 
            bg-arylideYellow text-raisinBlack hover:bg-white 
            transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(239,203,111,0.4)]
            ${
              isMobileOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-90"
            }
          `}
          style={{ transitionDelay: `${isMobileOpen ? 700 : 0}ms` }}
        >
          Wesprzyj nas
        </a>

        {/* Motto */}
        <div
          className={`
            absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-1000 w-full text-center
            ${isMobileOpen ? "opacity-90 blur-0" : "opacity-0 blur-sm"}
          `}
        >
          <span className="font-youngest text-[2.4rem] md:text-[5rem] text-arylideYellow whitespace-nowrap">
            „Z pasji do muzyki ”
          </span>
        </div>
      </div>
    </>
  );
};