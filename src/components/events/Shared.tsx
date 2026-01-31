// --- TYPY ---
export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string; // ISO YYYY-MM-DD
  time: string;
  doorsOpen: string;
  location: string;
  address: string;
  price: string;
  image: string;
  type: string;
  isSoldOut: boolean;
  slug: string;
  // Opcjonalne pola dla szczegółów
  description?: string;
  program?: { composer: string; title: string }[];
}

// --- HELPERY ---
export const DAYS_OF_WEEK = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
export const MONTH_NAMES = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

export const getRelativeDate = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-CA");
};

export const parseLocalDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const parseEventDateTime = (dateStr: string, timeStr: string): Date => {
  if (!dateStr || !timeStr) return new Date();
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

// --- DANE (MOCK) ---
export const eventsData: EventItem[] = [
  {
    id: "prev-2",
    title: "Warsztaty Mistrzowskie",
    subtitle: "Analiza dzieł barokowych.",
    date: getRelativeDate(-5),
    time: "10:00",
    doorsOpen: "09:30",
    location: "Akademia Muzyczna",
    address: "ul. Zacisze 3, Katowice",
    price: "Wstęp wolny",
    image: "/images/about.jpg",
    type: "Edukacja",
    isSoldOut: false,
    slug: "warsztaty-barokowe",
    description: "Zapraszamy na wyjątkowe warsztaty mistrzowskie...",
    program: [],
  },
  {
    id: "prev-1",
    title: "Recital Fortepianowy",
    subtitle: "Chopin i jego inspiracje.",
    date: getRelativeDate(-2),
    time: "18:00",
    doorsOpen: "17:30",
    location: "Sala Kameralna NOSPR",
    address: "plac Wojciecha Kilara 1",
    price: "30 PLN",
    image: "/images/hero-poster.jpg",
    type: "Recital",
    isSoldOut: true,
    slug: "recital-fortepianowy",
    description: "Wieczór z muzyką Fryderyka Chopina...",
    program: [],
  },
  {
    id: "today-1",
    title: "Wielka Gala Jubileuszowa",
    subtitle: "Uroczysty koncert z okazji 10-lecia.",
    date: getRelativeDate(0),
    time: "19:00",
    doorsOpen: "18:00",
    location: "Filharmonia Śląska",
    address: "ul. Sokolska 2, Katowice",
    price: "od 80 PLN",
    image: "/images/hero-poster.jpg",
    type: "Gala",
    isSoldOut: false,
    slug: "gala-jubileuszowa",
    description: "To będzie niezapomniany wieczór pełen emocji...",
    program: [
      {
        composer: "Wolfgang Amadeus Mozart",
        title: "Uwertura do 'Wesela Figara'",
      },
      {
        composer: "Ludwig van Beethoven",
        title: "Koncert fortepianowy nr 5 'Cesarski'",
      },
    ],
  },
  {
    id: "next-1",
    title: "Próba Otwarta Orkiestry",
    subtitle: "Zobacz jak pracujemy nad nowym repertuarem.",
    date: getRelativeDate(1),
    time: "11:00",
    doorsOpen: "10:45",
    location: "Siedziba Fundacji",
    address: "ul. Muzyczna 14",
    price: "Bezpłatne",
    image: "/images/timeline/2024.jpg",
    type: "Spotkanie",
    isSoldOut: false,
    slug: "proba-otwarta",
    description: "Otwarta próba dla publiczności...",
    program: [],
  },
  {
    id: "next-2",
    title: "Symfonia Jesienna",
    subtitle: "Wieczór z muzyką Beethovena.",
    date: getRelativeDate(4),
    time: "19:00",
    doorsOpen: "18:30",
    location: "Dom Muzyki i Tańca",
    address: "Zabrze",
    price: "od 50 PLN",
    image: "/images/hero-poster.jpg",
    type: "Koncert",
    isSoldOut: false,
    slug: "symfonia-jesienna",
    description: "Jesienny koncert symfoniczny...",
    program: [],
  },
  {
    id: "next-3",
    title: "Jazz Night",
    subtitle: "Standardy jazzowe w nowych aranżacjach.",
    date: getRelativeDate(10),
    time: "20:00",
    doorsOpen: "19:00",
    location: "Klub Hipnoza",
    address: "Katowice",
    price: "40 PLN",
    image: "/images/about.jpg",
    type: "Koncert",
    isSoldOut: false,
    slug: "jazz-night",
    description: "Jazzowe aranżacje klasyków...",
    program: [],
  },
];
