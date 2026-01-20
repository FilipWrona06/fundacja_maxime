"use client";

import { Menu } from "lucide-react";
import { useNavbarContext } from "./NavbarLogic";

export const NavbarTrigger = () => {
  const { toggleMobileMenu, isMobileOpen } = useNavbarContext();

  return (
    <div className="absolute top-6 right-6 z-50">
      <button
        type="button"
        className="text-white hover:text-arylideYellow transition-colors active:scale-90 duration-200 p-2"
        onClick={toggleMobileMenu}
        aria-label={isMobileOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={isMobileOpen}
        aria-controls="mobile-menu-overlay"
      >
        <Menu className="w-8 h-8" />
      </button>
    </div>
  );
};
