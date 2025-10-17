// src/app/(user)/events/page.tsx

import React from 'react';
import { upcomingEvents, pastEvents, formatEventDateTimeToPolish } from '@/data/events';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card'; // <-- NOWY IMPORT

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          title="Wydarzenia"
          description="Zobacz, gdzie możesz nas spotkać i wesprzeć nasze działania na żywo!"
        />

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Sekcja Nadchodzących Wydarzeń */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Nadchodzące wydarzenia</h2>
            <div className="space-y-12">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  // Użycie nowego komponentu Card
                  <Card
                    key={event.id}
                    href={`/events/${event.slug}`}
                    imageSrc={event.imageSrc}
                    imageAlt={event.title}
                    date={formatEventDateTimeToPolish(event.dateTime)}
                    title={event.title}
                    excerpt={event.location}
                  >
                    {/* Przekazanie przycisków jako 'children' */}
                    {event.status === 'nadchodzące' && (
                      <Button asLink href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
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
                <p>Obecnie nie planujemy żadnych wydarzeń. Sprawdź ponownie później!</p>
              )}
            </div>
          </section>

          {/* Sekcja Archiwum Wydarzeń */}
          {pastEvents.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Archiwum wydarzeń</h2>
              <div className="space-y-12">
                {pastEvents.map((event) => (
                  // Użycie Card z dodatkową klasą dla efektu wizualnego
                  <Card
                    key={event.id}
                    href={`/events/${event.slug}`}
                    imageSrc={event.imageSrc}
                    imageAlt={event.title}
                    date={formatEventDateTimeToPolish(event.dateTime)}
                    title={event.title}
                    excerpt={event.location}
                    className="opacity-60" // <-- Przekazanie dodatkowej klasy
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