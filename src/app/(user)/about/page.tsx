import { Divider } from '@/components/ui/Divider';
import { PageHeader } from '@/components/ui/PageHeader';
import { timelineData } from '@/data/about';
import Image from 'next/image';
import React from 'react';

// ===================================
//  GŁÓWNY I JEDYNY KOMPONENT STRONY "O NAS"
// ===========================================

export default function AboutPage() {
   return (
    <main className="container mx-auto px-6 py-16 md:py-24">
      
      <PageHeader
      title='Nasza Misja'
      description='W Fundacji Maxime wierzymy, że każdy zasługuje na równe szanse. Naszą misją jest tworzenie inspirującej przestrzeni dla rozwoju, edukacji i integracji społecznej.'
      />

      {/* ============================================= */}
      {/* SEKCJA OSI CZASU*/}
      {/* ============================================= */}
      <div className="space-y-20">
        {timelineData.map((item, index) => {
          // Logika do odwracania układu co drugiego elementu
          const isReversed = index % 2 !== 0;
          const flexDirection = isReversed ? 'md:flex-row-reverse' : 'md:flex-row';

          return (
            //Pojedynczy element osi czasu
            <section key={item.year} className={`flex flex-col items-center gap-10 md:gap-16 ${flexDirection}`}>
              
              {/*Obraz*/}
              <div className="w-full md:w-5/12">
                <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-philippineSilver">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/*Treść*/}
              <div className="w-full md:w-7/12 text-center md:text-left">
                <h2 className="text-3xl font-montserrat font-bold mb-4">{item.year} - {item.title}</h2>
                <p className="text-lg font-montserrat leading-relaxed">
                  {item.description}
                </p>
              </div>

            </section>
          );
        })}
      </div>

    </main>
  );
};