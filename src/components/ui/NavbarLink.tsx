"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  // Opcjonalne opóźnienie dla animacji w menu mobilnym
  style?: React.CSSProperties;
}

export const NavbarLink = ({
  href,
  children,
  className,
  style,
}: NavbarLinkProps) => {
  const pathname = usePathname();
  // Sprawdzamy czy to aktywny link.
  // Dla strony głównej ('/') wymagamy idealnego dopasowania.
  // Dla innych (np. '/wydarzenia') sprawdzamy czy pathname zaczyna się od href (żeby podświetlało też '/wydarzenia/koncert-1')
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={clsx("group/link relative", className)}
      style={style}
      // Dodajemy atrybut data-active dla łatwiejszego stylowania CSS (opcjonalnie)
      aria-current={isActive ? "page" : undefined}
    >
      {children}

      {/* KROPECZKA */}
      <span
        className={clsx(
          "absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-arylideYellow rounded-full transition-all duration-300 shadow-[0_0_8px_#EFCB6F]",
          // LOGIKA WIDOCZNOŚCI:
          // Jeśli aktywny -> Pokaż (opacity-100, scale-125)
          // Jeśli hover (group-hover) -> Pokaż
          // W przeciwnym razie -> Ukryj
          isActive
            ? "opacity-100 scale-125"
            : "opacity-0 group-hover/link:opacity-100 group-hover/link:scale-125",
        )}
      />
    </Link>
  );
};
