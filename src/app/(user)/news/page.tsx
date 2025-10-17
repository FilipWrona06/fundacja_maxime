// src/app/(user)/news/page.tsx

import { PageHeader } from '@/components/ui/PageHeader';
import { newsData, formatToPolishDate } from '@/data/news';
import React from 'react';
import { Card } from '@/components/ui/Card'; // <-- NOWY IMPORT

export default function NewsPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          title="Aktualności"
          description="Bądź na bieżąco z życiem naszej fundacji."
        />

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {newsData.map((article) => (
              // Użycie nowego komponentu Card
              <Card
                key={article.id}
                href={`/news/${article.slug}`}
                imageSrc={article.imageSrc}
                imageAlt={article.title}
                date={formatToPolishDate(article.date)}
                title={article.title}
                excerpt={article.excerpt}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}