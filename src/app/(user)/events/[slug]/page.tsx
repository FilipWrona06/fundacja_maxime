import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { eventsData } from '@/data/events';
import { Button } from '@/components/ui/Button';

// =======================================================
//  1. CENTRALNA DEFINICJA DANYCH DLA WYDARZEŃ
// =======================================================



// ======================================================
//  2. FUNKCJE NEXT.JS DO OBSŁUGI DANYCH
// ======================================================

export async function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }));
}

// ====================================================
//  3. GŁÓWNY KOMPONENT STRONY POJEDYNCZEGO WYDARZENIA
// ====================================================
export default function EventPage({ params }: { params: { slug: string } }) {
  const event = eventsData.find((e) => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {event.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-lg">
              <span>📅 {`${event.date.day} ${event.date.month} ${event.date.year}`}</span>
              <span>🕒 {event.time}</span>
              <span>📍 {event.location}</span>
            </div>
            <div className="w-3/4 h-0.5 bg-philippineSilver mx-auto mt-8"></div>
          </header>

          <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-lg">
            <Image
              src={event.imageSrc}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: event.details }}
          />
          
          <div className="mt-5 text-center">
            <Button asLink
              href="/events"
            >
              ← Wróć do wszystkich wydarzeń
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}