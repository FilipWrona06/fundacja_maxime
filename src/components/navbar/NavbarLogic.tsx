"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type NavbarContextType = {
  isMobileOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("Missing NavbarContext");
  return context;
};

export const NavbarLogic = ({ children }: { children: React.ReactNode }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Memoizacja funkcji, aby nie powodowały re-renderów dzieci
  const toggleMobileMenu = useCallback(
    () => setIsMobileOpen((prev) => !prev),
    [],
  );
  const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);

  // --- 1. PERFORMANCE: Scroll Handler (Zero React Renders) ---
  useEffect(() => {
    let rafId: number;

    const updateScroll = () => {
      if (!headerRef.current) return;
      // Odczyt scrollY jest szybki, ale requestAnimationFrame synchronizuje to z odświeżaniem ekranu
      const isScrolled = window.scrollY > 20;

      // Bezpośrednia manipulacja DOM omija React Virtual DOM -> ZERO RE-RENDERS
      if (isScrolled) {
        headerRef.current.setAttribute("data-scrolled", "true");
      } else {
        headerRef.current.setAttribute("data-scrolled", "false");
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Init check
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // --- 2. A11Y & UX: Body Lock & Escape Key ---
  useEffect(() => {
    if (isMobileOpen) {
      // Blokada przewijania tła
      document.body.style.overflow = "hidden";

      // Zamknij na ESC
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeMobileMenu();
      };
      window.addEventListener("keydown", handleEsc);

      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isMobileOpen, closeMobileMenu]);

  return (
    <NavbarContext.Provider
      value={{ isMobileOpen, toggleMobileMenu, closeMobileMenu }}
    >
      <header
        ref={headerRef}
        className="group fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none transition-transform will-change-transform"
        data-scrolled="false"
        // Atrybut dla CSS (aby ukryć/pokazać elementy bez JS)
        data-mobile-open={isMobileOpen}
      >
        <div className="pointer-events-auto w-full flex justify-center">
          {children}
        </div>
      </header>
    </NavbarContext.Provider>
  );
};
