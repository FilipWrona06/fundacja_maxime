// src/app/(user)/events/[slug]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
// ZMIANA: Importujemy allEventsData ORAZ formatEventDateTimeToPolish
import { allEventsData, formatEventDateTimeToPolish } from '@/data/events';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';

// ======================================================
//  FUNKCJE NEXT.JS DO OBSŁUGI DANYCH
// ======================================================

export async function generateStaticParams() {
  // Używamy `allEventsData` do generowania statycznych ścieżek
  return allEventsData.map((event) => ({
    slug: event.slug,
  }));
}

// ====================================================
//  GŁÓWNY KOMPONENT STRONY POJEDYNCZEGO WYDARZENIA
// ====================================================
export default function EventPage({ params }: { params: { slug: string } }) {
  // Wyszukujemy wydarzenie w `allEventsData`
  const event = allEventsData.find((e) => e.slug === params.slug);

  // Jeśli wydarzenie o danym slugu nie istnieje, zwróć stronę 404
  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
         
          {/* Obrazek wydarzenia */}
          <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-lg">
            <Image
              src={event.imageSrc}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Użycie zrefaktoryzowanego komponentu PageHeader */}
          <PageHeader title={event.title}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-lg">
              {/* ZMIANA: Używamy formatEventDateTimeToPolish do wyświetlania daty i czasu */}
              <span>📅 {formatEventDateTimeToPolish(event.dateTime)}</span>
              {/* Lokalizacja nadal jest oddzielną właściwością */}
              <span>📍 {event.location}</span>
            </div>
          </PageHeader>

          {/* Szczegóły wydarzenia */}
          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: event.details }}
          />
          
          {/* Przycisk powrotu */}
          <div className="mt-12 text-center">
            <Button asLink href="/events">
              ← Wróć do wszystkich wydarzeń
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}