import { Calendar as CalendarIcon } from "lucide-react";
import { CalendarGrid } from "./CalendarGrid";
import { EventsSidebar } from "./EventsSidebar";
import { type EventItem, isSameDay, parseLocalDate } from "./Shared";

interface EventsViewProps {
  events: EventItem[];
  // Dane z URL
  viewDateStr?: string;
  selectedDateStr?: string;
  // Dane z CMS (Nowe)
  pageTitle?: string;
  seasonLabel?: string;
}

export const EventsView = ({
  events,
  viewDateStr,
  selectedDateStr,
  pageTitle = "Kalendarium", // Fallback
  seasonLabel = "Sezon", // Fallback
}: EventsViewProps) => {
  const now = new Date();

  // 1. Ustalanie daty "widoku" (miesiąc)
  let viewDate = now;
  if (viewDateStr) {
    const [y, m] = viewDateStr.split("-").map(Number);
    if (!Number.isNaN(y) && !Number.isNaN(m)) {
      viewDate = new Date(y, m - 1, 1);
    }
  }

  // 2. Ustalanie wybranej daty
  let selectedDate = now;
  if (selectedDateStr) {
    const parsed = parseLocalDate(selectedDateStr);
    if (!Number.isNaN(parsed.getTime())) {
      selectedDate = parsed;
    }
  }

  // 3. Generowanie siatki kalendarza
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek =
    firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

  const gridCells = [];
  const prevMonthDays = new Date(year, month, 0).getDate();

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    gridCells.push({
      date: new Date(year, month - 1, prevMonthDays - i),
      isCurrentMonth: false,
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    gridCells.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }
  const remainingSlots = 42 - gridCells.length;
  for (let i = 1; i <= remainingSlots; i++) {
    gridCells.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  // 4. Filtrowanie wydarzeń
  const eventsForSelectedDay = events.filter((e) => {
    const eDate = parseLocalDate(e.date);
    return isSameDay(eDate, selectedDate);
  });

  const eventsMap = new Map<string, string[]>();
  for (const e of events) {
    const dateKey = parseLocalDate(e.date).toDateString();
    if (!eventsMap.has(dateKey)) {
      eventsMap.set(dateKey, []);
    }
    eventsMap.get(dateKey)?.push(e.type);
  }

  return (
    <div className="container mx-auto px-4 relative z-10 max-w-400">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 animate-fade-in-up">
        <div>
          <span className="text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" /> {seasonLabel}{" "}
            {viewDate.getFullYear()}
          </span>
          <h1 className="font-youngest text-6xl md:text-8xl lg:text-9xl text-white leading-[0.8] drop-shadow-2xl">
            {pageTitle}
          </h1>
        </div>
      </header>

      <div className="flex flex-col xl:flex-row gap-12 xl:gap-20 items-start">
        <CalendarGrid
          gridCells={gridCells}
          viewDate={viewDate}
          selectedDate={selectedDate}
          eventsMap={eventsMap}
        />
        <EventsSidebar
          selectedDate={selectedDate}
          events={eventsForSelectedDay}
        />
      </div>
    </div>
  );
};
