import React from 'react';
import { socialPlatforms } from '@/data/socials'; // Krok 1: Importujemy czyste dane
import { FaFacebook, FaInstagram, FaYoutube, FaHeart } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Krok 2: Definiujemy warstwę prezentacji (mapowanie nazw na ikony)
const socialIcons: { [key: string]: React.ReactNode } = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  patronite: <FaHeart />,
};

// Krok 3: Definiujemy propsy. Komponent przyjmuje teraz tylko `className`.
interface SocialLinksProps {
  className?: string;
}

// Krok 4: Komponent renderuje całą grupę linków, a nie pojedynczy.
export const SocialLinks = ({ className }: SocialLinksProps) => {
  const finalClasses = twMerge(clsx('flex gap-6', className));

  return (
    <div className={finalClasses}>
      {socialPlatforms.map((platform) => (
        <a
          key={platform.platform}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          title={platform.title}
          className="hover:scale-125 ml-1 text-2xl transition-transform duration-250"
        >
          {socialIcons[platform.platform]}
        </a>
      ))}
    </div>
  );
};