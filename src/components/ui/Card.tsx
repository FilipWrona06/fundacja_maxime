// src/components/ui/Card.tsx

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Definiujemy interfejs propsów dla naszego komponentu
interface CardProps {
  // Ścieżka, do której prowadzi link
  href: string;
  // Ścieżka do obrazka
  imageSrc: string;
  // Tekst alternatywny dla obrazka
  imageAlt: string;
  // Data lub inna krótka informacja (np. lokalizacja)
  date: string;
  // Główny tytuł karty
  title: string;
  // Krótki fragment tekstu lub opis
  excerpt: string;
  // Opcjonalne dodatkowe klasy CSS dla głównego kontenera
  className?: string;
  // Opcjonalne elementy-dzieci, np. przyciski
  children?: React.ReactNode;
}

export const Card = ({
  href,
  imageSrc,
  imageAlt,
  date,
  title,
  excerpt,
  className = '',
  children,
}: CardProps) => {
  return (
    // Łączymy bazowe style z opcjonalnymi, przekazanymi przez props `className`
    <div
      className={`group bg-transparent border-2 border-philippineSilver shadow-lg hover:shadow-2xl hover:scale-105 rounded-3xl overflow-hidden transition-all duration-250 ${className}`}
    >
      <div className="md:flex">
        {/* Sekcja Obrazka */}
        <div className="md:flex-shrink-0 md:w-5/12">
          <Link
            href={href}
            className="relative block h-48 md:h-full w-full"
            aria-label={`Przeczytaj więcej o ${title}`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Sekcja Treści */}
        <div className="p-8 md:w-7/12 flex flex-col justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide">
              {date}
            </p>
            <Link href={href}>
              <h2 className="mt-2 text-2xl font-bold transition-colors">{title}</h2>
            </Link>
            <p className="mt-4">{excerpt}</p>
          </div>
          
          {/* Miejsce na dodatkowe elementy, np. przyciski */}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </div>
  );
};