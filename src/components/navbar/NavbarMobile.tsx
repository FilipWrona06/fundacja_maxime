"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/ui/Logo";
import { useNavbarContext } from "./NavbarLogic";

export default function NavbarMobile({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobileOpen, closeMobileMenu } = useNavbarContext();
  const menuRef = useRef<HTMLDivElement>(null);

  // Focus Trap (Dostępność)
  useEffect(() => {
    if (isMobileOpen && menuRef.current) {
      const focusable = menuRef.current.querySelector(
        "button, a",
      ) as HTMLElement;
      if (focusable) focusable.focus();
    }
  }, [isMobileOpen]);

  return (
    <div
      ref={menuRef}
      id="mobile-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isMobileOpen}
      className={`
        fixed inset-0 z-60 bg-raisinBlack/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8
        transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-[opacity,transform]
        ${
          isMobileOpen
            ? "opacity-100 visible translate-y-0 scale-100 blur-0"
            : "opacity-0 invisible translate-y-8 scale-95 blur-sm pointer-events-none"
        }
      `}
      onClick={(e) => {
        // Zamknij przy kliknięciu w link
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

      {/* Logo */}
      <Link
        href="/"
        className={`mb-6 transition-all duration-700 delay-100 ${isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        tabIndex={isMobileOpen ? 0 : -1}
      >
        <Logo className="h-20" />
      </Link>

      {/* Linki (wstrzyknięte z serwera) */}
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
    </div>
  );
}
