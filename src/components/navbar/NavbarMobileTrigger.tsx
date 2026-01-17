"use client";

import { Menu } from "lucide-react";
import { useNavbarContext } from "./NavbarLogic";

export const NavbarMobileTrigger = () => {
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
