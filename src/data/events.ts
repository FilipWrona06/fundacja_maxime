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
    imageSrc: '/events/event1.jpg',
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
    imageSrc: '/events/event2.jpg',
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
    imageSrc: '/events/event3.jpg',
    ticketUrl: '#',
    status: 'zakończone',
    slug: 'gala-fundacji-maxime-2024',
    details: `<p>Podsumowanie rocznej działalności naszej fundacji. Wręczyliśmy nagrody naszym darczyńcom i wolontariuszom. Dziękujemy, że byliście z nami przez cały rok!</p>`,
  },
];