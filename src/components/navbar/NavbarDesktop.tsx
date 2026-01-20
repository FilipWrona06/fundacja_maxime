import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

interface NavLink {
  name: string;
  href: string;
}

interface NavbarDesktopProps {
  links: NavLink[];
  actionSlot?: React.ReactNode;
}

export const NavbarDesktop = ({ links, actionSlot }: NavbarDesktopProps) => {
  return (
    <div
      className={`
        relative flex items-center justify-between px-6 py-3
        transition-all duration-700 ease-wabi will-change-[width,background,border-radius]
        
                          
        /* DODANO: mx-auto - to naprawia centrowanie pigułki */
        w-full bg-transparent border border-transparent

        /* Reakcja na Scroll (sterowana przez NavbarLogic via data-attribute) */
        group-data-[scrolled=true]:w-[90%] group-data-[scrolled=true]:max-w-6xl
        group-data-[scrolled=true]:bg-raisinBlack/90 group-data-[scrolled=true]:backdrop-blur-md
        group-data-[scrolled=true]:rounded-full
        group-data-[scrolled=true]:border-white/10
        group-data-[scrolled=true]:shadow-2xl
      `}
    >
      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 h-12 flex items-center"
        aria-label="Strona główna"
      >
        <Logo className="h-full w-auto" />
      </Link>

      {/* Nawigacja Desktop (Ukryta na mobile via CSS - brak JS) */}
      <nav
        className="hidden lg:flex items-center gap-8"
        aria-label="Menu główne"
      >
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="relative py-2 text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors duration-300 group/link"
          >
            {link.name}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-arylideYellow rounded-full opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:scale-125 shadow-[0_0_8px_#EFCB6F]" />
          </Link>
        ))}
      </nav>

      {/* Akcje */}
      <div className="flex items-center gap-4">
        <a
          href="https://patronite.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center justify-center rounded-full bg-arylideYellow px-6 py-2.5 text-sm font-bold tracking-wide text-raisinBlack hover:bg-white hover:scale-105 transition-all duration-300"
        >
          Wesprzyj nas
        </a>

        {/* Trigger Mobilny (Wstrzyknięty) */}
        {actionSlot}
      </div>
    </div>
  );
};
