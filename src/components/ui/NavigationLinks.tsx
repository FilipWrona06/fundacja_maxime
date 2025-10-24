'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
// Upewnij się, że ścieżka jest poprawna i typ NavLink jest eksportowany z pliku navbar.ts
import { navLinks, NavLink } from '../../data/navbar';

// --- KOMPONENT 1: Renderuje pojedynczy link nawigacyjny ---

const linkVariants = {
  primary: 'px-4 py-2 rounded-3xl font-bold lg:text-base xl:text-lg hover:bg-philippineSilver hover:text-raisinBlack hover:scale-105',
  subtle: 'hover:font-bold hover:text-philippineSilver',
};

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: keyof typeof linkVariants;
}

export const NavigationLink = ({
  href,
  children,
  className,
  onClick,
  variant = 'primary',
}: NavigationLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const finalClasses = twMerge(
    clsx(
      'font-montserrat duration-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver rounded',
      linkVariants[variant],
      {
        'bg-philippineSilver/20 text-philippineSilver': isActive && variant === 'primary',
      },
      className
    )
  );

  return (
    <Link href={href} className={finalClasses} onClick={onClick}>
      {children}
    </Link>
  );
};


// --- KOMPONENT 2: Renderuje listę linków nawigacyjnych ---

interface NavigationListProps {
  links?: NavLink[]; // Opcjonalny prop do przekazania niestandardowej listy linków
  listClassName?: string;
  linkVariant?: keyof typeof linkVariants;
  onLinkClick?: () => void;
}

export const NavigationList = ({
  links = navLinks, // Domyślnie używa pełnej listy, jeśli `links` nie zostanie podane
  listClassName,
  linkVariant,
  onLinkClick,
}: NavigationListProps) => {
  return (
    <ul className={listClassName}>
      {links.map((item) => (
        <li key={item.href}>
          <NavigationLink
            href={item.href}
            variant={linkVariant}
            onClick={onLinkClick}
          >
            {item.label}
          </NavigationLink>
        </li>
      ))}
    </ul>
  );
};