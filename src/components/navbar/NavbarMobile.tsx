"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/ui/Logo";
import { useNavbarContext } from "./NavbarLogic";

export default function NavbarMobile({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobileOpen, closeMobileMenu } = useNavbarContext();
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus Trap
  useEffect(() => {
    if (isMobileOpen && menuRef.current) {
      const timer = setTimeout(() => {
        const closeBtn = menuRef.current?.querySelector("button");
        closeBtn?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isMobileOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={menuRef}
      id="mobile-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isMobileOpen}
      // 1. DODANO: 'group' - aby dzieci mogły reagować na stan tego kontenera
      // 2. DODANO: data-mobile-open - atrybut sterujący widocznością linków
      className={`
        group 
        fixed inset-0 z-100 bg-raisinBlack/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8
        transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-[opacity,transform]
        ${
          isMobileOpen
            ? "opacity-100 visible translate-y-0 scale-100 blur-0 pointer-events-auto"
            : "opacity-0 invisible translate-y-8 scale-95 blur-sm pointer-events-none"
        }
      `}
      data-mobile-open={isMobileOpen} // <--- KLUCZOWE DLA LINKÓW
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) closeMobileMenu();
      }}
    >
      {/* Przycisk Zamknięcia */}
      <button
        type="button"
        onClick={closeMobileMenu}
        className={`
          absolute top-8 right-8 text-philippineSilver hover:text-white p-2
          transition-all duration-500 hover:rotate-90 active:scale-90
          ${isMobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}
        `}
        aria-label="Zamknij menu"
      >
        <X className="w-10 h-10" />
      </button>

      {/* Logo - też reaguje na data-mobile-open dzięki klasie group w Navbar.tsx/Mobile.tsx logic */}
      <Link
        href="/"
        className={`mb-6 transition-all duration-700 delay-100 ${isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        tabIndex={isMobileOpen ? 0 : -1}
      >
        <Logo className="h-20" />
      </Link>

      {/* 
         Tu są wstrzykiwane linki z Navbar.tsx.
         Mają one klasę: group-data-[mobile-open=true]:opacity-100
         Teraz zadziałają, bo ich bezpośredni przodek (div powyżej) ma ten atrybut!
      */}
      <nav className="flex flex-col items-center gap-6">{children}</nav>

      {/* CTA */}
      <a
        href="https://patronite.pl"
        target="_blank"
        rel="noopener noreferrer"
        className={`
          mt-8 px-8 py-3 rounded-full text-base font-bold tracking-wide
          bg-arylideYellow text-raisinBlack hover:bg-white
          transition-all duration-500 ease-out
          ${isMobileOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}
        `}
        style={{ transitionDelay: isMobileOpen ? "400ms" : "0ms" }}
        tabIndex={isMobileOpen ? 0 : -1}
      >
        Wesprzyj nas
      </a>

      {/* Slogan */}
      <div
        className={`
        absolute bottom-10 text-center transition-all duration-1000
        ${isMobileOpen ? "opacity-90 blur-0" : "opacity-0 blur-sm"}
      `}
      >
        <span className="font-youngest text-[2.4rem] text-arylideYellow">
          „Z pasji do muzyki”
        </span>
      </div>
    </div>,
    document.body,
  );
}
