// src/components/ui/NavigationLinks.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Definiujemy warianty stylów
const linkVariants = {
  primary: 'px-3 py-2 rounded-3xl font-bold lg:text-base xl:text-lg hover:bg-philippineSilver hover:scale-105',
  subtle: 'hover:font-bold', // Prostszy wariant dla stopki
};

interface NavigationLinksProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: keyof typeof linkVariants; // Dodajemy prop wariantu
}

export const NavigationLinks = ({
  href,
  children,
  className,
  onClick,
  variant = 'primary', // Ustawiamy 'primary' jako domyślny
}: NavigationLinksProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const finalClasses = twMerge(
    clsx(
      'font-montserrat duration-250 transition-colors', // Wspólne style
      linkVariants[variant], // Dynamicznie stosujemy style wariantu
      {
        // Aktywny stan ma sens tylko dla wariantu 'primary'
        'bg-philippineSilver/20': isActive && variant === 'primary',
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