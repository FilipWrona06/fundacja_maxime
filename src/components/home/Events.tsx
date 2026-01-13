"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Camera,
  Newspaper,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- DANE (Bez zmian) ---
const eventsData = [
  {
    id: 1,
    day: "12",
    month: "Październik",
    shortMonth: "PAŹ",
    title: "Symfonia Jesienna",
    location: "Filharmonia Śląska",
    image: "/images/hero-poster.jpg", // Dodano placeholder obrazka dla eventu
  },
  {
    id: 2,
    day: "05",
    month: "Listopad",
    shortMonth: "LIS",
    title: "Młodzi Mistrzowie",
    location: "Sala Koncertowa NOSPR",
    image: "/images/timeline/2024.jpg",
  },
  {
    id: 3,
    day: "20",
    month: "Grudzień",
    shortMonth: "GRU",
    title: "Koncert Świąteczny",
    location: "Kościół św. Piotra i Pawła",
    image: "/images/about.jpg",
  },
];

const newsData = [
  {
    id: 1,
    title: "Jak wspierać talent dziecka?",
    excerpt:
      "Rozmowa z pedagogami o rozpoznawaniu predyspozycji muzycznych u najmłodszych.",
    date: "28.09.2025",
    image: "/images/news-thumb.jpg",
    slug: "jak-wspierac-talent",
  },
  {
    id: 2,
    title: "Sukces naszej stypendystki",
    excerpt:
      "Anna Kowalska zdobyła I miejsce na prestiżowym konkursie w Wiedniu.",
    date: "15.09.2025",
    image: "/images/about.jpg",
    slug: "sukces-stypendystki",
  },
  {
    id: 3,
    title: "Nowy nabór do orkiestry",
    excerpt:
      "Ogłaszamy przesłuchania do sekcji smyczkowej na nadchodzący sezon 2026.",
    date: "01.09.2025",
    image: "/images/hero-poster.jpg",
    slug: "nabor-do-orkiestry",
  },
];

const galleryData = [
  {
    id: 1,
    title: "Warsztaty Letnie",
    subtitle: "Zakopane 2025",
    count: 24,
    image: "/images/gallery-thumb.jpg",
    slug: "warsztaty-letnie",
  },
  {
    id: 2,
    title: "Koncert Noworoczny",
    subtitle: "Gala w NOSPR",
    count: 48,
    image: "/images/timeline/2024.jpg",
    slug: "koncert-noworoczny",
  },
  {
    id: 3,
    title: "Za kulisami",
    subtitle: "Reportaż z prób",
    count: 12,
    image: "/images/timeline/2023.jpg",
    slug: "za-kulisami",
  },
];

const EVENT_DURATION = 6;
const NEWS_DURATION = 8;
const GALLERY_DURATION = 7;

// Pasek postępu (zamiast kółka - bardziej nowoczesny)
const LinearTimer = ({
  duration,
  triggerKey,
}: {
  duration: number;
  triggerKey: number;
}) => (
  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 overflow-hidden z-20">
    <motion.div
      key={triggerKey}
      className="h-full bg-arylideYellow"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: duration, ease: "linear" }}
    />
  </div>
);

