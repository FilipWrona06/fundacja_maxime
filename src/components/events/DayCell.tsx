// --- FILE: components/events/DayCell.tsx ---
import { clsx } from "clsx";
import Link from "next/link";

interface DayCellProps {
  date: Date;
  viewDate: Date; // Potrzebne, żeby utrzymać widok miesiąca przy klikaniu
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  hasEvent: boolean;
  eventTypes?: string[];
}

export const DayCell = ({
  date,
  viewDate,
  isCurrentMonth,
  isSelected,
  isToday,
  hasEvent,
  eventTypes,
}: DayCellProps) => {
  const fullDateLabel = date.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Formatowanie daty do URL (YYYY-MM-DD)
  const dateStr = date.toLocaleDateString("en-CA"); // ISO format local
  const viewStr = viewDate.toLocaleDateString("en-CA").slice(0, 7); // YYYY-MM

  // Konstrukcja linku: zachowujemy widok miesiąca, zmieniamy wybraną datę
  const href = `?date=${dateStr}&view=${viewStr}`;

  return (
    <li className="relative w-full aspect-square">
      <Link
        href={href}
        scroll={false} // Ważne: nie przewija strony do góry przy kliknięciu
        aria-label={`${fullDateLabel} ${hasEvent ? "- są wydarzenia" : ""}`}
        aria-current={isSelected ? "date" : undefined}
        className={clsx(
          "w-full h-full p-1.5 sm:p-2 flex flex-col justify-between transition-all duration-300 group text-right outline-none relative overflow-hidden rounded-lg border",
          !isCurrentMonth
            ? "opacity-20 pointer-events-none bg-white/5 border-transparent"
            : "border-white/5 bg-[#181818]",
          isCurrentMonth &&
            !isSelected &&
            "hover:border-white/20 hover:bg-[#222] hover:scale-[1.05] hover:z-20 hover:shadow-xl",
          isCurrentMonth &&
            hasEvent &&
            !isSelected &&
            "bg-linear-to-br from-[#222] to-[#111] border-arylideYellow/20 hover:border-arylideYellow/50",
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
              <div
                key={`${date.toISOString()}-${idx}`}
                className={clsx(
                  "py-0.5 px-1.5 rounded-md text-[8px] lg:text-[9px] font-bold uppercase tracking-wider text-left truncate border-l-2 backdrop-blur-sm shadow-sm transition-all animate-in fade-in slide-in-from-bottom-1",
                  isSelected
                    ? "bg-white text-raisinBlack border-arylideYellow"
                    : "bg-black/40 text-philippineSilver border-arylideYellow/40 group-hover:text-white group-hover:border-arylideYellow",
                )}
              >
                {type}
              </div>
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
      </Link>
    </li>
  );
};
