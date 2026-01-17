"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";

// --- 1. CONTEXT ---
type NavbarContextType = {
  isMobileOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("Missing NavbarContext");
  return context;
};

// --- 2. NAVBAR ROOT (LOGIC WRAPPER) ---
export const NavbarRoot = ({ children }: { children: React.ReactNode }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isScrolledRef = useRef(false);

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileOpen(false);

  // Scroll Logic (Zero-Render Performance)
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        // Histereza: 20px w dół, 10px w górę (zapobiega migotaniu)
        const threshold = isScrolledRef.current ? 10 : 20;
        const shouldBeScrolled = currentScrollY > threshold;

        if (shouldBeScrolled !== isScrolledRef.current) {
          isScrolledRef.current = shouldBeScrolled;
          // Bezpośrednia manipulacja DOM dla maksymalnej wydajności (0 re-renders)
          if (headerRef.current) {
            headerRef.current.setAttribute(
              "data-scrolled",
              shouldBeScrolled ? "true" : "false",
            );
          }
        }
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Body Scroll Lock (Dostępność + UX)
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  return (
    <NavbarContext.Provider
      value={{ isMobileOpen, toggleMobileMenu, closeMobileMenu }}
    >
      <header
        ref={headerRef}
        data-scrolled="false"
        className="group fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 transition-all duration-500 ease-wabi pointer-events-none"
      >
        <div className="pointer-events-auto w-full flex justify-center">
          {children}
        </div>
      </header>
    </NavbarContext.Provider>
  );
};

// --- 3. NAVBAR TRIGGER (BUTTON) ---
export const NavbarTrigger = () => {
  const { toggleMobileMenu, isMobileOpen } = useNavbarContext();

  return (
    <button
      type="button"
      className="lg:hidden text-white hover:text-arylideYellow transition-colors active:scale-90 duration-200 p-1"
      onClick={toggleMobileMenu}
      aria-label={isMobileOpen ? "Zamknij menu" : "Otwórz menu"}
      aria-expanded={isMobileOpen} // Kluczowe dla czytników ekranu
      aria-controls="mobile-menu-overlay" // Powiązanie z ID menu
    >
      <Menu className="w-8 h-8" />
    </button>
  );
};

// --- 4. NAVBAR OVERLAY (MOBILE MENU) ---
export const NavbarOverlay = ({ children }: { children: React.ReactNode }) => {
  const { isMobileOpen, closeMobileMenu } = useNavbarContext();

  // Organizacja klas CSS dla czytelności
  const overlayClasses = [
    "fixed inset-0 z-60 bg-raisinBlack/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8",
    "transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]",
    isMobileOpen
      ? "opacity-100 visible translate-y-0 scale-100 blur-0"
      : "opacity-0 invisible translate-y-8 scale-95 blur-sm pointer-events-none",
  ].join(" ");

  const ctaClasses = [
    "mt-8 px-8 py-3 rounded-full text-base font-bold tracking-wide",
    "bg-arylideYellow text-raisinBlack hover:bg-white",
    "transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(239,203,111,0.4)]",
    isMobileOpen
      ? "opacity-100 translate-y-0 scale-100"
      : "opacity-0 translate-y-8 scale-90",
  ].join(" ");

  return (
    <div
      id="mobile-menu-overlay"
      className={overlayClasses}
      aria-hidden={!isMobileOpen}
      role="dialog" // Semantyka: to jest modal
      aria-modal="true" // Wymusza focus wewnątrz (dla screen readerów)
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        // Event Delegation: Zamknij menu po kliknięciu w dowolny link wewnątrz
        if ((e.target as HTMLElement).closest("a")) {
          closeMobileMenu();
        }
      }}
    >
      {/* Przycisk Zamknięcia */}
      <button
        type="button"
        className={`
          absolute top-8 right-8 text-philippineSilver hover:text-white 
          transition-all duration-500 hover:rotate-90 active:scale-90 p-2
          ${isMobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}
        `}
        onClick={closeMobileMenu}
        aria-label="Zamknij menu"
      >
        <X className="w-10 h-10" />
      </button>

      {/* Logo */}
      <Link
        href="/"
        onClick={closeMobileMenu}
        className={`
          mb-6 transition-all duration-700 delay-100
          ${isMobileOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}
        `}
      >
        <Logo className="h-20" />
      </Link>

      {/* Linki (Wstrzyknięte z serwera) */}
      <nav className="flex flex-col items-center gap-6">{children}</nav>

      {/* CTA Mobilne */}
      <a
        href="https://patronite.pl"
        target="_blank"
        rel="noopener noreferrer"
        className={ctaClasses}
        style={{ transitionDelay: isMobileOpen ? "700ms" : "0ms" }}
      >
        Wesprzyj nas
      </a>

      {/* Slogan */}
      <div
        className={`
          absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-1000 w-full text-center
          ${isMobileOpen ? "opacity-90 blur-0" : "opacity-0 blur-sm"}
        `}
      >
        <span className="font-youngest text-[2.4rem] text-arylideYellow whitespace-nowrap">
          „Z pasji do muzyki”
        </span>
      </div>
    </div>
  );
};
