"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, Camera, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- DANE ---
const eventsData = [
  {
    id: 1,
    day: "12",
    month: "PAŹ",
    title: "Symfonia Jesienna",
    location: "Filharmonia Śląska",
  },
  {
    id: 2,
    day: "05",
    month: "LIS",
    title: "Młodzi Mistrzowie",
    location: "Sala Koncertowa NOSPR",
  },
  {
    id: 3,
    day: "20",
    month: "GRU",
    title: "Koncert Świąteczny",
    location: "Kościół św. Piotra i Pawła",
  },
];

const newsData = [
  {
    id: 1,
    title: "Jak wspierać talent dziecka?",
    excerpt: "Rozmowa z pedagogami o rozpoznawaniu predyspozycji muzycznych.",
    date: "28 Wrz 2025",
    image: "/images/news-thumb.jpg",
    slug: "jak-wspierac-talent",
  },
  {
    id: 2,
    title: "Sukces naszej stypendystki",
    excerpt: "Anna Kowalska zdobyła I miejsce na konkursie w Wiedniu.",
    date: "15 Wrz 2025",
    image: "/images/about.jpg",
    slug: "sukces-stypendystki",
  },
  {
    id: 3,
    title: "Nowy nabór do orkiestry",
    excerpt: "Ogłaszamy przesłuchania do sekcji smyczkowej na sezon 2026.",
    date: "01 Wrz 2025",
    image: "/images/hero-poster.jpg",
    slug: "nabor-do-orkiestry",
  },
];

const galleryData = [
  {
    id: 1,
    title: "Warsztaty Letnie 2025",
    count: 24,
    image: "/images/gallery-thumb.jpg",
    slug: "warsztaty-letnie",
  },
  {
    id: 2,
    title: "Koncert Noworoczny",
    count: 48,
    image: "/images/timeline/2024.jpg",
    slug: "koncert-noworoczny",
  },
  {
    id: 3,
    title: "Za kulisami próby",
    count: 12,
    image: "/images/timeline/2023.jpg",
    slug: "za-kulisami",
  },
];

const EVENT_DURATION = 5;
const NEWS_DURATION = 8;
const GALLERY_DURATION = 6;

// Komponent pomocniczy do timera (Okrąg)
const CircularTimer = ({
  duration,
  triggerKey,
}: {
  duration: number;
  triggerKey: number;
}) => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    <svg className="absolute inset-0 w-full h-full -rotate-90">
      <title>Timer</title>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="opacity-20"
      />
      <motion.circle
        key={triggerKey}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeDasharray="63"
        strokeDashoffset="63"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: duration, ease: "linear" }}
      />
    </svg>
  </div>
);

