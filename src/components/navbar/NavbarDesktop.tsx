import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NavbarLink } from "@/components/ui/NavbarLink"; // <--- IMPORT

interface NavLink {
  name: string;
  href: string;
}

interface NavbarDesktopProps {
  links: NavLink[];
}

export const NavbarDesktop = ({ links }: NavbarDesktopProps) => {
  return (
    <div
      className={`
        relative flex items-center justify-between px-6 py-3
        transition-all duration-700 ease-wabi will-change-[width,background,border-radius]
        w-full mx-auto bg-transparent border border-transparent
        group-data-[scrolled=true]:w-[90%] group-data-[scrolled=true]:max-w-6xl
        group-data-[scrolled=true]:bg-raisinBlack/90 group-data-[scrolled=true]:backdrop-blur-md
        group-data-[scrolled=true]:rounded-full
        group-data-[scrolled=true]:border-white/10
        group-data-[scrolled=true]:shadow-2xl
      `}
    >
      <Link
        href="/"
        className="relative z-10 h-12 flex items-center"
        aria-label="Strona główna"
      >
        <Logo className="h-full w-auto" />
      </Link>

      <nav className="flex items-center gap-8" aria-label="Menu główne">
        {links.map((link) => (
          // UŻYCIE NOWEGO KOMPONENTU
          <NavbarLink
            key={link.name}
            href={link.href}
            className="py-2 text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors duration-300"
          >
            {link.name}
          </NavbarLink>
        ))}
      </nav>

      <a
        href="https://patronite.pl"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full bg-arylideYellow px-6 py-2.5 text-sm font-bold tracking-wide text-raisinBlack hover:bg-white hover:scale-105 transition-all duration-300"
      >
        Wesprzyj nas
      </a>
    </div>
  );
};
