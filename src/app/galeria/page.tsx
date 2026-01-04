"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Maximize2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

// --- DANE: RELACJE (STORIES) ---
const storiesData = [
  {
    id: 1,
    title: "Backstage",
    cover: "/images/hero-poster.jpg",
    slides: [
      {
        id: "s1",
        image: "/images/hero-poster.jpg",
        caption: "Strojenie przed wejściem",
      },
      { id: "s2", image: "/images/about.jpg", caption: "Garderoba solistów" },
      {
        id: "s3",
        image: "/images/timeline/2024.jpg",
        caption: "Tuż przed kurtyną",
      },
    ],
  },
  {
    id: 2,
    title: "Spotkania",
    cover: "/images/timeline/2023.jpg",
    slides: [
      {
        id: "s4",
        image: "/images/timeline/2023.jpg",
        caption: "Bankiet po premierze",
      },
      {
        id: "s5",
        image: "/images/timeline/2022.jpg",
        caption: "Goście z Wiednia",
      },
    ],
  },
  {
    id: 3,
    title: "Wyjazdy",
    cover: "/images/timeline/2024.jpg",
    slides: [
      {
        id: "s6",
        image: "/images/timeline/2024.jpg",
        caption: "W drodze do Berlina",
      },
      { id: "s7", image: "/images/about.jpg", caption: "Zwiedzanie opery" },
      {
        id: "s8",
        image: "/images/hero-poster.jpg",
        caption: "Autobusowa integracja",
      },
    ],
  },
];

// --- DANE: POSTY (TYLKO KONCERTY) ---
const concertPosts = [
  {
    id: "1",
    image: "/images/hero-poster.jpg",
    likes: 234,
    caption: "Finał Symfonii Jesiennej 🍂",
  },
  {
    id: "2",
    image: "/images/timeline/2023.jpg",
    likes: 45,
    caption: "Magia świateł w NOSPR.",
  },
  {
    id: "3",
    image: "/images/timeline/2024.jpg",
    likes: 178,
    caption: "Owacje na stojąco! Dziękujemy!",
  },
  {
    id: "4",
    image: "/images/timeline/2022.jpg",
    likes: 300,
    caption: "Bis!",
  },
  {
    id: "5",
    image: "/images/about.jpg",
    likes: 120,
    caption: "Solówka Anny.",
  },
  {
    id: "6",
    image: "/images/hero-poster.jpg",
    likes: 420,
    caption: "Widok z balkonu.",
  },
];

