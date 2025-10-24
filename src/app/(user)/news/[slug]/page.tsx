import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Metadata } from 'next';
import { formatToPolishDate } from '@/data/news';

// Wymusza dynamiczne renderowanie strony przy każdym żądaniu.
// To jest najbezpieczniejsze ustawienie dla treści, które często się zmieniają.
export const dynamic = 'force-dynamic';

// Definicja typu dla danych artykułu
type Article = {
  id: number;
  created_at: string;
  title: string;
  date: string;
  excerpt: string;
  image_url: string;
  slug: string;
  content: string;
};

// ======================================================
//  FUNKCJE NEXT.JS DO OBSŁUGI DANYCH
// =======================================================

/**
 * Generuje dynamiczne metadane (tytuł i opis) dla każdej strony artykułu.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Rozpakowujemy Promise, aby uzyskać dostęp do parametrów
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const supabase = await createClient();
  const { data: article } = await supabase
    .from('news')
    .select('title, excerpt')
    .eq('slug', slug)
    .single();

  if (!article) {
    return { title: 'Nie znaleziono artykułu' };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

// ======================================================
//  GŁÓWNY KOMPONENT STRONY
// =======================================================
// Sygnatura funkcji uwzględnia, że `params` jest Promise
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  
  // Kluczowa poprawka: Czekamy na rozwiązanie obietnicy `params`
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const supabase = await createClient();
  
  const { data: article } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single() as { data: Article | null };

  if (!article) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
        
        <PageHeader
          title={article.title}
          publishDate={formatToPolishDate(article.date)}
          className="text-left items-start"
        />
        
        <article
          className="prose prose-lg dark:prose-invert max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <div className="text-center mt-16">
          <Button asLink href="/news">
            ← Wróć do aktualności
          </Button>
        </div>
      </div>
    </main>
  );
}