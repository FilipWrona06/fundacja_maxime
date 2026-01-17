import Link from "next/link";
import { NavbarContent } from "../navbar/NavbarContent";
import {
  NavbarOverlay,
  NavbarRoot,
  NavbarTrigger,
} from "../navbar/NavbarInteractive";

// --- TYPY ---
// Definiujemy kształt danych linku. To ułatwi życie, gdy podepniesz CMS.
export interface NavLink {
  name: string;
  href: string;
}

// --- DANE (Single Source of Truth) ---
// 'as const' zapewnia, że te dane są niezmienne (read-only).
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Galeria", href: "/galeria" },
  { name: "Kontakt", href: "/kontakt" },
] as const;

export const Navbar = () => {
  // W przyszłości, gdy będziesz chciał pobierać linki z Sanity:
  // const { data } = await sanityFetch({ query: NAV_QUERY });
  // const links = data || NAV_LINKS;
  const links = NAV_LINKS;

  // --- SERVER-SIDE RENDERING (Mobile Links) ---
  // Generujemy strukturę linków mobilnych tutaj (na serwerze).
  // ZALETY:
  // 1. Mniejszy plik JS dla klienta (NavbarOverlay nie zawiera logiki mapowania).
  // 2. SEO: Linki są obecne w źródle strony (nawet jak menu jest zamknięte).
  // 3. Wydajność: React na kliencie nie musi przeliczać tej listy przy hydracji.
  const mobileLinks = links.map((link, idx) => (
    <Link
      key={link.name}
      href={link.href}
      // Klasa 'mobile-nav-link' jest kluczowa dla animacji zdefiniowanej w globals.css
      className="mobile-nav-link transform text-3xl font-light text-white opacity-0 transition-all duration-500 hover:text-arylideYellow font-montserrat translate-y-8"
      // Stagger effect (kaskadowe pojawianie się) wyliczamy na serwerze
      style={{ transitionDelay: `${idx * 100 + 200}ms` }}
    >
      {link.name}
    </Link>
  ));

  return (
    // NavbarRoot (Client) dostarcza Context dla całej nawigacji
    <NavbarRoot>
      {/* Desktop (Server) - Renderuje się statycznie, otrzymuje tylko slot na przycisk */}
      <NavbarContent
        // Rzutowanie readonly na zwykłą tablicę (dla kompatybilności z komponentem)
        links={[...links]}
        mobileTrigger={<NavbarTrigger />} // Trigger (Client Island)
      />

      {/* Mobile (Client) - Zarządza tylko widocznością (otwórz/zamknij) */}
      <NavbarOverlay>{mobileLinks}</NavbarOverlay>
    </NavbarRoot>
  );
};
