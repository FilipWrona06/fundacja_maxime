// src/data/events.ts

export interface Event {
  id: number;
  title: string;
  date: { day: string; month: string; year: string; };
  location: string;
  time: string;
  imageSrc: string;
  ticketUrl: string;
  // Status nie jest już kluczowy do kategoryzacji, ale wciąż przydatny do oznaczania "wyprzedanych"
  status: 'nadchodzące' | 'wyprzedane' | 'zakończone';
  slug: string;
  details: string;
}

const eventsDataRaw: Event[] = [
  // Twoja lista wydarzeń pozostaje bez zmian...
  {
    id: 1,
    title: 'Koncert Charytatywny: Gramy dla Dzieciaków',
    date: { day: '15', month: 'LIS', year: '2025' },
    location: 'Klub Stodoła, Warszawa',
    time: '19:00',
    imageSrc: '/events/event1.jpg',
    ticketUrl: 'https://www.biletomat.pl/',
    status: 'nadchodzące',
    slug: 'koncert-charytatywny-gramy-dla-dzieciakow-2025',
    details: `<p>Zapraszamy na wyjątkowy wieczór pełen muzyki i dobrych emocji!</p>`,
  },
  {
    id: 2,
    title: 'Akustyczny Wieczór z Gwiazdami',
    date: { day: '05', month: 'GRU', year: '2025' },
    location: 'Filharmonia Narodowa, Warszawa',
    time: '20:00',
    imageSrc: '/events/event2.jpg',
    ticketUrl: '#',
    status: 'wyprzedane',
    slug: 'akustyczny-wieczor-z-gwiazdami-2025',
    details: `<p>Niezapomniane aranżacje największych przebojów.</p>`,
  },
  {
    id: 3,
    title: 'Gala Fundacji Maxime 2024',
    date: { day: '10', month: 'WRZ', year: '2024' },
    location: 'Teatr Wielki - Opera Narodowa, Warszawa',
    time: '18:00',
    imageSrc: '/events/event3.jpg',
    ticketUrl: '#',
    status: 'zakończone',
    slug: 'gala-fundacji-maxime-2024',
    details: `<p>Podsumowanie rocznej działalności naszej fundacji.</p>`,
  },
  {
    id: 4,
    title: 'Wielki Bieg Charytatywny',
    date: { day: '14', month: 'PAŹ', year: '2025' },
    location: 'Park Skaryszewski, Warszawa',
    time: '10:00',
    imageSrc: '/events/event3.jpg',
    ticketUrl: 'https://www.biletomat.pl/',
    status: 'nadchodzące',
    slug: 'wielki-bieg-charytatywny-2025',
    details: `<p>Dołącz do nas i pobiegnij dla dobrej sprawy!</p>`,
  },
  {
    id: 5,
    title: 'Aukcja Sztuki Nowoczesnej',
    date: { day: '01', month: 'MAR', year: '2025' },
    location: 'Muzeum Narodowe, Warszawa',
    time: '17:00',
    imageSrc: '/events/event2.jpg',
    ticketUrl: '#',
    status: 'zakończone',
    slug: 'aukcja-sztuki-nowoczesnej-2025',
    details: `<p>Dziękujemy wszystkim za udział w licytacjach.</p>`,
  }
];

/**
 * Konwertuje datę i czas wydarzenia na pełny obiekt Date.
 * @param event - Obiekt wydarzenia.
 * @returns Pełny obiekt Date z datą i godziną.
 */
const getEventDateTime = (event: Event): Date => {
  const monthMap: { [key: string]: number } = {
    'STY': 0, 'LUT': 1, 'MAR': 2, 'KWI': 3, 'MAJ': 4, 'CZE': 5,
    'LIP': 6, 'SIE': 7, 'WRZ': 8, 'PAŹ': 9, 'LIS': 10, 'GRU': 11
  };
  const day = parseInt(event.date.day, 10);
  const month = monthMap[event.date.month.toUpperCase()];
  const year = parseInt(event.date.year, 10);
  const [hours, minutes] = event.time.split(':').map(Number);

  return new Date(year, month, day, hours, minutes);
};

/**
 * Przetwarza surowe dane o wydarzeniach: dzieli na nadchodzące i archiwalne,
 * a następnie sortuje obie grupy.
 * @returns Obiekt zawierający dwie posortowane listy: upcomingEvents i pastEvents.
 */
export const allEventsData: Event[] = eventsDataRaw;

const processEventsData = () => {
  const now = new Date(); // Pobranie aktualnej daty i godziny
  const upcomingEvents: Event[] = [];
  const pastEvents: Event[] = [];

  // 1. Dynamiczny podział wydarzeń na podstawie aktualnego czasu
  eventsDataRaw.forEach(event => {
    const eventDate = getEventDateTime(event);
    if (eventDate > now) {
      upcomingEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });

  // 2. Sortowanie nadchodzących wydarzeń (od najbliższego do najdalszego)
  upcomingEvents.sort((a, b) => getEventDateTime(a).getTime() - getEventDateTime(b).getTime());

  // 3. Sortowanie archiwalnych wydarzeń (od najświeższego do najstarszego)
  pastEvents.sort((a, b) => getEventDateTime(b).getTime() - getEventDateTime(a).getTime());

  return { upcomingEvents, pastEvents };
};

// Eksportujemy przetworzone i posortowane dane
export const { upcomingEvents, pastEvents } = processEventsData();