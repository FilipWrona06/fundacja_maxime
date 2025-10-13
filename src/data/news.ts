//src/data/news.ts
export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  imageSrc: string;
  slug: string;
  content: string;
}

const newsDataRaw: NewsArticle[] = [
  {
    id: 1,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    date: '12 lipca 2025',
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji',
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 2,
    title: 'Podsumowanie akcji charytatywnej "Zima 2025"',
    date: '28 luty 2025',
    excerpt: 'Dzięki Waszej hojności udało nam się zebrać rekordową kwotę, która pozwoli na pomoc ponad 200 rodzinom w trudnej sytuacji. Zobaczcie szczegóły!',
    imageSrc: '/news/news2.jpg',
    slug: 'podsumowanie-akcji-charytatywnej-zima-2025',
    content: `<p>Akcja "Zima 2025" przerosła nasze najśmielsze oczekiwania...</p>`,
  },
  {
    id: 3,
    title: 'Zapraszamy na warsztaty kreatywne dla dzieci',
    date: '15 grudnia 2025',
    excerpt: 'Już w najbliższą sobotę odbędą się darmowe warsztaty plastyczne dla dzieci w wieku 6-12 lat. Liczba miejsc ograniczona, zapisz się już dziś.',
    imageSrc: '/news/news3.jpg',
    slug: 'zapraszamy-na-warsztaty-kreatywne-dla-dzieci',
    content: `<p>Kreatywność to supermoc! W najbliższą sobotę zapraszamy wszystkie dzieci...</p>`,
  },
  {
    id: 4,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    date: '12 sierpnia 2025',
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji',
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 5,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    date: '30 września 2025',
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji',
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 6,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    date: '5 stycznia 2025',
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji',
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 7,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    date: '25 luty 2025',
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji',
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 8,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    date: '15 września 2025',
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji',
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 9,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    date: '12 maj 2025',
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji',
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 10,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    // Poprawiona literówka w nazwie miesiąca dla pewności działania
    date: '11 października 2025',
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji',
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
];

/**
 * Konwertuje datę w polskim formacie tekstowym na obiekt Date.
 * @param dateString - Data w formacie "DD miesiąc YYYY", np. "12 lipca 2025".
 * @returns Obiekt Date.
 */
const parsePolishDate = (dateString: string): Date => {
  const polishMonths: { [key: string]: number } = {
    'stycznia': 0, 'luty': 1, 'marca': 2, 'kwietnia': 3, 'maj': 4, 'czerwca': 5,
    'lipca': 6, 'sierpnia': 7, 'września': 8, 'października': 9, 'paźdniernika': 9, // Obsługa literówki
    'listopada': 10, 'grudnia': 11
  };
  const parts = dateString.split(' ');
  const day = parseInt(parts[0], 10);
  const monthName = parts[1].toLowerCase();
  const year = parseInt(parts[2], 10);
  const month = polishMonths[monthName];

  return new Date(year, month, day);
};

// Sortowanie tablicy od najnowszych do najstarszych wiadomości
const sortedNewsData = newsDataRaw.sort((a, b) => {
  const dateA = parsePolishDate(a.date);
  const dateB = parsePolishDate(b.date);
  // Odejmujemy datę A od daty B, aby uzyskać sortowanie malejące
  return dateB.getTime() - dateA.getTime();
});

export const newsData: NewsArticle[] = sortedNewsData;