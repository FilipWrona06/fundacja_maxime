"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarGrid } from "./CalendarGrid";
import { EventsSidebar } from "./EventsSidebar";
import { type EventItem, isSameDay, parseLocalDate } from "./Shared";

interface EventsViewProps {
  events: EventItem[];
}

export const EventsView = ({ events }: EventsViewProps) => {
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
    return events.filter((e) => {
      const eDate = parseLocalDate(e.date);
      return isSameDay(eDate, selectedDate);
    });
  }, [selectedDate, events]);

  const eventsMap = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const e of events) {
      const dateKey = parseLocalDate(e.date).toDateString();
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)?.push(e.type);
    }
    return map;
  }, [events]);

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
    <div className="container mx-auto px-4 relative z-10 max-w-400">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 animate-fade-in-up">
        <div>
          <span className="text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" /> Sezon {viewDate.getFullYear()}
          </span>
          <h1 className="font-youngest text-6xl md:text-8xl lg:text-9xl text-white leading-[0.8] drop-shadow-2xl">
            Kalendarium
          </h1>
        </div>
      </header>

      <div className="flex flex-col xl:flex-row gap-12 xl:gap-20 items-start">
        <CalendarGrid
          gridCells={calendarGrid}
          viewDate={viewDate}
          selectedDate={selectedDate}
          now={now}
          eventsMap={eventsMap}
          onMonthChange={handleMonthChange}
          onDateSelect={handleDateSelect}
          onResetToToday={handleResetToToday}
          direction={direction}
        />
        <EventsSidebar
          selectedDate={selectedDate}
          events={eventsForSelectedDay}
        />
      </div>
    </div>
  );
};
