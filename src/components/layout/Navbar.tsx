import dynamic from "next/dynamic";
import Link from "next/link";
import { NavbarDesktop } from "@/components/navbar/NavbarDesktop";
import { NavbarLogic } from "@/components/navbar/NavbarLogic";
import { NavbarTrigger } from "@/components/navbar/NavbarTrigger";

// --- DYNAMIC IMPORT (Lazy Loading JS) ---
// Ładujemy logikę mobilną (Client Component) osobno.
// ssr: true zapewnia, że linki SEO (przekazane jako children) będą w HTML-u,
// mimo że kod JS komponentu załaduje się asynchronicznie.
const NavbarMobile = dynamic(() => import("@/components/navbar/NavbarMobile"), {
  ssr: true,
});

// --- KONFIGURACJA LINKÓW (Single Source of Truth) ---
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Galeria", href: "/galeria" },
  { name: "Kontakt", href: "/kontakt" },
] as const;

export const Navbar = () => {
  // Pre-renderowanie linków mobilnych na serwerze (SEO + Performance)
  // Przekazujemy gotowy HTML do Client Componentu, zamiast tablicy danych.
  const mobileLinks = NAV_LINKS.map((link, idx) => (
    <Link
      key={link.name}
      href={link.href}
      className={`
        text-3xl font-light text-white font-montserrat
        transition-all duration-500 hover:text-arylideYellow
        opacity-0 translate-y-8
        /* Sterowanie widocznością via atrybut rodzica (CSS only, zero JS logic per link) */
        group-data-[mobile-open=true]:opacity-100 group-data-[mobile-open=true]:translate-y-0
      `}
      style={{ transitionDelay: `${idx * 100 + 150}ms` }}
    >
      {link.name}
    </Link>
  ));

  return (
    <NavbarLogic>
      {/* 
        1. DESKTOP ONLY 
        Server Component. Zero JS.
        Na mobile ma display: none, więc przeglądarka go ignoruje.
      */}
      <div className="hidden lg:block w-full">
        <NavbarDesktop links={[...NAV_LINKS]} />
      </div>

      {/* 
        2. MOBILE ONLY
        Trigger (przycisk) widoczny tylko na mobile.
        Menu (overlay) ładuje się dynamicznie.
      */}
      <div className="lg:hidden">
        <NavbarTrigger />
        <NavbarMobile>{mobileLinks}</NavbarMobile>
      </div>
    </NavbarLogic>
  );
};
