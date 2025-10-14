//src/app/(user)/about/page.tsx
import { PageHeader } from '@/components/ui/PageHeader';
import { timelineData } from '@/data/about';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
  title: 'O nas',
  description: 'Poznaj historię Fundacji Maxime - orkiestry symfonicznej działającej od 2022 roku. Dowiedz się o naszej misji, wartościach i osiągnięciach.',
  openGraph: {
    title: 'O nas - Fundacja Maxime',
    description: 'Poznaj historię i misję Fundacji Maxime - orkiestry symfonicznej działającej z pasji do muzyki klasycznej.',
    images: ['/og-about.jpg'],
  },
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-16 md:py-24">
      
      <PageHeader
        title='Nasza Misja'
        description='W Fundacji Maxime wierzymy, że każdy zasługuje na równe szanse. Naszą misją jest tworzenie inspirującej przestrzeni dla rozwoju, edukacji i integracji społecznej poprzez muzykę klasyczną.'
      />

      {/* SEKCJA OSI CZASU */}
      <div className="space-y-16 md:space-y-24">
        {timelineData.map((item, index) => {
          const isReversed = index % 2 !== 0;
          const flexDirection = isReversed ? 'md:flex-row-reverse' : 'md:flex-row';
          const isFirstItem = index === 0;

          return (
            <section 
              key={item.year} 
              className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${flexDirection}`}
              aria-labelledby={`timeline-${item.year}`}
            >
              
              {/* Obraz */}
              <div className="w-full md:w-5/12">
                <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-philippineSilver shadow-xl transition-transform duration-300 hover:scale-105">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover"
                    priority={isFirstItem}
                    loading={isFirstItem ? 'eager' : 'lazy'}
                  />
                </div>
              </div>

              {/* Treść */}
              <div className="w-full md:w-7/12 space-y-4">
                <div className="inline-block px-4 py-1 bg-philippineSilver/10 rounded-full border border-philippineSilver/20">
                  <span className="text-xl font-montserrat font-bold text-philippineSilver">
                    {item.year}
                  </span>
                </div>
                
                <h2 
                  id={`timeline-${item.year}`}
                  className="text-3xl lg:text-4xl font-montserrat font-bold"
                >
                  {item.title}
                </h2>
                
                <p className="text-base md:text-lg font-montserrat leading-relaxed text-philippineSilver">
                  {item.description}
                </p>
              </div>

            </section>
          );
        })}
      </div>

    </main>
  );
}