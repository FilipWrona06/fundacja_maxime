// src/components/ui/SocialLinks.tsx
import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaHeart } from 'react-icons/fa';

// 1. Definiujemy centralne dane dla każdej platformy
const socialPlatforms = {
  facebook: {
    href: 'https://www.facebook.com/stowarzyszeniemaxime',
    title: 'Nasz Facebook',
    icon: <FaFacebook />,
  },
  instagram: {
    href: 'https://www.instagram.com/maxime.orchestra/',
    title: 'Nasz Instagram',
    icon: <FaInstagram />,
  },
  youtube: {
    href: 'https://www.youtube.com/@stowarzyszeniemaxime',
    title: 'Nasz kanał YouTube',
    icon: <FaYoutube />,
  },
  patronite: {
    href: 'https://patronite.pl/stowarzyszeniemaxime',
    title: 'Wesprzyj nas na Patronite',
    icon: <FaHeart />,
  },
};

// 2. Typy propsów - teraz przyjmujemy tylko nazwę platformy
type Platform = keyof typeof socialPlatforms;

interface SocialLinksProps {
  platform: Platform;
}

// 3. Zaktualizowany komponent
export const SocialLinks = ({ platform }: SocialLinksProps) => {
  const platformData = socialPlatforms[platform];

  // Zabezpieczenie na wypadek podania nieprawidłowej platformy
  if (!platformData) {
    return null;
  }

  return (
    <a
      href={platformData.href}
      target="_blank"
      rel="noopener noreferrer"
      title={platformData.title}
      className="text-2xl hover:scale-125 transition-colors duration-250"
    >
      {platformData.icon}
    </a>
  );
};