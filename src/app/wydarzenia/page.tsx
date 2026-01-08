"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

// --- DANE WYDARZEŃ (JEDNO ŹRÓDŁO PRAWDY) ---
export const eventsData = [
  {
    id: "1",
    title: "Symfonia Jesienna: Inauguracja",
    subtitle: "Wieczór pełen emocji z dziełami mistrzów romantyzmu.",
    // DATA: 10.01.2026 (Przyszłość względem 8.01) -> STATUS: AKTYWNE
    date: "10.01.2026",
    time: "19:00",
    doorsOpen: "18:30",
    location: "Filharmonia Śląska",
    address: "ul. Sokolska 2, Katowice",
    price: "od 45 PLN",
    image: "/images/hero-poster.jpg",
    type: "Koncert",
    isSoldOut: false,
    description:
      "Zapraszamy na uroczystą inaugurację sezonu artystycznego. Będzie to wieczór, w którym tradycja spotka się z młodzieńczą energią. Usłyszymy monumentalne dzieła, które wymagają od orkiestry nie tylko technicznej perfekcji, ale przede wszystkim głębokiej wrażliwości.",
    program: [
      { composer: "Ludwig van Beethoven", title: "Uwertura 'Egmont' op. 84" },
      {
        composer: "Fryderyk Chopin",
        title: "Koncert fortepianowy e-moll op. 11",
      },
      { composer: "--- Przerwa (20 min) ---", title: "" },
      { composer: "Johannes Brahms", title: "IV Symfonia e-moll op. 98" },
    ],
  },
  {
    id: "2",
    title: "Warsztaty Smyczkowe",
    subtitle: "Mistrzowskie warsztaty dla studentów.",
    // DATA: 05.01.2026 (Przeszłość) -> STATUS: ZAKOŃCZONE
    date: "05.01.2026",
    time: "10:00",
    doorsOpen: "09:30",
    location: "Akademia Muzyczna",
    address: "ul. Zacisze 3, Katowice",
    price: "Wstęp wolny",
    image: "/images/about.jpg",
    type: "Edukacja",
    isSoldOut: false,
    description:
      "Otwarte warsztaty prowadzone przez naszych solistów. Skupimy się na technice smyczkowej i pracy w sekcji.",
    program: [
      { composer: "Część 1", title: "Technika indywidualna" },
      { composer: "Część 2", title: "Praca w sekcji orkiestrowej" },
    ],
  },
  {
    id: "3",
    title: "Koncert Noworoczny",
    subtitle: "Tradycyjne powitanie roku z muzyką wiedeńską.",
    // DATA: 01.01.2026 (Przeszłość) -> STATUS: ZAKOŃCZONE
    date: "01.01.2026",
    time: "18:00",
    doorsOpen: "17:30",
    location: "Sala NOSPR",
    address: "plac Wojciecha Kilara 1, Katowice",
    price: "od 60 PLN",
    image: "/images/timeline/2024.jpg",
    type: "Gala",
    isSoldOut: true,
    description:
      "Radosne dźwięki walców i polek w wykonaniu pełnego składu orkiestry.",
    program: [
      { composer: "Johann Strauss", title: "Nad pięknym modrym Dunajem" },
      { composer: "Johann Strauss", title: "Marsz Radetzky'ego" },
    ],
  },
  {
    id: "4",
    title: "Próba Otwarta",
    subtitle: "Zobacz jak pracujemy od kuchni.",
    // DATA: 20.01.2026 (Przyszłość) -> STATUS: AKTYWNE
    date: "20.01.2026",
    time: "17:00",
    doorsOpen: "16:45",
    location: "Siedziba Fundacji",
    address: "ul. Muzyczna 14, Katowice",
    price: "Wstęp wolny",
    image: "/images/timeline/2023.jpg",
    type: "Spotkanie",
    isSoldOut: false,
    description: "Unikalna okazja, by zobaczyć proces twórczy orkiestry.",
    program: [],
  },
];

// --- POMOCNICY DATY ---
const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

// Funkcja parsująca string "DD.MM.YYYY" na obiekt Date
const parseDateString = (dateStr: string) => {
  const [day, month, year] = dateStr.split(".").map(Number);
  return new Date(year, month - 1, day);
};

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

