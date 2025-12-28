"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

// --- TYPY I DANE ---

type Event = {
  id: string;
  date: Date;
  title: string;
  location: string;
  time: string;
  price: string;
  image: string;
  description: string;
  type: string; // Dodano typ wydarzenia do wyświetlania na kalendarzu
};

const mockEvents: Event[] = [
  {
    id: "1",
    date: new Date(2025, 9, 12),
    title: "Symfonia Jesienna",
    location: "Filharmonia Śląska",
    time: "19:00",
    price: "45 PLN",
    image: "/images/hero-poster.jpg",
    description: "Inauguracja sezonu jesiennego z udziałem wybitnych solistów.",
    type: "Koncert",
  },
  {
    id: "2",
    date: new Date(2025, 9, 15),
    title: "Warsztaty Smyczkowe",
    location: "Akademia Muzyczna",
    time: "10:00",
    price: "Wstęp wolny",
    image: "/images/about.jpg",
    description: "Otwarte warsztaty mistrzowskie dla studentów.",
    type: "Edukacja",
  },
  {
    id: "3",
    date: new Date(2025, 9, 28),
    title: "Próba Otwarta",
    location: "Siedziba Fundacji",
    time: "17:00",
    price: "Wstęp wolny",
    image: "/images/timeline/2023.jpg",
    description:
      "Zobacz jak orkiestra przygotowuje się do koncertu finałowego.",
    type: "Spotkanie",
  },
  {
    id: "4",
    date: new Date(2025, 10, 5),
    title: "Młodzi Mistrzowie",
    location: "Sala NOSPR",
    time: "18:30",
    price: "60 PLN",
    image: "/images/timeline/2024.jpg",
    description: "Gala finałowa konkursu skrzypcowego im. Maxime.",
    type: "Gala",
  },
  {
    id: "5",
    date: new Date(2025, 11, 20),
    title: "Koncert Świąteczny",
    location: "Kościół św. Piotra",
    time: "20:00",
    price: "Cegiełka",
    image: "/images/timeline/2023.jpg",
    description:
      "Charytatywny koncert kolęd i pastorałek w aranżacjach symfonicznych.",
    type: "Koncert",
  },
];

// --- POMOCNICY ---

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

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

