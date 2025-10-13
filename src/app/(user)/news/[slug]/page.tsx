import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { newsData } from '@/data/news';
import { Button } from '@/components/ui/Button';

// =====================================================
//  1. CENTRALNA DEFINICJA DANYCH DLA AKTUALNOŚCI
// ====================================================


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
        <div className="text-center mt-5">
          <Button asLink
            href="/news"
          >
            ← Wróć do aktualności
          </Button>
        </div>
      </div>
    </main>
  );
}