export default function GalleryPage() {
  const [visibleCount, setVisibleCount] = useState(9);

  // --- STORY VIEWER STATE ---
  const [activeStoryId, setActiveStoryId] = useState<number | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Pobierz dane aktualnie otwartej relacji
  const activeStory = storiesData.find((s) => s.id === activeStoryId);

  // Funkcje nawigacji po Stories
  const closeStory = useCallback(() => {
    setActiveStoryId(null);
    setCurrentSlideIndex(0);
  }, []);

  const nextSlide = useCallback(() => {
    if (!activeStory) return;
    if (currentSlideIndex < activeStory.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      closeStory();
    }
  }, [activeStory, currentSlideIndex, closeStory]);

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const openStory = (id: number) => {
    setActiveStoryId(id);
    setCurrentSlideIndex(0);
  };

  // Auto-play dla Stories
  useEffect(() => {
    if (!activeStoryId) return;
    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  }, [activeStoryId, nextSlide]); // POPRAWIONO: usunięto currentSlideIndex

  return (
    <main className="min-h-screen bg-raisinBlack text-white selection:bg-arylideYellow selection:text-raisinBlack pb-24">
      {/* HEADER */}
      <div className="container mx-auto px-4 pt-36 pb-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="font-youngest text-6xl md:text-8xl text-white mb-4 animate-fade-up">
            Galeria
          </h1>
          <p className="text-philippineSilver max-w-lg mx-auto text-sm md:text-base animate-fade-up [animation-delay:100ms]">
            Wspomnienia z naszych koncertów oraz ekskluzywne materiały zza
            kulis.
          </p>
        </div>

        {/* --- 1. WYRÓŻNIONE RELACJE (STORIES) --- */}
        <div className="flex flex-col items-center mb-16 border-b border-white/10 pb-12">
          <div className="flex gap-6 md:gap-10 overflow-x-auto pb-4 w-full justify-start md:justify-center px-4 scrollbar-hide">
            {storiesData.map((story) => (
              <button
                type="button"
                key={story.id}
                onClick={() => openStory(story.id)}
                className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer"
              >
                {/* Gradientowy pierścień (Insta style) */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-0.75 bg-linear-to-tr from-arylideYellow via-white to-arylideYellow bg-size-[200%_200%] animate-shine group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-raisinBlack bg-black">
                    <Image
                      src={story.cover}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- 2. GRID POSTÓW (TYLKO KONCERTY) --- */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-1 rounded-full bg-arylideYellow" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Nasze Koncerty
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {concertPosts.slice(0, visibleCount).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square group cursor-pointer overflow-hidden bg-white/5"
            >
              <Link
                href={`/galeria/${item.id}`}
                className="block w-full h-full relative"
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 p-4 text-center">
                  <div className="flex items-center gap-2 font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Heart className="fill-white w-5 h-5" />
                    <span>{item.likes}</span>
                  </div>
                  <Maximize2 className="w-5 h-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < concertPosts.length && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="text-xs font-bold uppercase tracking-widest text-philippineSilver hover:text-arylideYellow transition-colors"
            >
              Załaduj więcej
            </button>
          </div>
        )}
      </div>

      {/* --- STORY VIEWER OVERLAY (PEŁNY EKRAN) --- */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-100 bg-black flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeStory}
              className="absolute top-6 right-6 text-white z-20 hover:text-arylideYellow transition-colors"
            >
              <X size={32} />
            </button>

            {/* Content Container (Karta) */}
            <div className="relative w-full h-full md:w-100 md:h-[80vh] md:rounded-xl overflow-hidden bg-[#111]">
              {/* --- PROGRESS BARS --- */}
              <div className="absolute top-4 left-0 w-full px-4 flex gap-1 z-20">
                {activeStory.slides.map((slide, idx) => {
                  const isPast = idx < currentSlideIndex;
                  const isCurrent = idx === currentSlideIndex;

                  return (
                    <div
                      key={slide.id}
                      className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                    >
                      <motion.div
                        key={`${slide.id}-${isCurrent}-${isPast}`}
                        className="h-full bg-white"
                        initial={{ width: isPast ? "100%" : "0%" }}
                        animate={{ width: isPast || isCurrent ? "100%" : "0%" }}
                        transition={{
                          duration: isCurrent ? 5 : 0,
                          ease: "linear",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Nagłówek Stories (Avatar + Nazwa) */}
              <div className="absolute top-8 left-4 flex items-center gap-3 z-10 pointer-events-none">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50">
                  <Image
                    src={activeStory.cover}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="object-cover h-full w-full"
                  />
                </div>
                <span className="text-sm font-bold text-white drop-shadow-md">
                  {activeStory.title}
                </span>
                <span className="text-xs text-white/60 drop-shadow-md">
                  • Obserwuj
                </span>
              </div>

              {/* Zdjęcie */}
              <motion.div
                key={currentSlideIndex}
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={activeStory.slides[currentSlideIndex].image}
                  alt="Story"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/80 to-transparent p-8 pt-24">
                  <p className="text-white font-medium text-center">
                    {activeStory.slides[currentSlideIndex].caption}
                  </p>
                </div>
              </motion.div>

              {/* Strefy dotyku (Nawigacja) */}
              <div className="absolute inset-0 flex z-10">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="w-1/3 h-full cursor-w-resize outline-none"
                  aria-label="Previous"
                />
                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-2/3 h-full cursor-e-resize outline-none"
                  aria-label="Next"
                />
              </div>

              {/* Strzałki nawigacji (Desktop only) */}
              {currentSlideIndex > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="hidden md:flex absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full items-center justify-center text-white z-20 backdrop-blur-sm"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="hidden md:flex absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full items-center justify-center text-white z-20 backdrop-blur-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
