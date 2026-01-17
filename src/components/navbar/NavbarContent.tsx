import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

// Jeśli NavLink jest używany w wielu miejscach, warto go wynieść do osobnego pliku types.ts
// Na razie co-location jest OK.
interface NavLink {
  name: string;
  href: string;
}

interface NavbarContentProps {
  links: NavLink[];
  mobileTrigger: React.ReactNode;
}

export const NavbarContent = ({ links, mobileTrigger }: NavbarContentProps) => {
  // Definicja stylów poza JSX dla czystości kodu
  const containerClasses = [
    // Baza
    "flex items-center justify-between px-6 py-3",
    "transition-all duration-700 ease-wabi", // Płynna animacja zmiany kształtu

    // Stan Domyślny (Top)
    "w-full bg-transparent border border-transparent",

    // Stan Scrolled (Pigułka)
    // Używamy składni group-data, aby reagować na atrybut rodzica bez JS
    "group-data-[scrolled=true]:w-[90%] group-data-[scrolled=true]:max-w-6xl",
    "group-data-[scrolled=true]:bg-raisinBlack/90 group-data-[scrolled=true]:backdrop-blur-md",
    "group-data-[scrolled=true]:rounded-full",
    "group-data-[scrolled=true]:border-white/10",
    "group-data-[scrolled=true]:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
  ].join(" ");

  return (
    <div className={containerClasses}>
      {/* --- LEWA STRONA: LOGO --- */}
      <Link
        href="/"
        className="relative z-10 group/logo flex items-center h-12"
        aria-label="Strona główna Fundacji Maxime"
      >
        <Logo className="w-auto h-full" />
      </Link>

      {/* --- ŚRODEK: NAWIGACJA DESKTOP --- */}
      <nav
        className="hidden lg:flex items-center gap-8"
        aria-label="Nawigacja główna"
      >
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="relative py-2 text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors duration-300 group/link"
          >
            {link.name}
            {/* Mikro-interakcja: Kropka przy hoverze */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-arylideYellow rounded-full opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:scale-125 shadow-[0_0_8px_#EFCB6F]" />
          </Link>
        ))}
      </nav>

      {/* --- PRAWA STRONA: AKCJE --- */}
      <div className="flex items-center gap-4">
        {/* Przycisk CTA */}
        <a
          href="https://patronite.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center justify-center rounded-full bg-arylideYellow px-6 py-2.5 text-sm font-bold tracking-wide text-raisinBlack hover:bg-white hover:scale-105 hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] transition-all duration-300 ease-out"
        >
          Wesprzyj nas
        </a>

        {/* Slot na Hamburgera (Client Component wstrzykiwany z góry) */}
        {mobileTrigger}
      </div>
    </div>
  );
};
