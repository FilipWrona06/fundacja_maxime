"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarGrid } from "@/components/events/CalendarGrid";
import { EventsSidebar } from "@/components/events/EventsSidebar";

// --- TYPY I DANE (W TYM PLIKU, NIE W OSOBNYM) ---

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
}

// Helpery
const getRelativeDate = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-CA");
};

const parseLocalDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// Stałe
const DAYS_OF_WEEK = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
const MONTH_NAMES = [
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

// Dane (eksportowane, by [slug] mógł ich użyć)
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
  },
];

// --- GŁÓWNY KOMPONENT ---

export default function EventsPage() {
  const [now, setNow] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [direction, setDirection] = useState(0);

  // Inicjalizacja klienta
  useEffect(() => {
    const today = new Date();
    setNow(today);
    setViewDate(today);
    setSelectedDate(today);
  }, []);

  // Obliczanie siatki kalendarza (Logic Lifted Up)
  const calendarGrid = useMemo(() => {
    const baseDate = viewDate || new Date();
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayOfWeek =
      firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

    const days = [];
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    return days;
  }, [viewDate]);

  // Filtrowanie wydarzeń
  const eventsForSelectedDay = useMemo(() => {
    if (!selectedDate) return [];
    return eventsData.filter((e) => {
      const eDate = parseLocalDate(e.date);
      return isSameDay(eDate, selectedDate);
    });
  }, [selectedDate]);

  // Mapa wydarzeń
  const eventsMap = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const e of eventsData) {
      const dateKey = parseLocalDate(e.date).toDateString();
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)?.push(e.type);
    }
    return map;
  }, []);

  // Handlery
  const handleMonthChange = useCallback((offset: number) => {
    setDirection(offset);
    setViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1),
    );
  }, []);

  const handleDateSelect = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      if (date.getMonth() !== viewDate.getMonth()) {
        const offset = date < viewDate ? -1 : 1;
        setDirection(offset);
        setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
      }
    },
    [viewDate],
  );

  const handleResetToToday = useCallback(() => {
    const today = new Date();
    setDirection(today > viewDate ? 1 : -1);
    setViewDate(today);
    setSelectedDate(today);
  }, [viewDate]);

  if (!now) return <div className="min-h-screen bg-raisinBlack" />;

  return (
    <main
      className="min-h-screen bg-raisinBlack pt-52 lg:pt-80 pb-32 relative overflow-hidden"
      aria-label="Kalendarz wydarzeń"
    >
      {/* TŁO */}
      <div
        className="absolute top-0 right-0 w-150 h-150 bg-arylideYellow/5 rounded-full blur-[130px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-125 h-125 bg-white/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4 z-0"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10 max-w-400">
        {/* NAGŁÓWEK */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 animate-fade-in-up">
          <div>
            <span className="text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" /> Sezon{" "}
              {viewDate.getFullYear()}
            </span>
            <h1 className="font-youngest text-6xl md:text-8xl lg:text-9xl text-white leading-[0.8] drop-shadow-2xl">
              Kalendarium
            </h1>
          </div>
        </header>

        <div className="flex flex-col xl:flex-row gap-12 xl:gap-20 items-start">
          {/* LEWA KOLUMNA: Kalendarz */}
          <CalendarGrid
            gridCells={calendarGrid}
            weekDays={DAYS_OF_WEEK}
            monthName={MONTH_NAMES[viewDate.getMonth()]}
            currentYear={viewDate.getFullYear()}
            selectedDate={selectedDate}
            now={now}
            eventsMap={eventsMap}
            onMonthChange={handleMonthChange}
            onDateSelect={handleDateSelect}
            onResetToToday={handleResetToToday}
            direction={direction}
            viewDateKey={viewDate.toISOString()}
          />

          {/* PRAWA KOLUMNA: Szczegóły */}
          <EventsSidebar
            selectedDate={selectedDate}
            monthName={MONTH_NAMES[selectedDate.getMonth()]}
            events={eventsForSelectedDay}
          />
        </div>
      </div>
    </main>
  );
}
