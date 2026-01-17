"use client";

import { useEffect, useRef, useState } from "react";
import { NavbarDesktop } from "../navbar/NavbarDesktop";
import { NavbarMobile } from "../navbar/NavbarMobile";

// Dane (zdefiniowane wewnątrz pliku .tsx, tak jak chciałeś)
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Galeria", href: "/galeria" },
  { name: "Kontakt", href: "/kontakt" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isScrolledRef = useRef(false);

  // --- LOGIKA SCROLLA ---
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

  // --- LOGIKA BODY LOCK ---
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
    <>
      <NavbarDesktop
        links={NAV_LINKS}
        isScrolled={isScrolled}
        onOpenMobile={() => setIsMobileOpen(true)}
      />

      <NavbarMobile
        links={NAV_LINKS}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
};
