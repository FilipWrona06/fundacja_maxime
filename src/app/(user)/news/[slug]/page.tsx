// src/app/(user)/news/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
// Zmieniamy import, aby uwzględnić formatToPolishDate
import { newsData, formatToPolishDate } from '@/data/news';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';

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
export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // POPRAWKA: Destrukturyzujemy `slug` z `params` przed jego użyciem.
  const { slug } = await params;
  const article = newsData.find((a) => a.slug === slug);

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
            priority // `priority` jest dobrym pomysłem dla obrazu LCP
          />
        </div>

        <PageHeader
          title={article.title}
          // Używamy formatToPolishDate, aby data była wyświetlana w polskim formacie
          publishDate={formatToPolishDate(article.date)}
          className="text-left"
        />

        <article
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/*Przycisk Powrotu*/}
        <div className="text-center mt-12"> {/* Zwiększyłem trochę margines dla lepszego wyglądu */}
          <Button asLink href="/news">
            ← Wróć do aktualności
          </Button>
        </div>
      </div>
    </main>
  );
}