export default function EventsPage() {
  // Ustawiamy widok kalendarza na Styczeń 2026 (gdzie są nasze dane)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  // Domyślnie zaznaczony 10.01.2026 (żeby coś było widać na start)
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(2026, 0, 10),
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const calendarGrid = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push({ type: "empty", id: `empty-${year}-${month}-${i}` });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ type: "day", date: date, id: date.toISOString() });
    }
    return days;
  }, [year, month, firstDay, daysInMonth]);

  // Filtrowanie wydarzeń dla wybranego dnia
  const eventsForSelectedDay = selectedDate
    ? eventsData.filter((e) => {
        const eDate = parseDateString(e.date);
        return eDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDate(null);
  };

  return (
    <main className="min-h-screen bg-raisinBlack pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-125 h-125 bg-oxfordBlue/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="container mx-auto px-4 relative z-10 max-w-400">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
              Sezon {year}
            </span>
            <h1 className="font-youngest text-6xl md:text-8xl text-white leading-[0.8]">
              Kalendarium
            </h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* LEWA: KALENDARZ */}
          <div className="lg:w-3/4 w-full">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-montserrat font-bold text-white uppercase">
                {MONTH_NAMES[month]}{" "}
                <span className="text-white/30">{year}</span>
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  className="p-3 bg-[#222] border border-white/5 hover:border-arylideYellow rounded-sm text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  className="p-3 bg-[#222] border border-white/5 hover:border-arylideYellow rounded-sm text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAYS_OF_WEEK.map((day) => (
                <div
                  key={day}
                  className="text-right pr-2 text-xs font-bold text-philippineSilver/50 uppercase tracking-wider py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
              {calendarGrid.map((cell) => {
                if (cell.type === "empty")
                  return (
                    <div key={cell.id} className="bg-raisinBlack min-h-35" />
                  );

                const date = cell.date as Date;
                const isSelected =
                  selectedDate?.toDateString() === date.toDateString();
                const isToday =
                  new Date().toDateString() === date.toDateString();

                // Sprawdzamy, czy w danym dniu jest jakieś wydarzenie
                const dayEvent = eventsData.find(
                  (e) =>
                    parseDateString(e.date).toDateString() ===
                    date.toDateString(),
                );
                const hasEvent = !!dayEvent;

                return (
                  <button
                    type="button"
                    key={cell.id}
                    onClick={() => setSelectedDate(date)}
                    className={clsx(
                      "relative min-h-35 p-3 flex flex-col justify-between transition-all duration-200 group text-right cursor-pointer",
                      hasEvent
                        ? "bg-[#252525] hover:bg-[#333]"
                        : "bg-raisinBlack hover:bg-white/3",
                      isSelected &&
                        "bg-[#2a2a2a] ring-1 ring-inset ring-arylideYellow z-10 shadow-2xl",
                    )}
                  >
                    <span
                      className={clsx(
                        "text-lg font-montserrat font-medium mb-2 w-8 h-8 flex items-center justify-center rounded-full ml-auto",
                        isSelected
                          ? "bg-arylideYellow text-raisinBlack font-bold"
                          : isToday
                            ? "text-arylideYellow border border-arylideYellow"
                            : "text-white/30 group-hover:text-white",
                      )}
                    >
                      {date.getDate()}
                    </span>
                    {hasEvent && (
                      <div className="w-full mt-auto">
                        <div
                          className={clsx(
                            "py-1.5 px-3 rounded-sm text-[10px] font-bold uppercase tracking-widest text-left truncate border-l-2",
                            isSelected
                              ? "bg-white text-raisinBlack border-arylideYellow"
                              : "bg-oxfordBlue text-arylideYellow border-arylideYellow/50",
                          )}
                        >
                          {dayEvent.type}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PRAWA: SIDEBAR */}
          <div className="lg:w-1/4 w-full flex flex-col border-l border-white/5 lg:pl-8 min-h-150">
            <div className="mb-8 pt-4">
              <span className="text-white/30 text-xs font-mono uppercase tracking-widest block mb-2">
                Wybrany dzień
              </span>
              <h3 className="text-3xl text-white font-youngest">
                {selectedDate
                  ? selectedDate.toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "long",
                    })
                  : "Wybierz datę"}
              </h3>
            </div>

            <div className="flex flex-col gap-6">
              <AnimatePresence mode="wait">
                {eventsForSelectedDay.length > 0 ? (
                  eventsForSelectedDay.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="group bg-[#222] border border-white/5 rounded-sm overflow-hidden hover:border-arylideYellow/30 transition-colors"
                    >
                      <div className="relative h-40 w-full overflow-hidden">
                        <Link
                          href={`/wydarzenia/${event.id}`}
                          className="block w-full h-full"
                        >
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-oxfordBlue/30 mix-blend-multiply" />
                        </Link>
                      </div>
                      <div className="p-5">
                        <Link
                          href={`/wydarzenia/${event.id}`}
                          className="group-hover:text-arylideYellow transition-colors"
                        >
                          <h4 className="text-lg font-bold text-white leading-tight mb-3">
                            {event.title}
                          </h4>
                        </Link>
                        <div className="flex flex-col gap-2 text-xs text-philippineSilver mb-4 font-medium border-l-2 border-white/10 pl-3">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-arylideYellow" />{" "}
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-arylideYellow" />{" "}
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <Ticket size={14} className="text-arylideYellow" />{" "}
                            {event.price}
                          </div>
                        </div>
                        <Link
                          href={`/wydarzenia/${event.id}`}
                          className="block w-full text-center py-2 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-arylideYellow hover:text-raisinBlack transition-all rounded-sm"
                        >
                          Szczegóły
                        </Link>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 opacity-40 border border-dashed border-white/10 rounded-sm"
                  >
                    <p className="text-philippineSilver text-sm mb-2">
                      Brak wydarzeń
                    </p>
                    <span className="text-xs text-arylideYellow/70">
                      Wybierz inny dzień
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
