import Link from "next/link";
import { NavbarContent } from "../navbar/NavbarContent";
import { NavbarLogic } from "../navbar/NavbarLogic";
import { NavbarMobileTrigger } from "../navbar/NavbarMobileTrigger";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Galeria", href: "/galeria" },
  { name: "Kontakt", href: "/kontakt" },
];

export const Navbar = () => {
  // Generujemy linki mobilne NA SERWERZE
  // Dzięki temu NavbarMobile nie musi iterować po tablicy w JS klienta
  const mobileLinks = NAV_LINKS.map((link, idx) => (
    <Link
      key={link.name}
      href={link.href}
      className="text-3xl font-montserrat font-light text-white hover:text-arylideYellow transition-all duration-500 transform opacity-0 translate-y-8 mobile-nav-link"
      // Używamy stylów inline dla staggera, albo klas CSS (tu inline dla prostoty server-side)
      // Uwaga: Klasy opacity/translate są nadpisywane przez stan rodzica w NavbarMobile w JS,
      // ale tutaj dajemy bazę.
      style={{ transitionDelay: `${idx * 100 + 200}ms` }}
    >
      {link.name}
    </Link>
  ));

  return (
    <NavbarLogic mobileMenuChildren={mobileLinks}>
      <NavbarContent
        links={NAV_LINKS}
        mobileTrigger={<NavbarMobileTrigger />}
      />
    </NavbarLogic>
  );
};
