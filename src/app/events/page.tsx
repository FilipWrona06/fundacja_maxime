import React from 'react';
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

// ========================================================
//  2. GŁÓWNY KOMPONENT STRONY Z LISTĄ WYDARZEŃ
// ========================================================
export default function EventsPage(){
    const upcomingEvents = eventsData.filter((event) => event.status !== 'zakończone');
  const pastEvents = eventsData.filter((event) => event.status === 'zakończone');

    return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Wydarzenia
          </h1>
          <p className="mt-4 text-lg">
            Zobacz, gdzie możesz nas spotkać i wesprzeć nasze działania na żywo!
          </p>
          <div className="w-3/4 h-0.5 bg-philippineSilver mx-auto mt-8"></div>
        </header>

        <div className="max-w-4xl mx-auto space-y-16">
          <section>
            <h2 className="text-3xl font-bold mb-8">Nadchodzące wydarzenia</h2>
            <div className="space-y-12">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`group bg-transparent border-2 border-philippineSilver hover:font-semibold shadow-lg hover:shadow-2xl hover:scale-105 rounded-3xl overflow-hidden hover:bg-philippineSilver hover:text-raisinBlack transition-all duration-250`}
                  >
                    <div className="md:flex">
                      <div className="md:flex-shrink-0 md:w-5/12">
                        <div className="relative h-48 md:h-full w-full">
                          <Image
                            src={event.imageSrc}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="p-8 md:w-7/12 flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wide">{`${event.date.day} ${event.date.month} ${event.date.year} · ${event.time}`}</p>
                          <Link href={`/events/${event.slug}`} className="cursor-pointer">
                            <h2 className="mt-2 text-2xl font-bold transition-colors">{event.title}</h2>
                          </Link>
                          <p className="mt-4">{event.location}</p>
                        </div>
                        <div>
                          {event.status === 'nadchodzące' && (
                            <Link
                              href={event.ticketUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-6 w-full md:w-auto inline-block text-center px-6 py-3 font-bold text-white bg-raisinBlack rounded-lg hover:bg-opacity-80 transition-all shadow-md hover:shadow-lg"
                            >
                              Kup Bilet
                            </Link>
                          )}
                          {event.status === 'wyprzedane' && (
                            <button disabled className="mt-6 w-full md:w-auto px-6 py-3 font-bold text-gray-700 bg-gray-200 rounded-lg cursor-not-allowed">
                              Wyprzedane
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Obecnie nie planujemy żadnych wydarzeń. Sprawdź ponownie później!</p>
              )}
            </div>
          </section>

          {pastEvents.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Archiwum wydarzeń</h2>
              <div className="space-y-12">
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`group bg-transparent border-2 border-philippineSilver hover:font-semibold shadow-lg hover:shadow-2xl hover:scale-105 rounded-3xl overflow-hidden hover:bg-philippineSilver hover:text-raisinBlack transition-all duration-250 opacity-60`}
                  >
                    <div className="md:flex">
                       <div className="md:flex-shrink-0 md:w-5/12">
                        <div className="relative h-48 md:h-full w-full">
                          <Image
                            src={event.imageSrc}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="p-8 md:w-7/12 flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wide">{`${event.date.day} ${event.date.month} ${event.date.year} · ${event.time}`}</p>
                          <Link href={`/events/${event.slug}`} className="cursor-pointer">
                            <h2 className="mt-2 text-2xl font-bold transition-colors">{event.title}</h2>
                          </Link>
                          <p className="mt-4">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};