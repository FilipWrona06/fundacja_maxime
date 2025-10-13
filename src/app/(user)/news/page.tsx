import { PageHeader } from '@/components/ui/PageHeader';
import { newsData } from '@/data/news';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// =================================================
//  1. CENTRALNA DEFINICJA DANYCH DLA AKTUALNOŚCI
// ====================================================

// ===================================================
//  2. GŁÓWNY KOMPONENT STRONY Z LISTĄ AKTUALNOŚCI
// ====================================================
export default function NewsPage(){
    return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
        title='Aktualności'
        description='Bądź na bieżąco z życiem naszej fundacji.'
        dividerWidth='3/5'
        />

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {newsData.map((article) => (
              <Link
                href={`/news/${article.slug}`}
                key={article.id}
                className="block group bg-transparent border-2 border-philippineSilver shadow-lg hover:shadow-2xl hover:scale-105 rounded-3xl overflow-hidden transition-all duration-250"
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