//src/data/news.ts

export interface NewsArticle {
  id: number;
  title: string;
  // Zmieniamy format daty na ISO 8601 (np. 'RRRR-MM-DD') dla łatwiejszego parsowania maszynowego
  date: string;
  excerpt: string;
  imageSrc: string;
  // Slug musi być unikalny dla każdego artykułu, aby URL były poprawne
  slug: string;
  content: string;
}

const newsDataRaw: NewsArticle[] = [
  {
    id: 1,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    date: '2025-07-12', // Data w formacie ISO 8601
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji-1', // Unikalny slug
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 2,
    title: 'Podsumowanie akcji charytatywnej "Zima 2025"',
    date: '2025-02-28', // Data w formacie ISO 8601
    excerpt: 'Dzięki Waszej hojności udało nam się zebrać rekordową kwotę, która pozwoli na pomoc ponad 200 rodzinom w trudnej sytuacji. Zobaczcie szczegóły!',
    imageSrc: '/news/news2.jpg',
    slug: 'podsumowanie-akcji-charytatywnej-zima-2025',
    content: `<p>Akcja "Zima 2025" przerosła nasze najśmielsze oczekiwania...</p>`,
  },
  {
    id: 3,
    title: 'Zapraszamy na warsztaty kreatywne dla dzieci',
    date: '2025-12-15', // Data w formacie ISO 8601
    excerpt: 'Już w najbliższą sobotę odbędą się darmowe warsztaty plastyczne dla dzieci w wieku 6-12 lat. Liczba miejsc ograniczona, zapisz się już dziś.',
    imageSrc: '/news/news3.jpg',
    slug: 'zapraszamy-na-warsztaty-kreatywne-dla-dzieci',
    content: `<p>Kreatywność to supermoc! W najbliższą sobotę zapraszamy wszystkie dzieci...</p>`,
  },
  {
    id: 4,
    title: 'Wielkie otwarcie nowego oddziału Fundacji (druga edycja)',
    date: '2025-08-12', // Data w formacie ISO 8601
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji-4', // Unikalny slug
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 5,
    title: 'Wielkie otwarcie nowego oddziału Fundacji (trzecia edycja)',
    date: '2025-09-30', // Data w formacie ISO 8601
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji-5', // Unikalny slug
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 6,
    title: 'Wielkie otwarcie nowego oddziału Fundacji (styczeń)',
    date: '2025-01-05', // Data w formacie ISO 8601
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji-6', // Unikalny slug
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 7,
    title: 'Wielkie otwarcie nowego oddziału Fundacji (luty)',
    date: '2025-02-25', // Data w formacie ISO 8601
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji-7', // Unikalny slug
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 8,
    title: 'Wielkie otwarcie nowego oddziału Fundacji (wrzesień)',
    date: '2025-09-15', // Data w formacie ISO 8601
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji-8', // Unikalny slug
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 9,
    title: 'Wielkie otwarcie nowego oddziału Fundacji (maj)',
    date: '2025-05-12', // Data w formacie ISO 8601
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji-9', // Unikalny slug
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 10,
    title: 'Wielkie otwarcie nowego oddziału Fundacji (październik)',
    date: '2025-10-11', // Data w formacie ISO 8601
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji-10', // Unikalny slug
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
];

/**
 * Konwertuje datę w formacie ISO 8601 na polski format tekstowy.
 * Używaj tej funkcji tylko do WYŚWIETLANIA daty, nie do sortowania.
 * @param isoDateString - Data w formacie "RRRR-MM-DD", np. "2025-07-12".
 * @returns Data w formacie "DD miesiąc YYYY", np. "12 lipca 2025".
 */
export const formatToPolishDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) {
    // Obsługa błędnych dat, jeśli takie się pojawią
    return isoDateString;
  }
  // Użyj Intl.DateTimeFormat dla solidnego i lokalizowanego formatowania
  return new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};

// Sortowanie tablicy od najnowszych do najstarszych wiadomości
// Teraz operujemy na datach w formacie ISO, co upraszcza parsowanie.
const sortedNewsData = newsDataRaw.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  // Odejmujemy datę A od daty B, aby uzyskać sortowanie malejące (najnowsze na początku)
  return dateB.getTime() - dateA.getTime();
});

export const newsData: NewsArticle[] = sortedNewsData;

// Przykład użycia funkcji formatToPolishDate:
// console.log(formatToPolishDate(newsData[0].date)); // Wyświetli datę w polskim formacie