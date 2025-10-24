import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { deleteNewsArticle } from '@/actions/news';

export default async function ManageNewsPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase.from('news').select('*').order('date', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Zarządzaj Aktualnościami</h1>
        <Button asLink href="/dashboard/news/new">Dodaj nowy artykuł</Button>
      </div>
      <ul className="space-y-4">
        {articles?.map(article => (
          <li key={article.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-md shadow">
            <span>{article.title}</span>
            <div className="flex gap-4">
              <Link href={`/dashboard/news/edit/${article.id}`} className="font-medium text-indigo-600">Edytuj</Link>
              <form action={deleteNewsArticle.bind(null, article.id, article.image_url)}>
                <button type="submit" className="font-medium text-red-600">Usuń</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}