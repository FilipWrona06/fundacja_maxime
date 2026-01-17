"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { NavbarMobile } from "./NavbarMobile";

// --- CONTEXT (Stan Menu Mobilnego) ---
type NavbarContextType = {
  isMobileOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

// Hook do używania w przycisku (Trigger)
export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarContext must be used within NavbarLogic");
  }
  return context;
};

// --- LOGIC COMPONENT ---
interface NavLink {
  name: string;
  href: string;
}

interface NavbarLogicProps {
  links: NavLink[];
  children: React.ReactNode;
}

export const NavbarLogic = ({ links, children }: NavbarLogicProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isScrolledRef = useRef(false);

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileOpen(false);

  // --- SCROLL LOGIC ---
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
          setIsScrolled(shouldBeScrolled);
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
        // Atrybut dla CSS
        data-scrolled={isScrolled}
        className="group fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 transition-all duration-500 ease-wabi pointer-events-none"
      >
        <div className="pointer-events-auto w-full flex justify-center">
          {children}
        </div>
      </header>

      {/* Overlay Mobilny korzysta z tego samego stanu */}
      <NavbarMobile links={links} />
    </NavbarContext.Provider>
  );
};