export default function EventsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(2025, 9, 12),
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const calendarGrid = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push({
        type: "empty",
        id: `empty-${year}-${month}-${i}`,
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        type: "day",
        date: date,
        id: date.toISOString(),
      });
    }
    return days;
  }, [year, month, firstDay, daysInMonth]);

  const eventsForSelectedDay = selectedDate
    ? mockEvents.filter(
        (e) => e.date.toDateString() === selectedDate.toDateString(),
      )
    : [];

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDate(null);
  };

  return (
    <main className="min-h-screen bg-raisinBlack pt-32 pb-20 relative overflow-hidden">
      {/* Tło dekoracyjne */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-oxfordBlue/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="container mx-auto px-4 relative z-10 max-w-400">
        {/* NAGŁÓWEK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
              Sezon 2025
            </span>
            <h1 className="font-motto text-6xl md:text-8xl text-white leading-[0.8]">
              Kalendarium
            </h1>
          </div>
        </div>

        {/* --- UKŁAD GŁÓWNY (3/4 + 1/4) --- */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* LEWA: KALENDARZ (75%) */}
          <div className="lg:w-3/4 w-full">
            {/* Nawigacja Kalendarza */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-montserrat font-bold text-white uppercase">
                {MONTH_NAMES[month]}{" "}
                <span className="text-white/30">{year}</span>
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  className="p-3 bg-[#222] border border-white/5 hover:border-arylideYellow hover:text-arylideYellow rounded-sm transition-colors text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  className="p-3 bg-[#222] border border-white/5 hover:border-arylideYellow hover:text-arylideYellow rounded-sm transition-colors text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Dni Tygodnia */}
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

            {/* Grid Dni */}
            <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
              {calendarGrid.map((cell) => {
                if (cell.type === "empty") {
                  return (
                    <div key={cell.id} className="bg-raisinBlack min-h-35" />
                  );
                }

                const date = cell.date as Date;
                const isSelected =
                  selectedDate?.toDateString() === date.toDateString();
                // Sprawdzamy czy jest wydarzenie w tym dniu
                const dayEvent = mockEvents.find(
                  (e) => e.date.toDateString() === date.toDateString(),
                );
                const hasEvent = !!dayEvent;
                const isToday =
                  new Date().toDateString() === date.toDateString();

                return (
                  <button
                    type="button"
                    key={cell.id}
                    onClick={() => setSelectedDate(date)}
                    className={clsx(
                      "relative min-h-35 p-3 flex flex-col justify-between transition-all duration-200 group text-right",
                      // ZMIANA: Tło dla dni z wydarzeniami jest jaśniejsze, żeby się odcinało
                      hasEvent
                        ? "bg-[#252525] hover:bg-[#333]"
                        : "bg-raisinBlack hover:bg-white/3",
                      // Zaznaczenie (nadpisuje tło)
                      isSelected &&
                        "bg-[#2a2a2a] ring-1 ring-inset ring-arylideYellow z-10 shadow-2xl",
                    )}
                  >
                    {/* Numer Dnia */}
                    <span
                      className={clsx(
                        "text-lg font-montserrat font-medium mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors ml-auto",
                        isSelected
                          ? "bg-arylideYellow text-raisinBlack font-bold shadow-lg"
                          : isToday
                            ? "text-arylideYellow border border-arylideYellow"
                            : hasEvent
                              ? "text-white" // Dni z eventami mają biały numer
                              : "text-white/30 group-hover:text-white", // Puste dni mają szary
                      )}
                    >
                      {date.getDate()}
                    </span>

                    {/* ZMIANA: Pasek zamiast kropki - bardzo widoczny */}
                    {hasEvent && (
                      <div className="w-full mt-auto">
                        <div
                          className={clsx(
                            "py-1.5 px-3 rounded-sm text-[10px] font-bold uppercase tracking-widest text-left truncate transition-all border-l-2",
                            isSelected
                              ? "bg-white text-raisinBlack border-arylideYellow shadow-sm"
                              : "bg-oxfordBlue text-arylideYellow border-arylideYellow/50 group-hover:border-arylideYellow group-hover:bg-white/10",
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

            {/* Legenda pod kalendarzem */}
            <div className="mt-6 flex gap-6 text-xs text-philippineSilver justify-end opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-oxfordBlue border-l-2 border-arylideYellow rounded-sm" />{" "}
                Wydarzenie
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-4 bg-[#2a2a2a] ring-1 ring-arylideYellow rounded-sm" />{" "}
                Wybrany dzień
              </div>
            </div>
          </div>

          {/* PRAWA: SIDEBAR (25%) - Lista wydarzeń */}
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
                      transition={{ duration: 0.3 }}
                      className="group bg-[#222] border border-white/5 rounded-sm overflow-hidden hover:border-arylideYellow/30 transition-colors"
                    >
                      {/* Obrazek na górze */}
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-oxfordBlue/30 mix-blend-multiply" />
                      </div>

                      {/* Treść na dole */}
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-bold text-white group-hover:text-arylideYellow transition-colors leading-tight">
                            {event.title}
                          </h4>
                        </div>

                        <div className="flex flex-col gap-2 text-xs text-philippineSilver mb-4 font-medium border-l-2 border-white/10 pl-3">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-arylideYellow" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-arylideYellow" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <Ticket size={14} className="text-arylideYellow" />
                            {event.price}
                          </div>
                        </div>

                        <p className="text-white/40 text-xs mb-4 leading-relaxed line-clamp-3">
                          {event.description}
                        </p>

                        <button
                          type="button"
                          className="w-full py-2 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-arylideYellow hover:text-raisinBlack hover:border-arylideYellow transition-all rounded-sm"
                        >
                          Szczegóły
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  // EMPTY STATE
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
