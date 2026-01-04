"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

// --- DANE ---
const categories = [
  "Wszystkie",
  "Wydarzenia",
  "Sukcesy",
  "Wywiady",
  "Media",
  "Edukacja",
];

const newsData = [
  {
    id: "1",
    title: "Muzyka, która łączy pokolenia – wywiad z Dyrektorem",
    excerpt:
      "O tym, jak klasyka odnajduje się w nowoczesnym świecie i dlaczego warto inwestować w młode talenty.",
    date: "28.10",
    year: "2025",
    category: "Wywiady",
    image: "/images/hero-poster.jpg",
  },
  {
    id: "2",
    title: "Złoty Smyczek dla Julii Kamińskiej",
    excerpt: "Pierwszy taki sukces w historii naszego programu stypendialnego.",
    date: "20.10",
    year: "2025",
    category: "Sukcesy",
    image: "/images/about.jpg",
  },
  {
    id: "3",
    title: "Warsztaty Letnie: Podsumowanie",
    excerpt:
      "Tydzień ciężkiej pracy i inspiracji w Zakopanem. Zobacz wideorelację.",
    date: "15.09",
    year: "2025",
    category: "Wydarzenia",
    image: "/images/timeline/2024.jpg",
  },
  {
    id: "4",
    title: "Fundacja w 'Pytaniu na Śniadanie'",
    excerpt: "Promujemy naszą misję w mediach ogólnopolskich.",
    date: "05.09",
    year: "2025",
    category: "Media",
    image: "/images/timeline/2023.jpg",
  },
  {
    id: "5",
    title: "Nabór do sekcji dętej: Wyniki",
    excerpt: "Poznaj nazwiska nowych członków orkiestry Maxime.",
    date: "01.09",
    year: "2025",
    category: "Edukacja",
    image: "/images/timeline/2022.jpg",
  },
  {
    id: "6",
    title: "Jak dbać o instrument zimą?",
    excerpt: "Poradnik lutnika dla młodych muzyków.",
    date: "20.08",
    year: "2025",
    category: "Edukacja",
    image: "/images/hero-poster.jpg",
  },
  {
    id: "7",
    title: "Koncert Charytatywny 'Dla Przyszłości'",
    excerpt: "Zebraliśmy rekordową sumę na nowe skrzypce.",
    date: "12.08",
    year: "2025",
    category: "Wydarzenia",
    image: "/images/about.jpg",
  },
  {
    id: "8",
    title: "Nowy partner strategiczny fundacji",
    excerpt: "Współpraca z bankiem, która otwiera nowe możliwości.",
    date: "01.08",
    year: "2025",
    category: "Media",
    image: "/images/timeline/2024.jpg",
  },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [activeImage, setActiveImage] = useState<string>(newsData[0].image);
  const [isHovering, setIsHovering] = useState(false);

  // Filtrowanie
  const filteredList = useMemo(() => {
    return newsData.filter((item) => {
      const matchesCategory =
        activeCategory === "Wszystkie" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleList = filteredList.slice(0, visibleCount);
  const hasMore = visibleList.length < filteredList.length;

  const updateImage = (img: string, fromHover = false) => {
    if (fromHover) {
      setIsHovering(true);
      setActiveImage(img);
    } else {
      if (!isHovering) {
        setActiveImage(img);
      }
    }
  };

  return (
    <main className="min-h-screen bg-raisinBlack text-white relative">
      {/* --- 1. NAGŁÓWEK (SCROLLUJE SIĘ NORMALNIE) --- */}
      <div className="container mx-auto px-4 pt-32 pb-8 relative z-10">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-1 block animate-fade-up">
              Magazyn
            </span>
            <h1 className="font-youngest text-6xl md:text-8xl leading-[0.8] text-white animate-fade-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
              Kronika
            </h1>
          </div>
          {/* Licznik */}
          <div className="hidden md:block text-right animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            <span className="text-3xl font-montserrat font-bold text-white/10">
              {String(filteredList.length).padStart(2, "0")}
            </span>
            <span className="block text-[10px] text-philippineSilver uppercase tracking-widest">
              Artykułów
            </span>
          </div>
        </div>
      </div>

      {/* --- 2. PASEK NARZĘDZI (PRZYKLEJONY) --- */}
      <div className="sticky top-0 z-40 bg-raisinBlack/95 backdrop-blur-xl border-y border-white/10 shadow-2xl transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-arylideYellow transition-colors w-4 h-4" />
              <input
                type="text"
                placeholder="Szukaj wpisu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-2 pl-7 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-arylideYellow transition-colors font-montserrat tracking-wide"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
              <span className="text-philippineSilver/40 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <SlidersHorizontal size={12} />
              </span>
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={clsx(
                    "text-xs font-bold uppercase tracking-widest transition-all duration-300 relative py-1",
                    activeCategory === cat
                      ? "text-arylideYellow"
                      : "text-philippineSilver hover:text-white",
                  )}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 w-full h-px bg-arylideYellow"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. MAIN CONTENT --- */}
      <div className="container mx-auto px-4 pt-12">
        <div className="flex flex-col lg:flex-row items-start relative">
          {/* LEWA KOLUMNA (SCROLLABLE) */}
          {/* biome-ignore lint/a11y/noStaticElementInteractions: Mouse interaction needed for visual effect */}
          <div
            className="w-full lg:w-1/2 xl:w-7/12 pb-24 lg:pr-16 min-h-[50vh]"
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="flex flex-col">
              <AnimatePresence mode="popLayout">
                {visibleList.length > 0 ? (
                  visibleList.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      // Logika zmiany obrazka przy scrollowaniu
                      onViewportEnter={() => updateImage(item.image)}
                      viewport={{ amount: 0.5, margin: "0px 0px -20% 0px" }}
                      // Logika hovera
                      onMouseEnter={() => updateImage(item.image, true)}
                    >
                      <Link
                        href={`/aktualnosci/${item.id}`}
                        className="group relative flex flex-col md:flex-row gap-6 py-10 border-b border-white/5 transition-all duration-300 hover:border-arylideYellow/30 hover:bg-white/2 -mx-4 px-4 rounded-sm"
                      >
                        <div className="md:w-24 shrink-0 flex flex-col items-start pt-1">
                          <span className="text-3xl font-youngest text-arylideYellow/80 group-hover:text-arylideYellow transition-colors">
                            {item.date}
                          </span>
                          <span className="text-xs text-white/30 font-mono tracking-widest">
                            {item.year}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="mb-3">
                            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] group-hover:text-arylideYellow transition-colors">
                              {item.category}
                            </span>
                          </div>
                          <h2 className="text-2xl font-montserrat font-bold text-white mb-4 leading-tight group-hover:text-arylideYellow transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-sm text-philippineSilver leading-relaxed line-clamp-2 group-hover:text-white/80 transition-colors">
                            {item.excerpt}
                          </p>

                          <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-arylideYellow transition-colors">
                            Czytaj dalej{" "}
                            <ArrowRight
                              size={14}
                              className="transition-transform group-hover:translate-x-2"
                            />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-20 text-center border border-dashed border-white/10 rounded-sm">
                    <p className="text-white/40 mb-4">
                      Brak wpisów spełniających kryteria.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("Wszystkie");
                      }}
                      className="text-arylideYellow text-xs font-bold uppercase hover:underline"
                    >
                      Zresetuj filtry
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {hasMore && (
              <div className="mt-16 mb-24 flex justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 5)}
                  className="group relative px-8 py-4 bg-transparent border border-white/20 overflow-hidden rounded-sm transition-all hover:border-arylideYellow"
                >
                  <div className="absolute inset-0 w-0 bg-arylideYellow transition-all duration-250 ease-out group-hover:w-full opacity-10" />
                  <span className="relative flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white group-hover:text-arylideYellow">
                    Wczytaj więcej{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* --- PRAWA KOLUMNA (STICKY IMAGE) --- */}
          <div className="hidden lg:block w-1/2 xl:w-5/12 sticky top-35 h-150 self-start mb-12">
            <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 bg-[#1a1a1a] shadow-2xl">
              {/* Winieta i Dekoracje */}
              <div className="absolute inset-0 z-20 pointer-events-none border border-white/5 m-2" />
              <div className="absolute inset-0 bg-oxfordBlue/20 mix-blend-multiply z-10" />

              {/* Animacja zmiany zdjęć */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeImage}
                    alt="Podgląd wpisu"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Statyczny Overlay */}
              <div className="absolute bottom-8 right-8 z-30 opacity-50 mix-blend-overlay">
                <span className="font-youngest text-6xl text-white rotate-[-5deg] block">
                  Maxime
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
