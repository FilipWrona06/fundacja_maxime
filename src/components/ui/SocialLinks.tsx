// src/components/ui/SocialLinks.tsx
import React from 'react';
import { socialPlatforms } from '@/data/socials';
import { FaFacebook, FaInstagram, FaYoutube, FaHeart } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const socialIcons: { [key: string]: React.ReactNode } = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  patronite: <FaHeart />,
};

interface SocialLinksProps {
  className?: string;
}

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
          aria-label={platform.title}
          className="hover:scale-125 text-2xl transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver rounded"
        >
          {socialIcons[platform.platform]}
        </a>
      ))}
    </div>
  );
};