export const Events = () => {
  const [eventIdx, setEventIdx] = useState(0);
  const [newsIdx, setNewsIdx] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);

  useEffect(() => {
    const eventTimer = setInterval(
      () => setEventIdx((p) => (p + 1) % eventsData.length),
      EVENT_DURATION * 1000,
    );
    const newsTimer = setInterval(
      () => setNewsIdx((p) => (p + 1) % newsData.length),
      NEWS_DURATION * 1000,
    );
    const galleryTimer = setInterval(
      () => setGalleryIdx((p) => (p + 1) % galleryData.length),
      GALLERY_DURATION * 1000,
    );

    return () => {
      clearInterval(eventTimer);
      clearInterval(newsTimer);
      clearInterval(galleryTimer);
    };
  }, []);

  return (
    <section className="py-24 bg-raisinBlack overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Na bieżąco
          </span>
          <h2 className="font-youngest text-5xl md:text-7xl text-white leading-tight">
            Puls fundacji
          </h2>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 1. WYDARZENIA */}
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6 text-arylideYellow opacity-80">
              <div className="relative flex items-center justify-center">
                <CircularTimer
                  duration={EVENT_DURATION}
                  triggerKey={eventIdx}
                />
                <Calendar className="absolute w-3 h-3" strokeWidth={2} />
              </div>
              <h3 className="text-xs font-bold tracking-widest uppercase">
                Kalendarz
              </h3>
            </div>

            <div className="relative bg-white/5 border border-white/10 rounded-sm p-8 flex-1 min-h-87.5 flex flex-col justify-center overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={eventsData[eventIdx].id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center w-full absolute inset-0 justify-center p-8"
                >
                  <div className="mb-6 border border-white/20 p-4 rounded-sm w-24 h-24 flex flex-col items-center justify-center bg-white/5 group-hover:border-arylideYellow transition-colors">
                    <span className="font-youngest text-4xl text-arylideYellow">
                      {eventsData[eventIdx].day}
                    </span>
                    <span className="text-xs font-bold uppercase text-white tracking-widest">
                      {eventsData[eventIdx].month}
                    </span>
                  </div>
                  <h4 className="text-2xl text-white font-bold mb-3 group-hover:text-arylideYellow transition-colors">
                    {eventsData[eventIdx].title}
                  </h4>
                  <p className="text-philippineSilver text-sm">
                    {eventsData[eventIdx].location}
                  </p>
                  <Link
                    href={`/wydarzenia/${eventsData[eventIdx].id}`}
                    className="mt-8 text-xs font-bold text-white border-b border-white/20 pb-1 hover:border-arylideYellow hover:text-arylideYellow transition-all"
                  >
                    SZCZEGÓŁY
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 2. AKTUALNOŚCI */}
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6 text-arylideYellow opacity-80">
              <div className="relative flex items-center justify-center">
                <CircularTimer duration={NEWS_DURATION} triggerKey={newsIdx} />
                <Newspaper className="absolute w-3 h-3" strokeWidth={2} />
              </div>
              <h3 className="text-xs font-bold tracking-widest uppercase">
                Aktualności
              </h3>
            </div>

            <div className="relative rounded-sm border border-white/10 flex-1 min-h-87.5 overflow-hidden group bg-raisinBlack">
              <AnimatePresence mode="wait">
                <motion.div
                  key={newsData[newsIdx].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full bg-raisinBlack"
                >
                  {/* Obrazek z zoomem */}
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: NEWS_DURATION, ease: "linear" }}
                  >
                    <Image
                      src={newsData[newsIdx].image}
                      alt={newsData[newsIdx].title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/95 via-raisinBlack/50 to-transparent" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="text-xs text-arylideYellow mb-2 block">
                      {newsData[newsIdx].date}
                    </span>
                    <h4 className="text-xl text-white font-bold mb-3 leading-tight group-hover:text-arylideYellow transition-colors">
                      {newsData[newsIdx].title}
                    </h4>
                    <p className="text-philippineSilver text-sm line-clamp-3 mb-6">
                      {newsData[newsIdx].excerpt}
                    </p>
                    <Link
                      href={`/aktualnosci/${newsData[newsIdx].slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest hover:text-arylideYellow transition-colors"
                    >
                      Czytaj dalej <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 3. GALERIA */}
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6 text-arylideYellow opacity-80">
              <div className="relative flex items-center justify-center">
                <CircularTimer
                  duration={GALLERY_DURATION}
                  triggerKey={galleryIdx}
                />
                <Camera className="absolute w-3 h-3" strokeWidth={2} />
              </div>
              <h3 className="text-xs font-bold tracking-widest uppercase">
                Galeria
              </h3>
            </div>

            <div className="relative rounded-sm border border-white/10 flex-1 min-h-87.5 overflow-hidden group bg-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryData[galleryIdx].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full bg-raisinBlack"
                >
                  <div className="absolute inset-4 overflow-hidden rounded-sm border border-white/5">
                    <motion.div
                      className="absolute inset-0 w-full h-full"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.15 }}
                      transition={{
                        duration: GALLERY_DURATION,
                        ease: "linear",
                      }}
                    >
                      <Image
                        src={galleryData[galleryIdx].image}
                        alt={galleryData[galleryIdx].title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-raisinBlack/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-raisinBlack/60 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 shadow-xl group-hover:scale-110 group-hover:bg-arylideYellow group-hover:text-raisinBlack transition-all duration-300">
                        <Camera className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-0 w-full text-center z-20 px-4">
                    <h4 className="text-white font-bold text-lg mb-1">
                      {galleryData[galleryIdx].title}
                    </h4>
                    <Link
                      href={`/galeria/${galleryData[galleryIdx].slug}`}
                      className="text-xs text-philippineSilver uppercase tracking-wider hover:text-arylideYellow transition-colors"
                    >
                      Zobacz {galleryData[galleryIdx].count} zdjęć
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
