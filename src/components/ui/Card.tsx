import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Interfejs propsów pozostaje bez zmian
interface CardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  title: string;
  excerpt: string;
  className?: string;
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
    <div
      className={`group relative bg-transparent border-2 border-philippineSilver shadow-lg hover:shadow-2xl hover:scale-105 rounded-3xl overflow-hidden transition-all duration-250 ${className}`}
    >
      <div className="md:flex">
        {/* Sekcja Obrazka */}
        <div className="md:flex-shrink-0 md:w-5/12">
          <div className="relative h-48 md:h-full w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300"
            />
          </div>
        </div>

        {/* Sekcja Treści */}
        <div className="p-8 md:w-7/12 flex flex-col justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide">
              {date}
            </p>
            <h2 className="mt-2 text-2xl font-bold transition-colors">{title}</h2>
            <p className="mt-4">{excerpt}</p>
          </div>
          
          {/* ZMIANA: Dodajemy klasę `w-fit`, aby kontener dopasował się do szerokości przycisku */}
          {children && <div className="relative z-20 mt-6 w-fit">{children}</div>}
        </div>
      </div>

      {/* Link-nakładka pokrywający całą kartę */}
      <Link href={href} className="absolute inset-0 z-10" aria-label={`Przeczytaj więcej o ${title}`}>
        <span className="sr-only">Przeczytaj więcej o {title}</span>
      </Link>
    </div>
  );
};