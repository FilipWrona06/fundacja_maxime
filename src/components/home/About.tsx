"use client";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Lightbulb,
  Music2,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

// --- MAPOWANIE IKON ---
const iconMap: Record<string, React.ElementType> = {
  music: Music2,
  trending: TrendingUp,
  users: Users,
  heart: Heart,
  star: Star,
  lightbulb: Lightbulb,
};

// --- TYPY ---
interface ValueItem {
  _key: string;
  title: string;
  description: string;
  icon: string;
}

interface AboutProps {
  data?: {
    image?: SanityImageSource;
    eyebrow?: string;
    headingLine1?: string;
    headingLine2?: string;
    description?: string;
    values?: ValueItem[];
    ctaLink?: string;
    ctaText?: string;
  };
}

export const About = ({ data }: AboutProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    image,
    eyebrow = "O fundacji",
    headingLine1 = "Tworzymy przestrzeń",
    headingLine2 = "dla dźwięków i ludzi",
    description = "Stowarzyszenie Maxime to więcej niż muzyka...",
    values = [],
    ctaLink = "/o-nas",
    ctaText = "POZNAJ NAS BLIŻEJ",
  } = data || {};

  const hasValues = values.length > 0;

  useEffect(() => {
    if (!hasValues) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hasValues, values.length]);

  const imageUrl = image ? urlFor(image).url() : "/images/about.jpg";

  return (
    <section className="relative py-24 md:py-32 bg-raisinBlack overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* --- LEWA STRONA: ZDJĘCIE --- */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-arylideYellow/10 blur-[80px] rounded-full pointer-events-none" />

            {/* POPRAWKA: Usunięto nowe linie w className, aby naprawić Hydration Error */}
            <div className="absolute inset-0 border border-white/20 rounded-sm translate-x-4 translate-y-4 z-0 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-arylideYellow" />

            <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm shadow-2xl bg-[#1a1a1a] z-10">
              <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={imageUrl}
                  alt="O fundacji"
                  fill
                  className="object-cover"
                  priority
                  style={{ filter: "saturate(1.05)" }}
                />
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-sm" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mixed-blend-overlay" />
            </div>
          </div>

          {/* --- PRAWA STRONA: TREŚĆ --- */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {/* Górna część */}
            <div>
              <span className="inline-block text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-4 pl-1 animate-fade-up">
                {eyebrow}
              </span>
              <h2 className="font-youngest text-5xl md:text-6xl text-white mb-8 leading-tight">
                {headingLine1} <br />
                <span className="text-philippineSilver/50">{headingLine2}</span>
              </h2>
              <p className="text-philippineSilver text-lg leading-relaxed mb-12 font-light">
                {description}
              </p>
            </div>

            {/* --- ZMIENIAJĄCA SIĘ SEKCJA WARTOŚCI --- */}
            {hasValues && (
              <div className="border-t border-white/10 pt-10 min-h-55 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={values[activeIndex]._key || activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {(() => {
                        const iconName = values[activeIndex].icon || "music";
                        const IconComponent = iconMap[iconName] || Music2;
                        return (
                          <div className="p-3 rounded-full bg-white/5 border border-white/10 text-arylideYellow shrink-0">
                            <IconComponent
                              className="w-6 h-6"
                              strokeWidth={1.5}
                            />
                          </div>
                        );
                      })()}
                      <h3 className="text-2xl text-white font-montserrat font-bold tracking-wide">
                        {values[activeIndex].title}
                      </h3>
                    </div>

                    <p className="text-philippineSilver/80 text-base leading-relaxed max-w-xl pl-18">
                      {values[activeIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Paski postępu */}
                <div className="flex gap-3 mt-8 pl-18">
                  {values.map((item, idx) => (
                    <button
                      type="button"
                      key={item._key}
                      onClick={() => setActiveIndex(idx)}
                      className="relative h-1 w-12 bg-white/10 rounded-full overflow-hidden group hover:h-1.5 transition-all"
                    >
                      <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                      {activeIndex === idx && (
                        <motion.div
                          layoutId="active-progress-about"
                          className="absolute inset-0 bg-arylideYellow h-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Link */}
            <div className="mt-10">
              <Link
                href={ctaLink}
                className="group inline-flex items-center gap-2 text-white hover:text-arylideYellow transition-colors"
              >
                <span className="text-sm font-bold tracking-widest border-b border-white/20 pb-1 group-hover:border-arylideYellow">
                  {ctaText}
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
