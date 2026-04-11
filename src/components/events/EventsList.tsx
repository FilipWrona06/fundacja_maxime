// src/app/(user)/wydarzenia/EventsList.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

export interface EventProps {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  image: string;
}

const allMonths = [
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

export default function EventsList({
  eventsData,
}: {
  eventsData: EventProps[];
}) {
  const [activeMonth, setActiveMonth] = useState("Wszystkie");

  const filteredEvents =
    activeMonth === "Wszystkie"
      ? eventsData
      : eventsData.filter((event) => event.month === activeMonth);

  return (
    <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-8">
      {/* --- MENU FILTROWANIA --- */}
      <div className="relative lg:col-span-3">
        <div className="lg:sticky lg:top-40">
          <FadeIn>
            <h2 className="font-youngest text-raisinBlack mb-8 text-5xl">
              Wybierz miesiąc
            </h2>
            <ul className="hide-scrollbar flex overflow-x-auto pt-2 pb-6 lg:flex-col lg:gap-4 lg:overflow-visible lg:pb-0">
              <li className="mr-6 shrink-0 lg:mr-0">
                <button
                  type="button"
                  onClick={() => setActiveMonth("Wszystkie")}
                  className="group flex flex-col items-start"
                >
                  <span
                    className={`font-montserrat text-sm tracking-widest uppercase transition-colors duration-300 ${activeMonth === "Wszystkie" ? "text-oxfordBlue font-bold" : "text-raisinBlack/40 group-hover:text-raisinBlack font-medium"}`}
                  >
                    Wszystkie
                  </span>
                  <div
                    className={`bg-oxfordBlue mt-2 h-0.5 transition-all duration-500 ${activeMonth === "Wszystkie" ? "w-full" : "w-0 group-hover:w-6"}`}
                  />
                </button>
              </li>
              {allMonths.map((month) => (
                <li key={month} className="mr-6 shrink-0 lg:mr-0">
                  <button
                    type="button"
                    onClick={() => setActiveMonth(month)}
                    className="group flex flex-col items-start"
                  >
                    <span
                      className={`font-montserrat text-sm tracking-widest uppercase transition-colors duration-300 ${activeMonth === month ? "text-oxfordBlue font-bold" : "text-raisinBlack/40 group-hover:text-raisinBlack font-medium"}`}
                    >
                      {month}
                    </span>
                    <div
                      className={`bg-oxfordBlue mt-2 h-0.5 transition-all duration-500 ${activeMonth === month ? "w-full" : "w-0 group-hover:w-6"}`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>

      {/* --- WYNIKI FILTROWANIA --- */}
      <div className="lg:col-span-9">
        <div
          key={activeMonth}
          className="border-raisinBlack/20 flex flex-col border-t"
        >
          {filteredEvents.map((event, index) => (
            <FadeIn key={event.id} delay={`${index * 150}ms`}>
              <div className="group border-raisinBlack/20 relative overflow-hidden border-b px-4 py-8 transition-colors lg:px-10 lg:py-12">
                <div className="bg-oxfordBlue absolute inset-0 z-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

                <div className="pointer-events-none absolute top-1/2 right-[5%] z-10 h-32 w-24 translate-x-8 -translate-y-1/2 scale-50 rotate-12 overflow-hidden rounded-md opacity-0 shadow-2xl transition-all duration-600 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:-rotate-3 group-hover:opacity-100 md:h-40 md:w-28 lg:right-[20%]">
                  <Image
                    src={event.image || "/video-poster.webp"}
                    alt={`Plakat ${event.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 96px, 112px"
                  />
                </div>

                <div className="relative z-20 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
                  <div className="flex items-center gap-6 md:w-[25%] lg:w-1/4 lg:pr-6 xl:pr-0">
                    <span className="font-montserrat text-raisinBlack text-6xl leading-none font-black tracking-tighter transition-colors duration-500 group-hover:text-white lg:text-7xl">
                      {event.day}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-youngest text-oxfordBlue group-hover:text-arylideYellow mb-1 text-3xl transition-colors duration-500">
                        {event.month}
                      </span>
                      <span className="font-montserrat text-raisinBlack/40 text-[0.65rem] font-bold tracking-widest uppercase transition-colors duration-500 group-hover:text-white/50">
                        {event.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:w-[45%] lg:w-[42%] lg:pl-10 xl:w-2/4 xl:pl-0">
                    <h3 className="font-montserrat text-raisinBlack mb-2 text-2xl leading-tight font-bold transition-colors duration-500 group-hover:text-white lg:text-4xl">
                      {event.title}
                    </h3>
                    <span className="font-montserrat text-raisinBlack/60 text-[0.65rem] font-semibold tracking-widest uppercase transition-colors duration-500 group-hover:text-white/70">
                      {event.location} • {event.time}
                    </span>
                  </div>

                  <div className="flex w-full items-center md:w-[30%] md:justify-end lg:w-1/4">
                    <Link
                      href={`/wydarzenia/${event.id}`}
                      className="group/btn bg-raisinBlack font-montserrat group-hover:bg-arylideYellow group-hover:text-oxfordBlue relative flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-[0.65rem] font-bold tracking-[0.2em] text-white uppercase transition-all duration-500 hover:scale-105 md:inline-flex md:w-auto"
                    >
                      Zobacz więcej
                      <svg
                        className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <div className="py-20 text-center">
            <FadeIn>
              <span className="font-youngest text-raisinBlack/30 text-4xl">
                Obecnie nie zaplanowano wydarzeń w tym miesiącu.
              </span>
            </FadeIn>
          </div>
        )}
      </div>
    </div>
  );
}
