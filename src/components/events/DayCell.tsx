"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import { memo } from "react";

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  hasEvent: boolean;
  eventTypes?: string[];
  onClick: (date: Date) => void;
}

export const DayCell = memo(
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
