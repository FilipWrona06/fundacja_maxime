//src/data/about.ts

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

// Dodano 'readonly'
export const timelineData: readonly TimelineItem[] = [
  {
    year: '2022',
    title: 'Narodziny orkiestry',
    description: 'Fundacja Maxime rozpoczęła swoją działalność z pasją do muzyki klasycznej. Pierwsze próby, pierwsze koncerty i pierwsi widzowie - to był rok pełen entuzjazmu i determinacji. Zbudowaliśmy zespół oddanych muzyków, którzy podzielają naszą wizję.',
    imageUrl: '/about/2022.jpg',
    imageAlt: 'Pierwszy koncert Fundacji Maxime w 2022 roku',
  },
  {
    year: '2023',
    title: 'Rozwijamy skrzydła',
    description: 'Rok intensywnego rozwoju artystycznego i społecznego. Zorganizowaliśmy szereg koncertów w całej Polsce, nawiązaliśmy współpracę z lokalnymi społecznościami i rozpoczęliśmy warsztaty muzyczne dla młodzieży. Nasza orkiestra stała się rozpoznawalna.',
    imageUrl: '/about/2023.jpg',
    imageAlt: 'Koncerty i warsztaty Fundacji Maxime w 2023 roku',
  },
  {
    year: '2024',
    title: 'Rok przełomowy',
    description: 'Osiągnęliśmy nowe szczyty artystyczne. Nasze koncerty gościły w prestiżowych salach koncertowych, rozpoczęliśmy międzynarodową współpracę z innymi orkiestrami i zrealizowaliśmy największy dotąd projekt edukacyjny. Fundacja Maxime stała się ważnym głosem w świecie muzyki klasycznej.',
    imageUrl: '/about/2024.jpg',
    imageAlt: 'Koncerty Fundacji Maxime w prestiżowych salach w 2024 roku',
  },
  {
    year: '2025',
    title: 'Nowe horyzonty',
    description: 'Wchodzimy w kolejny rozdział naszej historii z ambicją i nowymi pomysłami. Planujemy serię niezapomnianych koncertów, rozbudowę programu edukacyjnego oraz dalsze działania integrujące społeczności wokół muzyki klasycznej. Nasze brzmienie będzie brzmiało dalej.',
    imageUrl: '/about/2025.jpg',
    imageAlt: 'Plany i wizja Fundacji Maxime na rok 2025',
  },
];

// Helper do dynamicznego pobierania bieżącego roku (opcjonalnie)
export const getCurrentYear = () => new Date().getFullYear();

// Funkcja do filtrowania tylko przeszłych wydarzeń (opcjonalnie)
export const getPastTimeline = () => {
  const currentYear = getCurrentYear();
  return timelineData.filter(item => parseInt(item.year) <= currentYear);
};