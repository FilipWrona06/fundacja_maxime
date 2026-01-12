"use client";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Definicja typów zgodna z Sanity
interface PartnerItem {
  _key: string;
  name: string;
  // ZMIANA: Zamiast 'any' używamy precyzyjnego typu
  logo?: SanityImageSource;
}

interface PartnersProps {
  data?: {
    eyebrow?: string;
    title?: string;
    items?: PartnerItem[];
    settings?: {
      speed?: number;
      direction?: "left" | "right";
    };
  };
}

export const Partners = ({ data }: PartnersProps) => {
  // Fallbacki (Wartości domyślne)
  const {
    eyebrow = "Zaufanie",
    title = "Współpracowaliśmy z:",
    items = [],
    settings,
  } = data || {};

  const speed = settings?.speed || 60;
  const direction = settings?.direction || "left";

  // Jeśli nie ma elementów w Sanity, nie renderuj sekcji
  if (!items || items.length === 0) return null;

  // Dublujemy tablicę 4 razy, aby zapewnić płynną pętlę bez przerw
  const marqueeItems = [...items, ...items, ...items, ...items].map(
    (item, index) => ({
      ...item,
      uniqueId: `${item._key}-${index}`,
    }),
  );

  // Logika kierunku
  const initialX = direction === "left" ? "0%" : "-50%";
  const animateX = direction === "left" ? "-50%" : "0%";

  return (
    <section className="py-16 bg-raisinBlack overflow-hidden relative">
      {/* Nagłówek sekcji */}
      <div className="container mx-auto px-4 mb-10 text-center animate-fade-up">
        {eyebrow && (
          <span className="text-arylideYellow/60 text-xs font-bold tracking-[0.3em] uppercase block mb-2">
            {eyebrow}
          </span>
        )}
        {title && (
          <h3 className="text-philippineSilver font-montserrat text-sm uppercase tracking-widest">
            {title}
          </h3>
        )}
      </div>

      {/* --- Pasek z gradientami (Fade Effect) --- */}
      {/* ZMIANA: max-w-[1920px] -> max-w-480 (zgodnie z sugestią Tailwinda) */}
      <div className="relative w-full max-w-480 mx-auto">
        {/* Lewy gradient */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-linear-to-r from-raisinBlack to-transparent z-10 pointer-events-none" />

        {/* Prawy gradient */}
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-linear-to-l from-raisinBlack to-transparent z-10 pointer-events-none" />

        {/* --- INFINITE MARQUEE --- */}
        <div className="flex overflow-hidden select-none">
          <motion.div
            className="flex gap-12 md:gap-24 items-center whitespace-nowrap min-w-full"
            initial={{ x: initialX }}
            animate={{ x: animateX }}
            transition={{
              duration: speed,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((item) => (
              <div
                key={item.uniqueId}
                className="group relative flex items-center justify-center shrink-0"
              >
                {item.logo ? (
                  // Wariant: LOGO
                  // ZMIANA: min-w-[100px] -> min-w-25
                  <div className="relative h-12 w-auto min-w-25 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                    <Image
                      src={urlFor(item.logo).url()}
                      alt={item.name}
                      width={200}
                      height={100}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                ) : (
                  // Wariant: TEKST
                  <span className="text-xl md:text-2xl font-youngest text-white/30 group-hover:text-arylideYellow transition-colors duration-300 cursor-default">
                    {item.name}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
