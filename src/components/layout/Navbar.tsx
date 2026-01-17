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
  return (
    <NavbarLogic links={NAV_LINKS}>
      <NavbarContent
        links={NAV_LINKS}
        // Tu wstrzykujemy przycisk, który jest "wyspą" kliencką
        mobileTrigger={<NavbarMobileTrigger />}
      />
    </NavbarLogic>
  );
};
