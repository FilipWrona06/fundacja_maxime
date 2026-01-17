import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

interface NavLink {
  name: string;
  href: string;
}

interface NavbarContentProps {
  links: NavLink[];
  // Przekazujemy funkcję otwierania menu z rodzica (Client Componentu)
  // W React Server Components passing server functions to client is limited,
  // ale tutaj ten komponent będzie "dzieckiem" wewnątrz Client Componentu,
  // więc możemy przekazać slot na przycisk.
  mobileTrigger: React.ReactNode;
}

export const NavbarContent = ({ links, mobileTrigger }: NavbarContentProps) => {
  return (
    <div
      className={`
        flex items-center justify-between transition-all duration-700 ease-wabi px-6 py-3
        
        /* STYLE DOMYŚLNE (Gdy na samej górze) */
        w-full bg-transparent border-transparent
        
        /* STYLE SCROLLED (Reakcja na atrybut rodzica) */
        group-data-[scrolled=true]:w-[90%] 
        group-data-[scrolled=true]:max-w-6xl 
        group-data-[scrolled=true]:bg-raisinBlack/90 
        group-data-[scrolled=true]:backdrop-blur-md 
        group-data-[scrolled=true]:rounded-full 
        group-data-[scrolled=true]:border-white/10 
        group-data-[scrolled=true]:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
      `}
    >
      {/* LOGO */}
      <Link
        href="/"
        className="relative z-10 group/logo flex items-center h-12"
        aria-label="Strona główna"
      >
        <Logo className="w-auto h-full" />
      </Link>

      {/* LINKI */}
      <nav className="hidden lg:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="relative text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors duration-300 group/link py-2"
          >
            {link.name}
            <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-arylideYellow rounded-full opacity-0 -translate-x-1/2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:scale-125 shadow-[0_0_8px_#EFCB6F]" />
          </Link>
        ))}
      </nav>

      {/* PRAWA STRONA */}
      <div className="flex items-center gap-4">
        <a
          href="https://patronite.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center justify-center rounded-full font-bold tracking-wide transition-all duration-300 ease-out px-6 py-2.5 text-sm bg-arylideYellow text-raisinBlack hover:bg-white hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] hover:scale-105"
        >
          Wesprzyj nas
        </a>

        {/* Slot na przycisk mobilny (wstrzyknięty z klienta) */}
        {mobileTrigger}
      </div>
    </div>
  );
};
