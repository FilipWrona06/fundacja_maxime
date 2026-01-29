"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
  Clock,
  Info,
  MapPin,
  RotateCcw,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

// --- TYPY DANYCH ---

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

// --- HELPERY DATY ---

const getRelativeDate = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-CA"); // YYYY-MM-DD
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

// --- DANE ---

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
    date: getRelativeDate(0), // DZISIAJ
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
    date: getRelativeDate(1), // Jutro
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

// --- STAŁE ---

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

// --- KOMPONENT KOMÓRKI DNIA ---

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  hasEvent: boolean;
  eventTypes?: string[];
  onClick: (date: Date) => void;
}

const DayCell = memo(
  ({
    date,
    isCurrentMonth,
    isSelected,
    isToday,
    hasEvent,
    eventTypes,
    onClick,
  }: DayCellProps) => {
    const fullDateLabel = date.toLocaleDateString("pl-PL", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    return (
      <li className="relative w-full aspect-square">
        <button
          type="button"
          onClick={() => onClick(date)}
          disabled={!isCurrentMonth}
          aria-label={`${fullDateLabel} ${hasEvent ? "- są wydarzenia" : ""}`}
          aria-pressed={isSelected}
          className={clsx(
            // ZMIANA: Dodano hover:z-20, aby powiększony kafelek był nad innymi
            "w-full h-full p-1.5 sm:p-2 flex flex-col justify-between transition-all duration-300 group text-right outline-none relative overflow-hidden rounded-lg border",

            !isCurrentMonth
              ? "opacity-20 cursor-default pointer-events-none bg-white/5 border-transparent"
              : "border-white/5 bg-[#181818]",

            // Hover effects
            isCurrentMonth &&
              !isSelected &&
              "hover:border-white/20 hover:bg-[#222] hover:scale-[1.05] hover:z-20 hover:shadow-xl",

            // TŁO DLA DNIA Z WYDARZENIEM
            isCurrentMonth &&
              hasEvent &&
              !isSelected &&
              "bg-linear-to-br from-[#222] to-[#111] border-arylideYellow/20 hover:border-arylideYellow/50",

            // WYBRANY DZIEŃ
            isSelected &&
              "bg-raisinBlack ring-2 ring-inset ring-arylideYellow z-10 shadow-[0_0_20px_rgba(239,203,111,0.2)] scale-[1.05]",
          )}
        >
          {isToday && !isSelected && (
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-arylideYellow shadow-[0_0_10px_#EFCB6F]" />
          )}

          <span
            className={clsx(
              "text-sm md:text-base font-montserrat font-medium mb-1 w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full ml-auto transition-all relative z-10",
              isSelected
                ? "bg-arylideYellow text-raisinBlack font-bold shadow-lg"
                : isToday
                  ? "text-arylideYellow font-bold"
                  : "text-white/40 group-hover:text-white",
            )}
          >
            {date.getDate()}
          </span>

          {hasEvent && eventTypes && (
            <div className="w-full mt-auto space-y-1 relative z-10 hidden sm:block">
              {eventTypes.slice(0, 1).map((type, idx) => (
                <motion.div
                  key={`${date.toISOString()}-${idx}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx(
                    "py-0.5 px-1.5 rounded-md text-[8px] lg:text-[9px] font-bold uppercase tracking-wider text-left truncate border-l-2 backdrop-blur-sm shadow-sm",
                    isSelected
                      ? "bg-white text-raisinBlack border-arylideYellow"
                      : "bg-black/40 text-philippineSilver border-arylideYellow/40 group-hover:text-white group-hover:border-arylideYellow",
                  )}
                >
                  {type}
                </motion.div>
              ))}
              {eventTypes.length > 1 && (
                <span className="text-[8px] text-arylideYellow/60 block text-left pl-1 font-mono">
                  +{eventTypes.length - 1}
                </span>
              )}
            </div>
          )}

          {hasEvent && (
            <div className="sm:hidden absolute bottom-2 left-2 w-1.5 h-1.5 bg-arylideYellow rounded-full" />
          )}

          {isSelected && (
            <div className="absolute inset-0 bg-linear-to-t from-arylideYellow/5 to-transparent pointer-events-none" />
          )}
        </button>
      </li>
    );
  },
  (prev, next) =>
    prev.isSelected === next.isSelected &&
    prev.isCurrentMonth === next.isCurrentMonth &&
    prev.hasEvent === next.hasEvent &&
    prev.date.getTime() === next.date.getTime(),
);

DayCell.displayName = "DayCell";

// --- GŁÓWNY KOMPONENT ---

export default function EventsPage() {
  const [now, setNow] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const today = new Date();
    setNow(today);
    setViewDate(today);
    setSelectedDate(today);
  }, []);

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

  const eventsForSelectedDay = useMemo(() => {
    if (!selectedDate) return [];
    return eventsData.filter((e) => {
      const eDate = parseLocalDate(e.date);
      return isSameDay(eDate, selectedDate);
    });
  }, [selectedDate]);

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

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -30 : 30 }),
  };

  if (!now) return <div className="min-h-screen bg-raisinBlack" />;

  return (
    <main
      className="min-h-screen bg-raisinBlack pt-52 lg:pt-80 pb-32 relative overflow-hidden"
      aria-label="Kalendarz wydarzeń"
    >
      {/* TŁO */}
      <div
        // Poprawiono: w-[600px] -> w-150, h-[600px] -> h-150
        className="absolute top-0 right-0 w-150 h-150 bg-arylideYellow/5 rounded-full blur-[130px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"
        aria-hidden="true"
      />
      <div
        // Poprawiono: w-[500px] -> w-125, h-[500px] -> h-125
        className="absolute bottom-0 left-0 w-125 h-125 bg-white/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4 z-0"
        aria-hidden="true"
      />

      {/* Poprawiono: max-w-[1600px] -> max-w-400 */}
      <div className="container mx-auto px-4 relative z-10 max-w-400">
        {/* NAGŁÓWEK */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 animate-fade-in-up">
          <div>
            {/* Poprawiono konflikt block/flex -> usunięto block */}
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
          {/* --- LEWA STRONA: KALENDARZ --- */}
          <div className="xl:w-3/4 w-full">
            {/* Nav */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-baseline gap-4">
                <h2 className="text-4xl font-montserrat font-bold text-white uppercase flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={viewDate.getMonth()}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      // Poprawiono: min-w-[160px] -> min-w-40
                      className="block min-w-40"
                    >
                      {MONTH_NAMES[viewDate.getMonth()]}
                    </motion.span>
                  </AnimatePresence>
                </h2>
                <span className="text-3xl text-white/10 font-light hidden sm:inline-block">
                  {viewDate.getFullYear()}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleResetToToday}
                  title="Wróć do dzisiaj"
                  className="p-4 bg-white/5 border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all group"
                >
                  <RotateCcw
                    size={20}
                    className="group-hover:-rotate-90 transition-transform duration-500"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => handleMonthChange(-1)}
                  className="p-4 bg-[#1a1a1a] border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMonthChange(1)}
                  className="p-4 bg-[#1a1a1a] border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>

            {/* Dni */}
            <div className="grid grid-cols-7 mb-4 px-2" aria-hidden="true">
              {DAYS_OF_WEEK.map((day) => (
                <div
                  key={day}
                  className="text-right pr-4 text-[11px] md:text-sm font-bold text-philippineSilver/30 uppercase tracking-widest"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* SIATKA KALENDARZA */}
            <div className="relative w-full">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.ul
                  key={viewDate.toISOString()}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  className="grid grid-cols-7 gap-1 m-0 p-0 list-none"
                >
                  {calendarGrid.map((cell) => {
                    const dateKey = cell.date.toDateString();
                    // ZMIANA: usunięto non-null assertion (!), użyto now && ...
                    const isToday = now && isSameDay(cell.date, now);
                    const isSelected =
                      isSameDay(cell.date, selectedDate) && cell.isCurrentMonth;
                    const eventTypes = eventsMap.get(dateKey);

                    return (
                      <DayCell
                        key={dateKey}
                        date={cell.date}
                        isCurrentMonth={cell.isCurrentMonth}
                        isSelected={isSelected}
                        isToday={!!isToday}
                        hasEvent={!!eventTypes}
                        eventTypes={eventTypes}
                        onClick={handleDateSelect}
                      />
                    );
                  })}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>

          {/* --- PRAWA STRONA --- */}
          {/* Poprawiono: min-h-[600px] -> min-h-150 */}
          <div className="xl:w-1/4 w-full flex flex-col min-h-150 relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/5 to-transparent hidden xl:block"
              aria-hidden="true"
            />

            <div className="xl:pl-12 sticky top-40">
              <div className="mb-12 pt-4">
                <span className="text-arylideYellow text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-arylideYellow animate-pulse" />
                  Wybrany dzień
                </span>
                <h3 className="text-5xl xl:text-6xl text-white font-youngest leading-none mb-3">
                  <time dateTime={selectedDate.toISOString()}>
                    {selectedDate.getDate()}
                  </time>
                  <span className="text-2xl ml-3 text-white/50 font-sans tracking-wide uppercase">
                    {MONTH_NAMES[selectedDate.getMonth()]}
                  </span>
                </h3>
                <p className="text-philippineSilver text-base capitalize font-light tracking-wide border-l-2 border-white/10 pl-4">
                  {selectedDate.toLocaleDateString("pl-PL", {
                    weekday: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <section
                className="flex flex-col gap-8"
                aria-label="Lista wydarzeń wybranego dnia"
              >
                <AnimatePresence mode="wait">
                  {eventsForSelectedDay.length > 0 ? (
                    eventsForSelectedDay.map((event) => (
                      <motion.article
                        key={event.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="group bg-[#161616] border border-white/5 rounded-xl overflow-hidden hover:border-arylideYellow/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]"
                      >
                        <div className="relative h-52 w-full overflow-hidden bg-gray-900">
                          <Link
                            href={`/wydarzenia/${event.slug}`}
                            className="block w-full h-full"
                            tabIndex={-1}
                          >
                            <Image
                              src={event.image}
                              alt={`Plakat: ${event.title}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                            />
                            {event.isSoldOut && (
                              <div className="absolute top-4 right-4 z-10">
                                <span className="bg-black/90 border border-white/20 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md rounded-sm">
                                  Wyprzedane
                                </span>
                              </div>
                            )}
                            <div className="absolute bottom-4 left-4 z-10">
                              <span className="bg-arylideYellow text-raisinBlack px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                                {event.type}
                              </span>
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-[#161616] via-transparent to-transparent opacity-90" />
                          </Link>
                        </div>

                        <div className="p-8 relative z-10 -mt-12">
                          <Link
                            href={`/wydarzenia/${event.slug}`}
                            className="group-hover:text-arylideYellow transition-colors focus-visible:outline-none"
                          >
                            <h4 className="text-2xl font-bold text-white leading-snug mb-5 font-montserrat">
                              {event.title}
                            </h4>
                          </Link>

                          <div className="flex flex-col gap-4 text-sm text-philippineSilver/80 mb-8 font-medium border-l border-white/10 pl-5">
                            <div className="flex items-center gap-3">
                              <Clock
                                size={16}
                                className="text-arylideYellow shrink-0"
                              />
                              <div className="flex gap-2">
                                <time
                                  dateTime={`${event.date}T${event.time}`}
                                  className="text-white"
                                >
                                  {event.time}
                                </time>
                                <span className="text-white/20">|</span>
                                <span>Drzwi: {event.doorsOpen}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {/* Poprawiono: max-w-[200px] -> max-w-50 */}
                              <MapPin
                                size={16}
                                className="text-arylideYellow shrink-0"
                              />
                              <span className="truncate max-w-50">
                                {event.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Ticket
                                size={16}
                                className="text-arylideYellow shrink-0"
                              />
                              <span className="text-white">{event.price}</span>
                            </div>
                          </div>

                          <Link
                            href={`/wydarzenia/${event.slug}`}
                            aria-label={`Szczegóły wydarzenia ${event.title}`}
                            className={clsx(
                              "flex items-center justify-center w-full py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-lg gap-2 border",
                              event.isSoldOut
                                ? "bg-white/5 border-white/5 text-white/30 cursor-not-allowed"
                                : "bg-white/5 border-white/10 text-white hover:bg-arylideYellow hover:text-raisinBlack hover:border-arylideYellow",
                            )}
                          >
                            {event.isSoldOut
                              ? "Brak biletów"
                              : "Szczegóły i bilety"}
                            {!event.isSoldOut && <ChevronRightIcon size={16} />}
                          </Link>
                        </div>
                      </motion.article>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center text-center py-24 px-8 border border-dashed border-white/10 rounded-xl bg-[#151515]"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8 text-white/20">
                        <Info className="w-10 h-10" />
                      </div>
                      <p className="text-white font-bold text-xl mb-3">
                        Wolny termin
                      </p>
                      {/* Poprawiono: max-w-[240px] -> max-w-60 */}
                      <p className="text-sm text-philippineSilver leading-relaxed max-w-60 mx-auto">
                        W tym dniu orkiestra odpoczywa lub odbywają się próby
                        zamknięte.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
