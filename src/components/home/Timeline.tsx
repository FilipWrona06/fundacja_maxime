"use client";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

// --- TYPY ---
interface TimelineItem {
  _key: string;
  year: string;
  title: string;
  description: string;
  image: SanityImageSource;
}

interface TimelineProps {
  data?: {
    items?: TimelineItem[];
    settings?: {
      height?: string;
    };
  };
}

export const Timeline = ({ data }: TimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback data
  const items = data?.items || [];
  const height = data?.settings?.height || "300vh";

  // Przechowujemy timer do debouncingu
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Jeśli nie ma elementów, nie robimy nic
    if (items.length === 0) return;

    // 1. OBLICZ NOWY INDEKS (bezpiecznie)
    const rawIndex = Math.floor(latest * items.length);
    const newIndex = Math.max(0, Math.min(rawIndex, items.length - 1));

    if (newIndex === activeIndex) return;

    // 2. LOGIKA PRZY SZYBKIM SCROLLU
    if (latest <= 0.05) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      setActiveIndex(0);
      return;
    }

    // 3. DEBOUNCE
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setActiveIndex(newIndex);
    }, 50);
  });

  const handleScrollTo = (index: number) => {
    if (!containerRef.current || items.length === 0) return;

    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableHeight = containerHeight - windowHeight;
    const targetScroll =
      containerTop + (index / items.length) * scrollableHeight + 10;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // --- FIX: Usuwamy wczesny "return null", aby ref zawsze się zapiął ---
  const hasItems = items.length > 0;
  const currentItem = hasItems ? items[activeIndex] || items[0] : null;
  const imageUrl = currentItem?.image ? urlFor(currentItem.image).url() : "";

  return (
    <section
      ref={containerRef}
      className="relative bg-raisinBlack"
      // Jeśli brak itemów, ustawiamy wysokość na 0 i ukrywamy, ale element istnieje w DOM
      style={{
        height: hasItems ? height : 0,
        display: hasItems ? "block" : "none",
      }}
    >
      {hasItems && currentItem && (
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* --- LEWA STRONA (Tekst) --- */}
            <div className="w-full md:w-1/2 flex flex-row gap-8 items-center md:items-start justify-center md:justify-start">
              {/* Lista roczników */}
              <div className="hidden md:flex flex-col gap-12 py-4 border-l border-white/10 pl-8 relative">
                {items.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div key={item._key} className="relative flex items-center">
                      {isActive && (
                        <motion.div
                          layoutId="timeline-dot"
                          className="absolute -left-[2.4rem] w-3 h-3 bg-arylideYellow rounded-full shadow-[0_0_10px_#EFCB6F]"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => handleScrollTo(idx)}
                        className={`text-lg font-youngest transition-colors duration-300 text-left cursor-pointer hover:text-arylideYellow/80 ${
                          isActive
                            ? "text-arylideYellow"
                            : "text-philippineSilver/30"
                        }`}
                      >
                        {item.year}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Treść aktywna */}
              <div className="flex-1 max-w-md min-h-75 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem._key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <span className="md:hidden text-arylideYellow font-youngest text-4xl mb-4 mt-20 block">
                      {currentItem.year}
                    </span>
                    <h2 className="text-3xl md:text-5xl text-white font-montserrat font-bold mb-6">
                      {currentItem.title}
                    </h2>
                    <p className="text-philippineSilver text-lg leading-relaxed">
                      {currentItem.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* --- PRAWA STRONA (Zdjęcie) --- */}
            <div className="w-full md:w-1/2 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem._key}
                  initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.05, rotate: -2 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="relative w-full max-w-md aspect-4/5"
                >
                  <div className="absolute inset-0 border border-white/20 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 z-0" />
                  <div className="relative w-full h-full overflow-hidden bg-raisinBlack z-10 shadow-2xl">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={currentItem.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/60 to-transparent opacity-60" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
