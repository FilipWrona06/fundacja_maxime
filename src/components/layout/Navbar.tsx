import dynamic from "next/dynamic";
// import Link from "next/link"; <--- USUWAMY TO
import { NavbarDesktop } from "@/components/navbar/NavbarDesktop";
import { NavbarLogic } from "@/components/navbar/NavbarLogic";
import { NavbarTrigger } from "@/components/navbar/NavbarTrigger";
import { NavbarLink } from "@/components/ui/NavbarLink"; // <--- IMPORT

const NavbarMobile = dynamic(() => import("@/components/navbar/NavbarMobile"), {
  ssr: true,
});

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Galeria", href: "/galeria" },
  { name: "Kontakt", href: "/kontakt" },
] as const;

export const Navbar = () => {
  const mobileLinks = NAV_LINKS.map((link, idx) => (
    // UŻYCIE NOWEGO KOMPONENTU (Mobile)
    <NavbarLink
      key={link.name}
      href={link.href}
      className={`
        text-3xl font-light text-white font-montserrat
        transition-all duration-500 hover:text-arylideYellow
        opacity-0 translate-y-8
        group-data-[mobile-open=true]:opacity-100 group-data-[mobile-open=true]:translate-y-0
      `}
      style={{ transitionDelay: `${idx * 100 + 150}ms` }}
    >
      {link.name}
    </NavbarLink>
  ));

  return (
    <NavbarLogic>
      <div className="hidden lg:block w-full">
        <NavbarDesktop links={[...NAV_LINKS]} />
      </div>

      <div className="lg:hidden">
        <NavbarTrigger />
        <NavbarMobile>{mobileLinks}</NavbarMobile>
      </div>
    </NavbarLogic>
  );
};
