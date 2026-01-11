"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
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
      "Rozmowa z Dyrektorem o tym, jak klasyka odnajduje się w nowoczesnym świecie.",
    date: "28.10.2025",
    category: "Wywiady",
    image: "/images/hero-poster.jpg",
  },
  {
    id: "2",
    title: "Złoty Smyczek dla Julii Kamińskiej",
    excerpt:
      "Historyczny sukces naszej stypendystki, który zachwycił międzynarodowe jury w Wiedniu.",
    date: "20.10.2025",
    category: "Sukcesy",
    image: "/images/about.jpg",
  },
  {
    id: "3",
    title: "Warsztaty Letnie: Podsumowanie",
    excerpt:
      "Zobacz wideorelację z tygodnia pełnego inspiracji i ciężkiej pracy w Zakopanem.",
    date: "15.09.2025",
    category: "Wydarzenia",
    image: "/images/timeline/2024.jpg",
  },
  {
    id: "4",
    title: "Fundacja w 'Pytaniu na Śniadanie'",
    excerpt:
      "Obejrzyj nagranie z programu, w którym promujemy misję fundacji na antenie ogólnopolskiej.",
    date: "05.09.2025",
    category: "Media",
    image: "/images/timeline/2023.jpg",
  },
  {
    id: "5",
    title: "Nabór do sekcji dętej: Wyniki",
    excerpt:
      "Poznaj nazwiska utalentowanych muzyków, którzy w tym sezonie dołączyli do orkiestry Maxime.",
    date: "01.09.2025",
    category: "Edukacja",
    image: "/images/timeline/2022.jpg",
  },
  {
    id: "6",
    title: "Jak dbać o instrument zimą?",
    excerpt:
      "Praktyczny poradnik lutnika o tym, jak temperatura i wilgotność wpływają na brzmienie.",
    date: "20.08.2025",
    category: "Edukacja",
    image: "/images/hero-poster.jpg",
  },
  {
    id: "7",
    title: "Koncert Charytatywny 'Dla Przyszłości'",
    excerpt:
      "Dzięki hojności darczyńców zebraliśmy rekordową sumę na zakup nowych skrzypiec.",
    date: "12.08.2025",
    category: "Wydarzenia",
    image: "/images/about.jpg",
  },
  {
    id: "8",
    title: "Nowy partner strategiczny fundacji",
    excerpt:
      "Współpraca z bankiem otwiera nowe możliwości finansowania stypendiów zagranicznych.",
    date: "01.08.2025",
    category: "Media",
    image: "/images/timeline/2024.jpg",
  },
  {
    id: "9",
    title: "Masterclass: Pianino z prof. Nowakiem",
    excerpt:
      "Profesor z Berlina poprowadził wyjątkowe lekcje mistrzowskie dla naszych studentów.",
    date: "15.07.2025",
    category: "Edukacja",
    image: "/images/timeline/2023.jpg",
  },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

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

  return (
    <main className="min-h-screen bg-raisinBlack text-white relative selection:bg-arylideYellow selection:text-raisinBlack">
      <div className="container mx-auto px-4 pt-36 pb-20 max-w-7xl">
        {/* --- 1. NAGŁÓWEK --- */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <span className="text-arylideYellow text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-fade-up">
            Blog & Aktualności
          </span>
          <h1 className="font-youngest text-6xl md:text-8xl text-white mb-6 animate-fade-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
            Kronika Fundacji
          </h1>
          <div className="w-24 h-px bg-white/20 mb-6 animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]" />
          <p className="text-philippineSilver text-lg leading-relaxed font-light animate-fade-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
            Śledź nasze działania, sukcesy stypendystów oraz najważniejsze
            wydarzenia ze świata muzyki klasycznej. Bądź częścią naszej
            historii.
          </p>
        </div>

        {/* --- 2. FILTRY --- */}
        <div className="mb-16">
          <div className="border-y border-white/10 py-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Tabs */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={clsx(
                      "text-xs font-bold uppercase tracking-widest transition-all duration-300 relative py-2",
                      activeCategory === cat
                        ? "text-arylideYellow"
                        : "text-philippineSilver hover:text-white",
                    )}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-6.25 lg:-bottom-6.25 left-0 w-full h-0.5 bg-arylideYellow"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-64 group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-arylideYellow transition-colors w-4 h-4" />
                <input
                  type="text"
                  placeholder="Szukaj artykułu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-transparent focus:border-white/20 py-2 pl-7 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors"
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
            </div>
          </div>
        </div>

        {/* --- 3. GRID ARTYKUŁÓW --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {visibleList.length > 0 ? (
              visibleList.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group flex flex-col h-full"
                >
                  <Link
                    href={`/aktualnosci/${item.id}`}
                    className="block h-full flex-col"
                  >
                    {/* ZDJĘCIE (4:3) */}
                    <div className="relative w-full aspect-4/3 overflow-hidden rounded-sm mb-6 bg-white/5 border border-white/5">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay na hover */}
                      <div className="absolute inset-0 bg-raisinBlack/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* TREŚĆ */}
                    <div className="flex-1 flex flex-col">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest mb-3">
                        <span className="text-arylideYellow">
                          {item.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-philippineSilver">
                          {item.date}
                        </span>
                      </div>

                      {/* Tytuł */}
                      <h3 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-3 leading-tight group-hover:text-arylideYellow transition-colors">
                        {item.title}
                      </h3>

                      {/* Krótki opis (1 zdanie, line-clamp-2 dla bezpieczeństwa) */}
                      <p className="text-philippineSilver text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
                        {item.excerpt}
                      </p>

                      {/* Footer Karty */}
                      <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-arylideYellow transition-colors group-hover:translate-x-1 duration-300">
                          Czytaj artykuł <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              // Empty State
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-sm">
                <p className="text-white/40 mb-4">Nie znaleziono wpisów.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("Wszystkie");
                  }}
                  className="text-arylideYellow text-xs font-bold uppercase hover:underline"
                >
                  Wyczyść filtry
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* --- LOAD MORE --- */}
        {hasMore && (
          <div className="mt-20 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="group relative px-8 py-4 bg-transparent border border-white/20 overflow-hidden rounded-full transition-all hover:border-arylideYellow"
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
    </main>
  );
}
