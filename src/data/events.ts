// src/data/events.ts

export interface Event {
  id: number;
  title: string;
  // Zmieniamy na pojedynczy string w formacie ISO 8601 (np. 'RRRR-MM-DDTHH:mm')
  dateTime: string;
  location: string;
  imageSrc: string;
  ticketUrl: string;
  status: 'nadchodzące' | 'wyprzedane' | 'zakończone';
  slug: string;
  details: string;
}

const eventsDataRaw: Event[] = [
  {
    id: 1,
    title: 'Koncert Charytatywny: Gramy dla Dzieciaków',
    dateTime: '2025-11-15T19:00', // Format ISO 8601
    location: 'Klub Stodoła, Warszawa',
    imageSrc: '/events/event1.jpg',
    ticketUrl: 'https://www.biletomat.pl/',
    status: 'nadchodzące',
    slug: 'koncert-charytatywny-gramy-dla-dzieciakow-2025',
    details: `<p>Zapraszamy na wyjątkowy wieczór pełen muzyki i dobrych emocji!</p>`,
  },
  {
    id: 2,
    title: 'Akustyczny Wieczór z Gwiazdami',
    dateTime: '2025-12-05T20:00', // Format ISO 8601
    location: 'Filharmonia Narodowa, Warszawa',
    imageSrc: '/events/event2.jpg',
    ticketUrl: '#',
    status: 'wyprzedane',
    slug: 'akustyczny-wieczor-z-gwiazdami-2025',
    details: `<p>Niezapomniane aranżacje największych przebojów.</p>`,
  },
  {
    id: 3,
    title: 'Gala Fundacji Maxime 2024',
    dateTime: '2024-09-10T18:00', // Format ISO 8601
    location: 'Teatr Wielki - Opera Narodowa, Warszawa',
    imageSrc: '/events/event3.jpg',
    ticketUrl: '#',
    status: 'zakończone',
    slug: 'gala-fundacji-maxime-2024',
    details: `<p>Podsumowanie rocznej działalności naszej fundacji.</p>`,
  },
  {
    id: 4,
    title: 'Wielki Bieg Charytatywny',
    dateTime: '2025-10-14T10:00', // Format ISO 8601
    location: 'Park Skaryszewski, Warszawa',
    imageSrc: '/events/event3.jpg',
    ticketUrl: 'https://www.biletomat.pl/',
    status: 'nadchodzące',
    slug: 'wielki-bieg-charytatywny-2025',
    details: `<p>Dołącz do nas i pobiegnij dla dobrej sprawy!</p>`,
  },
  {
    id: 5,
    title: 'Aukcja Sztuki Nowoczesnej',
    dateTime: '2025-03-01T17:00', // Format ISO 8601
    location: 'Muzeum Narodowe, Warszawa',
    imageSrc: '/events/event2.jpg',
    ticketUrl: '#',
    status: 'zakończone',
    slug: 'aukcja-sztuki-nowoczesnej-2025',
    details: `<p>Dziękujemy wszystkim za udział w licytacjach.</p>`,
  }
];

/**
 * Konwertuje ciąg znaków ISO 8601 na obiekt Date.
 * @param dateTimeString - Data i czas w formacie ISO 8601, np. '2025-11-15T19:00'.
 * @returns Pełny obiekt Date z datą i godziną.
 */
const getEventDateTime = (dateTimeString: string): Date => {
  return new Date(dateTimeString);
};

/**
 * Formatuje datę i czas wydarzenia do czytelnego polskiego formatu.
 * @param dateTimeString - Data i czas w formacie ISO 8601.
 * @returns Sformatowany ciąg znaków, np. "15 listopada 2025, 19:00".
 */
export const formatEventDateTimeToPolish = (dateTimeString: string): string => {
  const date = getEventDateTime(dateTimeString);
  if (isNaN(date.getTime())) {
    return "Nieznana data";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 24-godzinny format
  };
  return new Intl.DateTimeFormat('pl-PL', options).format(date);
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
    const eventDateTime = getEventDateTime(event.dateTime); // Używamy nowej funkcji i właściwości
    if (eventDateTime > now) {
      upcomingEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });

  // 2. Sortowanie nadchodzących wydarzeń (od najbliższego do najdalszego)
  upcomingEvents.sort((a, b) => getEventDateTime(a.dateTime).getTime() - getEventDateTime(b.dateTime).getTime());

  // 3. Sortowanie archiwalnych wydarzeń (od najświeższego do najstarszego)
  pastEvents.sort((a, b) => getEventDateTime(b.dateTime).getTime() - getEventDateTime(a.dateTime).getTime());

  return { upcomingEvents, pastEvents };
};

// Eksportujemy przetworzone i posortowane dane
export const { upcomingEvents, pastEvents } = processEventsData();