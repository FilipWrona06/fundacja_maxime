"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
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
  now: Date | null;
  eventsMap: Map<string, string[]>;
  onMonthChange: (offset: number) => void;
  onDateSelect: (date: Date) => void;
  onResetToToday: () => void;
  direction: number;
}

// Helper lokalny (bez zmian)
const isSameDayLocal = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const CalendarGrid = ({
  gridCells,
  viewDate,
  selectedDate,
  now,
  eventsMap,
  onMonthChange,
  onDateSelect,
  onResetToToday, // direction używamy teraz jako klucz do wymuszenia re-renderowania animacji CSS
}: CalendarGridProps) => {
  return (
    <div className="xl:w-3/4 w-full">
      {/* --- NAWIGACJA --- */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-4">
          <h2 className="text-4xl font-montserrat font-bold text-white uppercase flex items-center gap-2">
            {/* Prosta animacja wejścia (fade-in) przy zmianie miesiąca */}
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
          <button
            type="button"
            onClick={onResetToToday}
            className="p-4 bg-white/5 border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all group"
            aria-label="Wróć do dzisiaj"
          >
            <RotateCcw
              size={20}
              className="group-hover:-rotate-90 transition-transform duration-500"
            />
          </button>
          <button
            type="button"
            onClick={() => onMonthChange(-1)}
            className="p-4 bg-[#1a1a1a] border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all"
            aria-label="Poprzedni miesiąc"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => onMonthChange(1)}
            className="p-4 bg-[#1a1a1a] border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all"
            aria-label="Następny miesiąc"
          >
            <ChevronRight size={22} />
          </button>
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
      <div className="relative w-full overflow-hidden">
        <ul
          // Klucz sprawia, że React przerysowuje listę przy zmianie daty,
          // co uruchamia animację 'animate-in' zdefiniowaną w Tailwind.
          key={viewDate.toISOString()}
          className="grid grid-cols-7 gap-1 m-0 p-0 list-none animate-in fade-in zoom-in-95 duration-300 ease-out"
        >
          {gridCells.map((cell) => {
            const dateKey = cell.date.toDateString();
            const isToday = now && isSameDayLocal(cell.date, now);
            const isSelected =
              isSameDayLocal(cell.date, selectedDate) && cell.isCurrentMonth;
            const eventTypes = eventsMap.get(dateKey);

            return (
              <DayCell
                key={dateKey}
                date={cell.date}
                isCurrentMonth={cell.isCurrentMonth}
                isSelected={!!isSelected}
                isToday={!!isToday}
                hasEvent={!!eventTypes}
                eventTypes={eventTypes}
                onClick={onDateSelect}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
