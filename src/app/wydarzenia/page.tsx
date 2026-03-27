// src/app/wydarzenia/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

// ----------------------------------------------------------------------
// BAZA DANYCH WYDARZEŃ
// ----------------------------------------------------------------------
const eventsData = [
  {
    id: 1,
    day: "12",
    month: "Kwiecień",
    year: "2026",
    title: "Wiosenne Przebudzenie",
    location: "Teatr Wielki, Poznań",
    time: "19:00",
    category: "Symfonia",
    image: "/video-poster.webp",
  },
  {
    id: 2,
    day: "24",
    month: "Maj",
    year: "2026",
    title: "Symfonia Światła: Finał Sezonu",
    location: "Filharmonia Narodowa, Warszawa",
    time: "20:00",
    category: "Gala",
    image: "/video-poster.webp",
  },
  {
    id: 3,
    day: "05",
    month: "Czerwiec",
    year: "2026",
    title: "Muzyka Nocy Letniej",
    location: "Amfiteatr Kadzielnia, Kielce",
    time: "21:30",
    category: "Plener",
    image: "/video-poster.webp",
  },
  {
    id: 4,
    day: "18",
    month: "Czerwiec",
    year: "2026",
    title: "Klasyka na Nowo. Edycja Specjalna",
    location: "Sala Kongresowa, Wrocław",
    time: "18:00",
    category: "Symfonia",
    image: "/video-poster.webp",
  },
  {
    id: 5,
    day: "02",
    month: "Lipiec",
    year: "2026",
    title: "Maxime & Goście",
    location: "NOSPR, Katowice",
    time: "19:00",
    category: "Gala",
    image: "/video-poster.webp",
  },
];

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