export const Events = () => {
  const [eventIdx, setEventIdx] = useState(0);
  const [newsIdx, setNewsIdx] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);

  useEffect(() => {
    const timers = [
      setInterval(
        () => setEventIdx((p) => (p + 1) % eventsData.length),
        EVENT_DURATION * 1000,
      ),
      setInterval(
        () => setNewsIdx((p) => (p + 1) % newsData.length),
        NEWS_DURATION * 1000,
      ),
      setInterval(
        () => setGalleryIdx((p) => (p + 1) % galleryData.length),
        GALLERY_DURATION * 1000,
      ),
    ];
    return () => timers.forEach(clearInterval);
  }, []);

  return (
    <section className="py-24 bg-raisinBlack overflow-hidden">
      <div className="container mx-auto px-4 max-w-350">
        {/* NAGŁÓWEK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-arylideYellow text-xs font-bold tracking-[0.3em] uppercase mb-4 block animate-fade-up">
              Aktualności
            </span>
            <h2 className="font-youngest text-5xl md:text-7xl text-white leading-[0.8] animate-fade-up [animation-delay:100ms]">
              Puls Fundacji
            </h2>
          </div>
          <Link
            href="/aktualnosci"
            className="group flex items-center gap-3 text-white text-sm font-bold uppercase tracking-widest hover:text-arylideYellow transition-colors animate-fade-up [animation-delay:200ms]"
          >
            Zobacz wszystko
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-arylideYellow group-hover:bg-arylideYellow group-hover:text-raisinBlack transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-150">
          {/* 1. DUŻY PLAKAT (WYDARZENIA) - LEWA STRONA (5 KOLUMN) */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-sm bg-[#1a1a1a] h-125 lg:h-auto border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={eventsData[eventIdx].id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Obrazek tła */}
                <Image
                  src={eventsData[eventIdx].image}
                  alt={eventsData[eventIdx].title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  {/* Top: Badge */}
                  <div className="flex justify-between items-start">
                    <div className="bg-arylideYellow text-raisinBlack px-4 py-2 font-bold uppercase tracking-widest text-xs rounded-sm">
                      Najbliższy Koncert
                    </div>
                    <div className="text-white/20 group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Bottom: Info */}
                  <div>
                    <div className="flex items-baseline gap-2 mb-2 text-arylideYellow">
                      <span className="text-6xl font-youngest">
                        {eventsData[eventIdx].day}
                      </span>
                      <span className="text-xl font-bold uppercase tracking-widest">
                        {eventsData[eventIdx].month}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight group-hover:text-arylideYellow transition-colors">
                      {eventsData[eventIdx].title}
                    </h3>
                    <div className="flex items-center gap-2 text-philippineSilver text-sm">
                      <Calendar className="w-4 h-4" />
                      {eventsData[eventIdx].location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Link nakładka */}
            <Link
              href={`/wydarzenia/${eventsData[eventIdx].id}`}
              className="absolute inset-0 z-20"
              aria-label="Zobacz wydarzenie"
            />
            <LinearTimer duration={EVENT_DURATION} triggerKey={eventIdx} />
          </div>

          {/* PRAWA KOLUMNA (NEWSY I GALERIA) (7 KOLUMN) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 2. AKTUALNOŚCI - GÓRA (POZIOMY KAFILEK) */}
            <div className="relative flex-1 bg-white/5 border border-white/10 rounded-sm overflow-hidden group min-h-62.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={newsData[newsIdx].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col md:flex-row h-full"
                >
                  {/* Zdjęcie po lewej (Mobile: góra) */}
                  <div className="relative w-full md:w-2/5 h-40 md:h-full overflow-hidden">
                    <Image
                      src={newsData[newsIdx].image}
                      alt={newsData[newsIdx].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Treść po prawej */}
                  <div className="p-6 md:p-8 flex flex-col justify-center w-full md:w-3/5 bg-raisinBlack md:bg-transparent">
                    <div className="flex items-center gap-3 mb-3">
                      <Newspaper className="w-4 h-4 text-arylideYellow" />
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                        Aktualności
                      </span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span className="text-xs text-white/40">
                        {newsData[newsIdx].date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 leading-snug group-hover:text-arylideYellow transition-colors line-clamp-2">
                      {newsData[newsIdx].title}
                    </h3>
                    <p className="text-philippineSilver text-sm line-clamp-2 mb-6">
                      {newsData[newsIdx].excerpt}
                    </p>
                    <div className="text-xs font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1 self-start group-hover:border-arylideYellow transition-colors">
                      Czytaj Więcej
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <Link
                href={`/aktualnosci/${newsData[newsIdx].slug}`}
                className="absolute inset-0 z-20"
              />
              <LinearTimer duration={NEWS_DURATION} triggerKey={newsIdx} />
            </div>

            {/* 3. GALERIA - DÓŁ (SZEROKI KAFILEK) */}
            <div className="relative flex-1 bg-white/5 border border-white/10 rounded-sm overflow-hidden group min-h-62.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryData[galleryIdx].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Tło full size */}
                  <Image
                    src={galleryData[galleryIdx].image}
                    alt={galleryData[galleryIdx].title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-raisinBlack via-raisinBlack/60 to-transparent" />

                  {/* Content - wyśrodkowany pionowo po lewej */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-center items-start z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-arylideYellow border border-white/10">
                        <Camera className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-white uppercase tracking-widest">
                        Ostatnie albumy
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-youngest text-white mb-1">
                      {galleryData[galleryIdx].title}
                    </h3>
                    <p className="text-philippineSilver text-sm uppercase tracking-widest mb-6">
                      {galleryData[galleryIdx].subtitle}
                    </p>

                    <div className="px-4 py-2 border border-white/20 rounded-full text-xs font-bold text-white hover:bg-white hover:text-raisinBlack transition-all">
                      Zobacz {galleryData[galleryIdx].count} zdjęć
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <Link
                href={`/galeria/${galleryData[galleryIdx].slug}`}
                className="absolute inset-0 z-20"
              />
              <LinearTimer
                duration={GALLERY_DURATION}
                triggerKey={galleryIdx}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
