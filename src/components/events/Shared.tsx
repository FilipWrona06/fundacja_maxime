import type { PortableTextBlock } from "next-sanity";

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
  image: string; // URL obrazka z Sanity
  type: string;
  isSoldOut: boolean;
  slug: string;

  // Dane szczegółowe (mogą być puste w widoku listy)
  description?: PortableTextBlock[]; // Zmiana na Portable Text!
  program?: { composer: string; title: string }[];
  ticketUrl?: string;

  // Artist
  artistName?: string;
  artistDescription?: string;
  artistImage?: string;

  // SEO
  seoTitle?: string;
  seoDescription?: string;
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
