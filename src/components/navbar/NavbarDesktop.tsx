import { Menu } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

interface NavLink {
  name: string;
  href: string;
}

interface NavbarDesktopProps {
  links: NavLink[];
  isScrolled: boolean;
  onOpenMobile: () => void;
}

export const NavbarDesktop = ({
  links,
  isScrolled,
  onOpenMobile,
}: NavbarDesktopProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 transition-all duration-500 ease-wabi pointer-events-none">
      <div
        className={`
          pointer-events-auto
          flex items-center justify-between transition-all duration-700 ease-wabi
          px-6 py-3
          ${
            isScrolled
              ? "w-[90%] max-w-6xl bg-raisinBlack/90 backdrop-blur-md rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "w-full max-w-7xl bg-transparent border border-transparent"
          }
        `}
      >
        {/* LOGO */}
        <Link
          href="/"
          className="relative z-10 group flex items-center h-12"
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
              className="relative text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors duration-300 group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-arylideYellow rounded-full opacity-0 -translate-x-1/2 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125 shadow-[0_0_8px_#EFCB6F]" />
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

          <button
            type="button"
            className="lg:hidden text-white hover:text-arylideYellow transition-colors active:scale-90 duration-200 p-1"
            onClick={onOpenMobile}
            aria-label="Otwórz menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>
    </header>
  );
};
