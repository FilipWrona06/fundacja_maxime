"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight as ChevronRightIcon,
  Clock,
  Info,
  MapPin,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type EventItem, MONTH_NAMES } from "./Shared";

interface EventsSidebarProps {
  selectedDate: Date;
  events: EventItem[];
}

export const EventsSidebar = ({ selectedDate, events }: EventsSidebarProps) => {
  return (
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
            {events.length > 0 ? (
              events.map((event) => (
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
                      {event.isSoldOut ? "Brak biletów" : "Szczegóły i bilety"}
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
  );
};
