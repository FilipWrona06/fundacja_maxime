export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  imageSrc: string;
  slug: string;
  content: string;
}

export const newsData: NewsArticle[] = [
  {
    id: 1,
    title: 'Wielkie otwarcie nowego oddziału Fundacji',
    date: '12 września 2025',
    excerpt: 'Z radością informujemy, że otworzyliśmy nowy oddział w Krakowie. Dziękujemy wszystkim za wsparcie i zaangażowanie w rozwój naszej misji.',
    imageSrc: '/news/news1.jpg',
    slug: 'wielkie-otwarcie-nowego-oddzialu-fundacji',
    content: `<p>To był dla nas wyjątkowy dzień! Z dumą i radością otworzyliśmy nowy oddział naszej fundacji w sercu Krakowa...</p>`,
  },
  {
    id: 2,
    title: 'Podsumowanie akcji charytatywnej "Zima 2025"',
    date: '28 sierpnia 2025',
    excerpt: 'Dzięki Waszej hojności udało nam się zebrać rekordową kwotę, która pozwoli na pomoc ponad 200 rodzinom w trudnej sytuacji. Zobaczcie szczegóły!',
    imageSrc: '/news/news2.jpg',
    slug: 'podsumowanie-akcji-charytatywnej-zima-2025',
    content: `<p>Akcja "Zima 2025" przerosła nasze najśmielsze oczekiwania...</p>`,
  },
  {
    id: 3,
    title: 'Zapraszamy na warsztaty kreatywne dla dzieci',
    date: '15 sierpnia 2025',
    excerpt: 'Już w najbliższą sobotę odbędą się darmowe warsztaty plastyczne dla dzieci w wieku 6-12 lat. Liczba miejsc ograniczona, zapisz się już dziś.',
    imageSrc: '/news/news3.jpg',
    slug: 'zapraszamy-na-warsztaty-kreatywne-dla-dzieci',
    content: `<p>Kreatywność to supermoc! W najbliższą sobotę zapraszamy wszystkie dzieci...</p>`,
  },
];