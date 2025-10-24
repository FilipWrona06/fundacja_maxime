import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { createClient } from '@/lib/supabase/server';
import { formatToPolishDate } from '@/data/news'; // Zakładam, że ta funkcja jest w `utils`
import { Metadata } from 'next';

// Metadane dla strony, ważne dla SEO
export const metadata: Metadata = {
  title: 'Aktualności',
  description: 'Bądź na bieżąco z najnowszymi wydarzeniami i działaniami Fundacji Maxime.',
};

// Typ danych, który pasuje do struktury tabeli 'news' w Supabase
type NewsArticleFromDB = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image_url: string;
  slug: string;
  content: string;
};

// Główny komponent strony, renderowany na serwerze
export default async function NewsPage() {
  const supabase = await createClient();

  // Pobieramy wszystkie artykuły, sortując je od najnowszych do najstarszych
  const { data: newsData, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false });

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          title="Aktualności"
          description="Bądź na bieżąco z życiem naszej fundacji."
        />

        {/* Sprawdzamy, czy dane zostały poprawnie załadowane i czy są jakieś artykuły */}
        {error ? (
          <p className="text-center text-red-500 mt-12">Wystąpił błąd podczas ładowania aktualności.</p>
        ) : !newsData || newsData.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">Obecnie nie ma żadnych aktualności do wyświetlenia.</p>
        ) : (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="space-y-12">
              {/* Mapujemy pobrane dane i renderujemy komponent Card dla każdego artykułu */}
              {newsData.map((article: NewsArticleFromDB) => (
                <Card
                  key={article.id}
                  href={`/news/${article.slug}`}
                  imageSrc={article.image_url} // Przekazujemy `image_url` jako `imageSrc`
                  imageAlt={article.title}
                  date={formatToPolishDate(article.date)} // Formatujemy datę na polski format
                  title={article.title}
                  excerpt={article.excerpt}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}