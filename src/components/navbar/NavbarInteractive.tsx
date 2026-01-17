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

// --- 2. GŁÓWNY WRAPPER (LOGIKA) ---
export const NavbarRoot = ({ children }: { children: React.ReactNode }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isScrolledRef = useRef(false);

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileOpen(false);

  // Scroll Logic (Direct DOM)
  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const threshold = isScrolledRef.current ? 10 : 20;
        const shouldBeScrolled = currentScrollY > threshold;

        if (shouldBeScrolled !== isScrolledRef.current) {
          isScrolledRef.current = shouldBeScrolled;
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
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Body Lock
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

// --- 3. PRZYCISK TRIGGER (HAMBURGER) ---
export const NavbarTrigger = () => {
  const { toggleMobileMenu } = useNavbarContext();
  return (
    <button
      type="button"
      className="lg:hidden text-white hover:text-arylideYellow transition-colors active:scale-90 duration-200 p-1"
      onClick={toggleMobileMenu}
      aria-label="Otwórz menu"
    >
      <Menu className="w-8 h-8" />
    </button>
  );
};

// --- 4. OVERLAY MOBILNY ---
export const NavbarOverlay = ({ children }: { children: React.ReactNode }) => {
  const { isMobileOpen, closeMobileMenu } = useNavbarContext();

  return (
    <div
      className={`
        fixed inset-0 z-60 bg-raisinBlack/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 
        transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]
        ${isMobileOpen ? "opacity-100 visible translate-y-0 scale-100 blur-0" : "opacity-0 invisible translate-y-8 scale-95 blur-sm pointer-events-none"}
      `}
      aria-hidden={!isMobileOpen}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) closeMobileMenu();
      }}
    >
      {/* Przycisk Zamknięcia */}
      <button
        type="button"
        className={`absolute top-8 right-8 text-philippineSilver hover:text-white transition-all duration-500 hover:rotate-90 active:scale-90 p-2 ${isMobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}
        onClick={closeMobileMenu}
        aria-label="Zamknij menu"
      >
        <X className="w-10 h-10" />
      </button>

      {/* Logo w menu mobilnym */}
      <Link
        href="/"
        onClick={closeMobileMenu}
        className={`mb-6 transition-all duration-700 delay-100 ${isMobileOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}`}
      >
        <Logo className="h-20" />
      </Link>

      {/* Linki z serwera */}
      <nav className="flex flex-col items-center gap-6">{children}</nav>

      {/* CTA Mobilne */}
      <a
        href="https://patronite.pl"
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 px-8 py-3 rounded-full text-base font-bold tracking-wide bg-arylideYellow text-raisinBlack hover:bg-white transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] ${isMobileOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}`}
        style={{ transitionDelay: isMobileOpen ? "700ms" : "0ms" }}
      >
        Wesprzyj nas
      </a>

      {/* Slogan */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-1000 w-full text-center ${isMobileOpen ? "opacity-90 blur-0" : "opacity-0 blur-sm"}`}
      >
        <span className="font-youngest text-[2.4rem] text-arylideYellow whitespace-nowrap">
          „Z pasji do muzyki”
        </span>
      </div>
    </div>
  );
};
