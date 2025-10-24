import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { formatEventDateTimeToPolish } from '@/data/events'; // Upewnij się, że ta funkcja jest w `utils`
import { Metadata } from 'next';

// Metadane dla strony
export const metadata: Metadata = {
  title: 'Wydarzenia',
  description: 'Zobacz, gdzie możesz nas spotkać i wesprzeć nasze działania na żywo!',
};

// Typ danych pasujący do tabeli 'events' w bazie
type EventFromDB = {
  id: number;
  title: string;
  date_time: string;
  location: string;
  image_url: string;
  ticket_url: string;
  status: 'nadchodzące' | 'wyprzedane' | 'zakończone';
  slug: string;
  details: string;
}

// Główny komponent strony (Server Component)
export default async function EventsPage() {
  const supabase = await createClient();
  const now = new Date().toISOString(); // Aktualny czas w formacie ISO

  // 1. Pobieramy nadchodzące wydarzenia (data w przyszłości), sortując od najbliższego
  const { data: upcomingEvents, error: upcomingError } = await supabase
    .from('events')
    .select('*')
    .gte('date_time', now) // gte = greater than or equal to
    .order('date_time', { ascending: true });

  // 2. Pobieramy archiwalne wydarzenia (data w przeszłości), sortując od najnowszego
  const { data: pastEvents, error: pastError } = await supabase
    .from('events')
    .select('*')
    .lt('date_time', now) // lt = less than
    .order('date_time', { ascending: false });

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          title="Wydarzenia"
          description="Zobacz, gdzie możesz nas spotkać i wesprzeć nasze działania na żywo!"
        />

        <div className="max-w-4xl mx-auto space-y-16 mt-12">
          
          {/* Sekcja Nadchodzących Wydarzeń */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Nadchodzące wydarzenia</h2>
            {upcomingError && <p className="text-red-500">Nie udało się załadować nadchodzących wydarzeń.</p>}
            <div className="space-y-12">
              {upcomingEvents && upcomingEvents.length > 0 ? (
                upcomingEvents.map((event: EventFromDB) => (
                  <Card
                    key={event.id}
                    href={`/events/${event.slug}`}
                    imageSrc={event.image_url}
                    imageAlt={event.title}
                    date={formatEventDateTimeToPolish(event.date_time)}
                    title={event.title}
                    excerpt={event.location} // Używamy lokalizacji jako "excerpt"
                  >
                    {/* Warunkowe renderowanie przycisków jako 'children' */}
                    {event.status === 'nadchodzące' && (
                      <Button asLink href={event.ticket_url} target="_blank" rel="noopener noreferrer">
                        Kup Bilet
                      </Button>
                    )}
                    {event.status === 'wyprzedane' && (
                      <Button disabled variant="solid">
                        Wyprzedane
                      </Button>
                    )}
                  </Card>
                ))
              ) : (
                <p className="text-gray-500">Obecnie nie planujemy żadnych wydarzeń. Sprawdź ponownie później!</p>
              )}
            </div>
          </section>

          {/* Sekcja Archiwum Wydarzeń (renderowana tylko, jeśli są jakieś archiwalne wydarzenia) */}
          {pastEvents && pastEvents.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Archiwum wydarzeń</h2>
              {pastError && <p className="text-red-500">Nie udało się załadować archiwalnych wydarzeń.</p>}
              <div className="space-y-12">
                {pastEvents.map((event: EventFromDB) => (
                  <Card
                    key={event.id}
                    href={`/events/${event.slug}`}
                    imageSrc={event.image_url}
                    imageAlt={event.title}
                    date={formatEventDateTimeToPolish(event.date_time)}
                    title={event.title}
                    excerpt={event.location}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}