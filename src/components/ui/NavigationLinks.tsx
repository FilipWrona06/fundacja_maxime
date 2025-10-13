// src/components/ui/NavigationLinks.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const linkVariants = {
  primary: 'px-2.5 py-2 rounded-3xl font-bold lg:text-base xl:text-lg hover:bg-philippineSilver hover:text-raisinBlack hover:scale-105',
  subtle: 'hover:font-bold',
};

interface NavigationLinksProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: keyof typeof linkVariants;
}

export const NavigationLinks = ({
  href,
  children,
  className,
  onClick,
  variant = 'primary',
}: NavigationLinksProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const finalClasses = twMerge(
    clsx(
      'font-montserrat duration-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver',
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