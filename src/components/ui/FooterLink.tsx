"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

export const FooterLink = ({ href, children }: FooterLinkProps) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={clsx(
        "text-sm transition-colors flex items-center gap-2 group w-fit",
        // Tekst: Jeśli aktywny -> żółty, w przeciwnym razie -> szary (z hoverem na żółty)
        isActive
          ? "text-arylideYellow font-medium"
          : "text-philippineSilver hover:text-arylideYellow",
      )}
    >
      {/* KROPKA (Bullet point) */}
      <span
        className={clsx(
          "w-1 h-1 rounded-full transition-colors duration-300",
          // NAPRAWA: Jeśli aktywny -> świeci. Jeśli nie -> biały, ale świeci po najechaniu (group-hover)
          isActive
            ? "bg-arylideYellow shadow-[0_0_5px_#EFCB6F]"
            : "bg-white/20 group-hover:bg-arylideYellow",
        )}
        aria-hidden="true"
      />
      {children}
    </Link>
  );
};
