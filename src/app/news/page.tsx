import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// =================================================
//  1. CENTRALNA DEFINICJA DANYCH DLA AKTUALNOŚCI
// ====================================================

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  imageSrc: string;
  slug: string;
  content: string;
}

export const newsData: NewsArticle[] = [
  {
    id: 1,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    date: '12 września 2025',
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji',
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 2,
    title: 'Podsumowanie akcji charytatywnej "Zima 2025"',
    date: '28 sierpnia 2025',
    excerpt: 'Dzięki Waszej hojności udało nam się zebrać rekordową kwotę, która pozwoli na pomoc ponad 200 rodzinom w trudnej sytuacji. Zobaczcie szczegóły!',
    imageSrc: '/news/news2.jpg',
    slug: 'podsumowanie-akcji-charytatywnej-zima-2025',
    content: `<p>Akcja "Zima 2025" przerosła nasze najśmielsze oczekiwania...</p>`,
  },
  {
    id: 3,
    title: 'Zapraszamy na warsztaty kreatywne dla dzieci',
    date: '15 sierpnia 2025',
    excerpt: 'Już w najbliższą sobotę odbędą się darmowe warsztaty plastyczne dla dzieci w wieku 6-12 lat. Liczba miejsc ograniczona, zapisz się już dziś.',
    imageSrc: '/news/news3.jpg',
    slug: 'zapraszamy-na-warsztaty-kreatywne-dla-dzieci',
    content: `<p>Kreatywność to supermoc! W najbliższą sobotę zapraszamy wszystkie dzieci...</p>`,
  },
];

// ===================================================
//  2. GŁÓWNY KOMPONENT STRONY Z LISTĄ AKTUALNOŚCI
// ====================================================
export default function NewsPage(){
    return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Aktualności
          </h1>
          <p className="mt-4 text-lg">
            Bądź na bieżąco z życiem naszej fundacji.
          </p>
          <div className="w-3/4 h-0.5 bg-philippineSilver mx-auto mt-8"></div>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {newsData.map((article) => (
              <Link
                href={`/news/${article.slug}`}
                key={article.id}
                className="block group bg-transparent border-2 border-philippineSilver hover:font-semibold shadow-lg hover:shadow-2xl hover:scale-105 rounded-3xl overflow-hidden hover:bg-philippineSilver hover:text-raisinBlack transition-all duration-250"
              >
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-5/12">
                    <div className="relative h-48 md:h-full w-full">
                      <Image
                        src={article.imageSrc}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="p-8 md:w-7/12">
                    <p className="text-sm font-bold uppercase tracking-wide">{article.date}</p>
                    <h2 className="mt-2 text-2xl font-bold transition-colors">{article.title}</h2>
                    <p className="mt-4">{article.excerpt}</p>
                    <p className="mt-6 font-bold">Czytaj dalej →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
    );
};