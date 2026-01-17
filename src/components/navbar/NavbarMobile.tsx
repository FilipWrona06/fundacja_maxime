"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useNavbarContext } from "./NavbarLogic";

export const NavbarMobile = ({ children }: { children: React.ReactNode }) => {
  const { isMobileOpen, closeMobileMenu } = useNavbarContext();

  return (
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
      aria-hidden={!isMobileOpen}
      // EVENT BUBBLING: Kliknięcie w jakikolwiek link wewnątrz zamknie menu
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) {
          closeMobileMenu();
        }
      }}
    >
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

      <Link
        href="/"
        onClick={closeMobileMenu}
        className={`mb-6 transition-all duration-700 delay-100 ${isMobileOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}`}
      >
        <Logo className="h-20" />
      </Link>

      <nav className="flex flex-col items-center gap-6">
        {/* Tu wylądują linki wygenerowane na serwerze */}
        {children}
      </nav>

      <a
        href="https://patronite.pl"
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 px-8 py-3 rounded-full text-base font-bold tracking-wide bg-arylideYellow text-raisinBlack hover:bg-white transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] ${isMobileOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}`}
        style={{ transitionDelay: `${isMobileOpen ? 700 : 0}ms` }}
      >
        Wesprzyj nas
      </a>

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
