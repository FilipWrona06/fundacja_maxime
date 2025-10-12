import Image from 'next/image';
import React from 'react';

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

const timelineData: TimelineItem[] = [
  {
    year: '2022',
    title: 'Początki i pierwsze sukcesy',
    description: 'Wierzymy, że kluczem do lepszej przyszłości jest dostęp do wiedzy. Organizujemy warsztaty, szkolenia i spotkania, które inspirują do działania i poszerzania horyzontów.',
    imageUrl: '/about/2022.jpg',
    imageAlt: 'Wydarzenia fundacji z roku 2022',
  },
  {
    year: '2023',
    title: 'Rozwój społeczności',
    description: 'Nasza siła tkwi w społeczności. Budujemy mosty między ludźmi, tworząc przestrzeń do wzajemnej pomocy i integracji. Działamy lokalnie, myśląc globalnie.',
    imageUrl: '/about/2023.png',
    imageAlt: 'Wydarzenia fundacji z roku 2023',
  },
  {
    year: '2024',
    title: 'Nowe horyzonty',
    description: 'Każdy projekt tworzymy z pasją i zaangażowaniem, dążąc do realnej zmiany i wspierania talentów w naszej społeczności.',
    imageUrl: '/about/2024.jpeg',
    imageAlt: 'Wydarzenia fundacji z roku 2024',
  },
  {
    year: '2025',
    title: 'Patrzymy w przyszłość',
    description: 'Nasze inicjatywy mają realny i trwały wpływ na otoczenie. Planujemy dalszy rozwój i nowe, ekscytujące projekty.',
    imageUrl: '/about/2025.jpg',
    imageAlt: 'Wydarzenia fundacji z roku 2025',
  },
];

// ===================================
//  GŁÓWNY I JEDYNY KOMPONENT STRONY "O NAS"
// ===========================================

export default function AboutPage() {
   return (
    <main className="container mx-auto px-6 py-16 md:py-24">
      
      {/* ============================================== */}
      {/* SEKCJA MISJI*/}
      {/* ============================================ */}
      <section className="text-center mb-20">
        <h1 className="text-4xl lg:text-5xl font-montserrat font-bold mb-4">
          Nasza Misja
        </h1>
        <p className="mt-6 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
          W Fundacji Maxime wierzymy, że każdy zasługuje na równe szanse. Naszą misją jest tworzenie inspirującej przestrzeni dla rozwoju, edukacji i integracji społecznej.
        </p>
        <div className="w-3/4 h-0.5 bg-philippineSilver mx-auto mt-8"></div>
      </section>

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