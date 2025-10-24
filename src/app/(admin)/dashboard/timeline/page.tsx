import { createClient } from '@/lib/supabase/server';
import { TimelineClientPage } from './TimelineClientPage';

export default async function ManageTimelinePage() {
  const supabase = await createClient();
  // ZMIANA 6: Zmieniamy sortowanie z 'year' na 'created_at'
  const { data: timelineItems, error } = await supabase
    .from('timeline')
    .select('*')
    .order('created_at', { ascending: false }); // Najnowsze na górze

  if (error) {
    return <p className="text-red-500">Wystąpił błąd podczas pobierania danych: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Zarządzaj Historią</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">Dodawaj i usuwaj elementy z historii fundacji.</p>
      
      <TimelineClientPage initialItems={timelineItems || []} />
    </div>
  );
}