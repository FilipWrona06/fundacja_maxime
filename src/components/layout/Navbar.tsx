import Link from "next/link";
import { NavbarContent } from "../navbar/NavbarContent";
// Importujemy 3 komponenty z jednego pliku
import {
  NavbarOverlay,
  NavbarRoot,
  NavbarTrigger,
} from "../navbar/NavbarInteractive";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Galeria", href: "/galeria" },
  { name: "Kontakt", href: "/kontakt" },
];

export const Navbar = () => {
  // Generowanie linków mobilnych na serwerze
  const mobileLinks = NAV_LINKS.map((link, idx) => (
    <Link
      key={link.name}
      href={link.href}
      className="text-3xl font-montserrat font-light text-white hover:text-arylideYellow transition-all duration-500 transform opacity-0 translate-y-8 mobile-nav-link"
      style={{ transitionDelay: `${idx * 100 + 200}ms` }}
    >
      {link.name}
    </Link>
  ));

  return (
    <NavbarRoot>
      {/* Desktop Content (Server Component) */}
      <NavbarContent
        links={NAV_LINKS}
        mobileTrigger={<NavbarTrigger />} // Trigger (Client Component)
      />

      {/* Mobile Overlay (Client Component) wstrzyknięty z treścią z serwera */}
      <NavbarOverlay>{mobileLinks}</NavbarOverlay>
    </NavbarRoot>
  );
};
