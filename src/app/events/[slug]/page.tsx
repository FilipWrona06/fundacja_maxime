import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// =======================================================
//  1. CENTRALNA DEFINICJA DANYCH DLA WYDARZEŃ
// =======================================================

export interface Event {
  id: number;
  title: string;
  date: { day: string; month: string; year: string; };
  location: string;
  time: string;
  imageSrc: string;
  ticketUrl: string;
  status: 'nadchodzące' | 'wyprzedane' | 'zakończone';
  slug: string;
  details: string;
}

export const eventsData: Event[] = [
    {
    id: 1,
    title: 'Koncert Charytatywny: Gramy dla Dzieciaków',
    date: { day: '15', month: 'LIS', year: '2025' },
    location: 'Klub Stodoła, Warszawa',
    time: '19:00',
    imageSrc: '/events/event1.png',
    ticketUrl: 'https://www.biletomat.pl/',
    status: 'nadchodzące',
    slug: 'koncert-charytatywny-gramy-dla-dzieciakow-2025',
    details: `<p>Zapraszamy na wyjątkowy wieczór pełen muzyki i dobrych emocji! Całkowity dochód z biletów zostanie przeznaczony na wsparcie naszych podopiecznych. Na scenie wystąpią znani polscy artyści, którzy zjednoczyli siły dla szczytnego celu.</p><p>Nie może Cię zabraknąć!</p>`,
  },
  {
    id: 2,
    title: 'Akustyczny Wieczór z Gwiazdami',
    date: { day: '05', month: 'GRU', year: '2025' },
    location: 'Filharmonia Narodowa, Warszawa',
    time: '20:00',
    imageSrc: '/events/event2.png',
    ticketUrl: '#',
    status: 'wyprzedane',
    slug: 'akustyczny-wieczor-z-gwiazdami-2025',
    details: `<p>Niezapomniane aranżacje największych przebojów w wykonaniu czołowych artystów polskiej sceny muzycznej. Wydarzenie zamknięte, wszystkie bilety zostały wyprzedane w przedsprzedaży. Dziękujemy za ogromne zainteresowanie.</p>`,
  },
  {
    id: 3,
    title: 'Gala Fundacji Maxime 2024',
    date: { day: '10', month: 'WRZ', year: '2024' },
    location: 'Teatr Wielki - Opera Narodowa, Warszawa',
    time: '18:00',
    imageSrc: '/events/event3.png',
    ticketUrl: '#',
    status: 'zakończone',
    slug: 'gala-fundacji-maxime-2024',
    details: `<p>Podsumowanie rocznej działalności naszej fundacji. Wręczyliśmy nagrody naszym darczyńcom i wolontariuszom. Dziękujemy, że byliście z nami przez cały rok!</p>`,
  },
];


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
          
          <div className="mt-12 text-center">
            <Link
              href="/events"
              className="bg-transparent border-2 border-philippineSilver rounded-full px-8 py-3 text-sm font-montserrat font-bold tracking-wider hover:bg-philippineSilver hover:text-raisinBlack transition-all duration-250"
            >
              ← Wróć do wszystkich wydarzeń
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}