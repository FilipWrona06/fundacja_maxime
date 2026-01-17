"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { NavbarMobile } from "./NavbarMobile";

// --- CONTEXT ---
type NavbarContextType = {
  isMobileOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarContext must be used within NavbarLogic");
  }
  return context;
};

interface NavbarLogicProps {
  children: React.ReactNode;
  mobileMenuChildren: React.ReactNode; // Slot na linki z serwera
}

export const NavbarLogic = ({
  children,
  mobileMenuChildren,
}: NavbarLogicProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Ref do trzymania stanu scrolla (bez re-renderów Reacta)
  const isScrolledRef = useRef(false);

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileOpen(false);

  // --- SCROLL LOGIC (Direct DOM Manipulation) ---
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        // Histereza 10/20px
        const threshold = isScrolledRef.current ? 10 : 20;
        const shouldBeScrolled = currentScrollY > threshold;

        if (shouldBeScrolled !== isScrolledRef.current) {
          isScrolledRef.current = shouldBeScrolled;

          // BEZPOŚREDNIA ZMIANA ATRYBUTU W DOM
          // To nie powoduje re-renderu Reacta!
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
    handleScroll(); // Init

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // --- BODY LOCK ---
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
        // Domyślny stan atrybutu (dla SSR)
        data-scrolled="false"
        className="group fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 transition-all duration-500 ease-wabi pointer-events-none"
      >
        <div className="pointer-events-auto w-full flex justify-center">
          {children}
        </div>
      </header>

      <NavbarMobile>{mobileMenuChildren}</NavbarMobile>
    </NavbarContext.Provider>
  );
};
