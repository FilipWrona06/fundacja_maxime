import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// =====================================================
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
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa. Nowa placówka pozwoli nam dotrzeć z pomocą do jeszcze większej liczby potrzebujących w regionie Małopolski.</p><p>Uroczystość uświetnili swoją obecnością przedstawiciele władz miasta, nasi wieloletni darczyńcy oraz wolontariusze. Dziękujemy za każde dobre słowo i wsparcie, które otrzymaliśmy. Przed nami wiele wyzwań, ale jesteśmy pełni optymizmu i energii do działania!</p>`,
  },
  {
    id: 2,
    title: 'Podsumowanie akcji charytatywnej "Zima 2025"',
    date: '28 sierpnia 2025',
    excerpt: 'Dzięki Waszej hojności udało nam się zebrać rekordową kwotę...',
    imageSrc: '/news/news2.jpg',
    slug: 'podsumowanie-akcji-charytatywnej-zima-2025',
    content: `<p>Akcja "Zima 2025" przerosła nasze najśmielsze oczekiwania...</p>`,
  },
  {
    id: 3,
    title: 'Zapraszamy na warsztaty kreatywne dla dzieci',
    date: '15 sierpnia 2025',
    excerpt: 'Już w najbliższą sobotę odbędą się darmowe warsztaty plastyczne...',
    imageSrc: '/news/news3.jpg',
    slug: 'zapraszamy-na-warsztaty-kreatywne-dla-dzieci',
    content: `<p>Kreatywność to supermoc! W najbliższą sobotę zapraszamy wszystkie dzieci...</p>`,
  },
];


// ======================================================
//  2. FUNKCJE NEXT.JS DO OBSŁUGI DANYCH
// =======================================================

// Generuje statyczne strony dla każdego artykułu podczas budowania
export async function generateStaticParams() {
  return newsData.map((article) => ({
    slug: article.slug,
  }));
}

// ======================================================
//  3. GŁÓWNY KOMPONENT STRONY POJEDYNCZEGO ARTYKUŁU
// =======================================================
export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = newsData.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <Image
            src={article.imageSrc}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <header>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-lg">
            Opublikowano: {article.date}
          </p>
        </header>

        <hr className="my-8 border-philippineSilver" />

        <article 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/*Przycisk Powrotu*/}
        <div className="text-center mt-12">
          <Link
            href="/news"
            className="bg-transparent border-2 border-philippineSilver rounded-full px-8 py-3 text-sm font-montserrat font-bold tracking-wider hover:bg-philippineSilver hover:text-raisinBlack transition-all duration-250"
          >
            ← Wróć do aktualności
          </Link>
        </div>
      </div>
    </main>
  );
}