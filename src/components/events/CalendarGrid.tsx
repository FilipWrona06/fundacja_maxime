// --- START OF FILE CalendarGrid.tsx ---

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { DayCell } from "./DayCell";
import { DAYS_OF_WEEK, MONTH_NAMES } from "./Shared";

export interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
}

interface CalendarGridProps {
  gridCells: CalendarCell[];
  viewDate: Date;
  selectedDate: Date;
  eventsMap: Map<string, string[]>;
}

export const CalendarGrid = ({
  gridCells,
  viewDate,
  selectedDate,
  eventsMap,
}: CalendarGridProps) => {
  // Obliczanie dat dla nawigacji
  const prevMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() - 1,
    1,
  );
  const nextMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    1,
  );

  // Formatowanie do URL parameters
  const toUrlParam = (d: Date) => d.toLocaleDateString("en-CA").slice(0, 7); // YYYY-MM

  const prevHref = `?view=${toUrlParam(prevMonth)}&date=${selectedDate.toLocaleDateString("en-CA")}`;
  const nextHref = `?view=${toUrlParam(nextMonth)}&date=${selectedDate.toLocaleDateString("en-CA")}`;
  const todayHref = "/wydarzenia"; // Reset URL do domyślnego stanu

  const now = new Date(); // Czas serwera - wystarczający dla większości przypadków

  return (
    <div className="xl:w-3/4 w-full">
      {/* --- NAWIGACJA --- */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-4">
          <h2 className="text-4xl font-montserrat font-bold text-white uppercase flex items-center gap-2">
            <span
              key={viewDate.getMonth()}
              className="block min-w-40 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              {MONTH_NAMES[viewDate.getMonth()]}
            </span>
          </h2>
          <span className="text-3xl text-white/10 font-light hidden sm:inline-block">
            {viewDate.getFullYear()}
          </span>
        </div>

        <div className="flex gap-3">
          <Link
            href={todayHref}
            scroll={false}
            className="p-4 bg-white/5 border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all group inline-flex items-center justify-center"
            aria-label="Wróć do dzisiaj"
          >
            <RotateCcw
              size={20}
              className="group-hover:-rotate-90 transition-transform duration-500"
            />
          </Link>
          <Link
            href={prevHref}
            scroll={false}
            className="p-4 bg-[#1a1a1a] border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all inline-flex items-center justify-center"
            aria-label="Poprzedni miesiąc"
          >
            <ChevronLeft size={22} />
          </Link>
          <Link
            href={nextHref}
            scroll={false}
            className="p-4 bg-[#1a1a1a] border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all inline-flex items-center justify-center"
            aria-label="Następny miesiąc"
          >
            <ChevronRight size={22} />
          </Link>
        </div>
      </div>

      {/* --- NAGŁÓWKI DNI --- */}
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

      {/* --- SIATKA (GRID) --- */}
      {/* ZMIANA: Usunięto 'overflow-hidden' i dodano 'p-2' (padding),
          aby powiększone kafelki (scale-105) i ich cienie nie były ucinane. */}
      <div className="relative w-full p-2">
        <ul
          key={viewDate.toISOString()}
          className="grid grid-cols-7 gap-1 m-0 p-0 list-none animate-in fade-in zoom-in-95 duration-300 ease-out"
        >
          {gridCells.map((cell) => {
            const dateKey = cell.date.toDateString();
            const isToday =
              cell.date.getDate() === now.getDate() &&
              cell.date.getMonth() === now.getMonth() &&
              cell.date.getFullYear() === now.getFullYear();

            const isSelected =
              cell.date.getDate() === selectedDate.getDate() &&
              cell.date.getMonth() === selectedDate.getMonth() &&
              cell.date.getFullYear() === selectedDate.getFullYear() &&
              cell.isCurrentMonth;

            const eventTypes = eventsMap.get(dateKey);

            return (
              <DayCell
                key={dateKey}
                date={cell.date}
                viewDate={viewDate}
                isCurrentMonth={cell.isCurrentMonth}
                isSelected={!!isSelected}
                isToday={isToday}
                hasEvent={!!eventTypes}
                eventTypes={eventTypes}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