export default function EventsPage() {
  const [activeMonth, setActiveMonth] = useState("Wszystkie");

  const filteredEvents =
    activeMonth === "Wszystkie"
      ? eventsData
      : eventsData.filter((event) => event.month === activeMonth);

  return (
    <main className="relative min-h-screen w-full bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack">
      <section className="relative z-10 flex min-h-[60vh] w-full flex-col justify-center overflow-hidden px-6 pt-32 lg:px-12 lg:pt-40">
        <div className="pointer-events-none absolute -right-20 top-20 z-0 h-160 w-160 opacity-5 lg:top-0 lg:h-240 lg:w-240">
          <Image
            src="/Asset-1.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <FadeIn delay="100ms">
            <span className="mb-6 block font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-arylideYellow">
              Kalendarium
            </span>
          </FadeIn>
          <FadeIn delay="300ms">
            <h1 className="font-montserrat text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[7rem]">
              Scena jest <br />
              <span className="relative top-4 mb-4 md:mb-0 inline-block -rotate-2 font-youngest text-6xl font-normal text-arylideYellow md:text-8xl lg:top-8 lg:text-[10rem]">
                nasza.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay="500ms" className="mt-7 max-w-xl lg:mt-19">
            <p className="font-montserrat text-lg font-light leading-relaxed tracking-wide text-white/70 mb-5">
              Sprawdź harmonogram naszych nadchodzących koncertów. Dołącz do nas
              na żywo i stań się częścią widowiska, o którym mówi się jeszcze
              długo po opadnięciu kurtyny.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="relative z-20 w-full rounded-t-[3rem] bg-[#F4F4F5] py-24 lg:rounded-t-[5rem] lg:py-40">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-3 relative">
              <div className="lg:sticky lg:top-40">
                <FadeIn>
                  <h2 className="mb-8 font-youngest text-5xl text-raisinBlack">
                    Wybierz miesiąc
                  </h2>

                  <ul className="flex overflow-x-auto pb-6 pt-2 hide-scrollbar lg:flex-col lg:gap-4 lg:overflow-visible lg:pb-0">
                    <li className="shrink-0 mr-6 lg:mr-0">
                      <button
                        type="button"
                        onClick={() => setActiveMonth("Wszystkie")}
                        className="group flex flex-col items-start"
                      >
                        <span
                          className={`font-montserrat text-sm uppercase tracking-widest transition-colors duration-300 ${activeMonth === "Wszystkie" ? "font-bold text-oxfordBlue" : "font-medium text-raisinBlack/40 group-hover:text-raisinBlack"}`}
                        >
                          Wszystkie
                        </span>
                        <div
                          className={`mt-2 h-0.5 bg-oxfordBlue transition-all duration-500 ${activeMonth === "Wszystkie" ? "w-full" : "w-0 group-hover:w-6"}`}
                        />
                      </button>
                    </li>

                    {allMonths.map((month) => (
                      <li key={month} className="shrink-0 mr-6 lg:mr-0">
                        <button
                          type="button"
                          onClick={() => setActiveMonth(month)}
                          className="group flex flex-col items-start"
                        >
                          <span
                            className={`font-montserrat text-sm uppercase tracking-widest transition-colors duration-300 ${activeMonth === month ? "font-bold text-oxfordBlue" : "font-medium text-raisinBlack/40 group-hover:text-raisinBlack"}`}
                          >
                            {month}
                          </span>
                          <div
                            className={`mt-2 h-0.5 bg-oxfordBlue transition-all duration-500 ${activeMonth === month ? "w-full" : "w-0 group-hover:w-6"}`}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </div>
            </div>

            <div className="lg:col-span-9">
              <div
                key={activeMonth}
                className="flex flex-col border-t border-raisinBlack/20"
              >
                {filteredEvents.map((event, index) => (
                  <FadeIn key={event.id} delay={`${index * 150}ms`}>
                    <div className="group relative overflow-hidden border-b border-raisinBlack/20 px-4 py-8 transition-colors lg:px-10 lg:py-12">
                      <div className="absolute inset-0 z-0 origin-bottom scale-y-0 bg-oxfordBlue transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

                      <div className="absolute right-[5%] top-1/2 z-10 h-32 w-24 -translate-y-1/2 translate-x-8 rotate-12 scale-50 overflow-hidden rounded-md opacity-0 shadow-2xl transition-all duration-600 ease-out pointer-events-none group-hover:translate-x-0 group-hover:-rotate-3 group-hover:scale-100 group-hover:opacity-100 md:h-40 md:w-28 lg:right-[20%]">
                        <Image
                          src={
                            event.image ||
                            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop"
                          }
                          alt={`Plakat ${event.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 96px, 112px"
                        />
                      </div>

                      <div className="relative z-20 flex flex-col gap-6 md:flex-row md:gap-8 md:items-center md:justify-between">
                        {/* ZMIANA: Dodano lg:pr-6 xl:pr-0 aby pochylony font nie wychodził w prawo */}
                        <div className="flex items-center gap-6 md:w-[25%] lg:w-1/4 lg:pr-6 xl:pr-0">
                          <span className="font-montserrat text-6xl font-black leading-none tracking-tighter text-raisinBlack transition-colors duration-500 group-hover:text-white lg:text-7xl">
                            {event.day}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-youngest text-3xl text-oxfordBlue transition-colors duration-500 group-hover:text-arylideYellow mb-1">
                              {event.month}
                            </span>
                            <span className="font-montserrat text-[0.65rem] font-bold uppercase tracking-widest text-raisinBlack/40 transition-colors duration-500 group-hover:text-white/50">
                              {event.year}
                            </span>
                          </div>
                        </div>

                        {/* ZMIANA: lg:w-[42%] lg:pl-10 xl:w-2/4 xl:pl-0 -> wymusza odsunięcie i robi miejsce na pochylony miesiąc z lewej */}
                        <div className="flex flex-col md:w-[45%] lg:w-[42%] lg:pl-10 xl:w-2/4 xl:pl-0">
                          <span className="mb-2 font-montserrat text-[0.65rem] font-bold uppercase tracking-widest text-arylideYellow opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            {event.category}
                          </span>
                          <h3 className="mb-2 font-montserrat text-2xl font-bold leading-tight text-raisinBlack transition-colors duration-500 group-hover:text-white lg:text-4xl">
                            {event.title}
                          </h3>
                          <span className="font-montserrat text-[0.65rem] font-semibold uppercase tracking-widest text-raisinBlack/60 transition-colors duration-500 group-hover:text-white/70">
                            {event.location} • {event.time}
                          </span>
                        </div>

                        <div className="flex w-full items-center md:w-[30%] md:justify-end lg:w-1/4">
                          <Link
                            href={`/wydarzenia/${event.id}`}
                            className="group/btn relative flex w-full md:w-auto md:inline-flex items-center justify-center gap-3 rounded-full bg-raisinBlack px-8 py-4 font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:scale-105 group-hover:bg-arylideYellow group-hover:text-oxfordBlue"
                          >
                            Zobacz więcej
                            <svg
                              aria-hidden="true"
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
                    <span className="font-youngest text-4xl text-raisinBlack/30">
                      Obecnie nie zaplanowano wydarzeń w tym miesiącu.
                    </span>
                  </FadeIn>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full bg-raisinBlack py-32 text-center lg:py-40">
        <FadeIn>
          <span className="font-youngest text-4xl text-arylideYellow md:text-5xl">
            Dla organizatorów
          </span>
        </FadeIn>
        <FadeIn delay="200ms" className="mt-6">
          <h2 className="font-montserrat text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Chcesz zaprosić nas <br />
            na swoje wydarzenie?
          </h2>
        </FadeIn>
        <FadeIn delay="400ms" className="mt-12">
          <Link
            href="/kontakt"
            className="group inline-flex items-center justify-center gap-4 rounded-full border border-white/20 bg-transparent px-12 py-5 font-montserrat text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:border-arylideYellow hover:text-arylideYellow"
          >
            Skontaktuj się z nami
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}
