"use client";

import { AnimatePresence, motion } from "framer-motion";
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

// Lokalny helper isSameDay, jeśli nie chcemy importować go z shared w komponencie
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
  onResetToToday,
  direction,
}: CalendarGridProps) => {
  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -30 : 30 }),
  };

  return (
    <div className="xl:w-3/4 w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-4">
          <h2 className="text-4xl font-montserrat font-bold text-white uppercase flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={viewDate.getMonth()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
            onClick={onResetToToday}
            className="p-4 bg-white/5 border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all group"
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
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => onMonthChange(1)}
            className="p-4 bg-[#1a1a1a] border border-white/10 hover:border-arylideYellow hover:text-arylideYellow rounded-lg text-white transition-all"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

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
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
};
