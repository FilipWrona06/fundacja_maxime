import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { deleteEvent } from '@/actions/events';

export default async function ManageEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase.from('events').select('*').order('date_time', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Zarządzaj Wydarzeniami</h1>
        <Button asLink href="/dashboard/events/new">Dodaj nowe wydarzenie</Button>
      </div>
      <ul className="space-y-4">
        {events?.map(event => (
          <li key={event.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-md shadow">
            <span>{event.title}</span>
            <div className="flex gap-4">
              {/* Link do edycji można dodać później */}
              {/* <Link href={`/dashboard/events/edit/${event.id}`} className="font-medium text-indigo-600">Edytuj</Link> */}
              <form action={deleteEvent.bind(null, event.id, event.image_url)}>
                <button type="submit" className="font-medium text-red-600">Usuń</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}