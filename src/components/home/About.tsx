"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Music2, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Dane wyciągnięte poza komponent
const values = [
  {
    id: 0,
    icon: Music2,
    title: "Talent",
    description:
      "Odkrywamy i szlifujemy diamenty. Tworzymy środowisko, w którym młodzi artyści mogą rozwinąć skrzydła pod okiem mistrzów.",
  },
  {
    id: 1,
    icon: TrendingUp,
    title: "Ambicja",
    description:
      "Stawiamy sobie wysokie cele artystyczne. Nie zadowalamy się przeciętnością, dążąc do doskonałości w każdym dźwięku.",
  },
  {
    id: 2,
    icon: Users,
    title: "Profesjonalizm",
    description:
      "Dbamy o każdy detal naszych realizacji. Od pierwszej próby po ostatni ukłon, wszystko musi być dopięte na ostatni guzik.",
  },
];

export const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatyczna zmiana co 5 sekund
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
    }, 5000); // 5000ms = 5 sekund

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-raisinBlack overflow-hidden">

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* --- LEWA STRONA: ZDJĘCIE --- */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 border-2 border-arylideYellow/30 translate-x-4 translate-y-4 rounded-sm transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm grayscale-20 group-hover:grayscale-0 transition-all duration-700">
              <Image
                src="/images/about.jpg"
                alt="Orkiestra Maxime"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-raisinBlack/10 mix-blend-multiply" />
            </div>
          </div>

          {/* --- PRAWA STRONA: TREŚĆ --- */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {/* Górna część stała */}
            <div>
              <span className="inline-block text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-4 pl-1">
                O fundacji
              </span>
              <h2 className="font-youngest text-5xl md:text-6xl text-white mb-8 leading-tight">
                Tworzymy przestrzeń <br />
                <span className="text-philippineSilver/50">
                  dla dźwięków i ludzi
                </span>
              </h2>
              <p className="text-philippineSilver text-lg leading-relaxed mb-12 font-light">
                Stowarzyszenie Maxime to więcej niż muzyka. To społeczność,
                która wierzy, że talent wymaga pielęgnacji, a pasja – sceny.
              </p>
            </div>

            {/* --- ZMIENIAJĄCA SIĘ SEKCJA WARTOŚCI --- */}
            {/* Zmieniono min-h-[220px] na min-h-55 */}
            <div className="border-t border-white/10 pt-10 min-h-55 flex flex-col justify-between">
              {/* Animowana treść */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col gap-4"
                >
                  {/* Ikona i Tytuł */}
                  <div className="flex items-center gap-4">
                    {(() => {
                      const Icon = values[activeIndex].icon;
                      return (
                        <Icon
                          className="w-10 h-10 text-arylideYellow"
                          strokeWidth={1.5}
                        />
                      );
                    })()}
                    <h3 className="text-3xl text-white font-montserrat font-bold tracking-wide">
                      {values[activeIndex].title}
                    </h3>
                  </div>

                  {/* Opis */}
                  <p className="text-philippineSilver/80 text-base leading-relaxed max-w-md">
                    {values[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Paski postępu (Sterowanie) */}
              <div className="flex gap-3 mt-8">
                {values.map((item, idx) => (
                  <button
                    type="button" // Dodano type="button"
                    key={item.id}
                    onClick={() => setActiveIndex(idx)} // Możliwość ręcznego kliknięcia
                    className="relative h-1 flex-1 bg-white/10 rounded-full overflow-hidden group"
                  >
                    {/* Tło paska */}
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />

                    {/* Wypełnienie paska (aktywne) */}
                    {activeIndex === idx && (
                      <motion.div
                        layoutId="active-progress"
                        className="absolute inset-0 bg-arylideYellow h-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }} // Musi być zgodne z setInterval
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Link */}
            <div className="mt-10">
              <Link
                href="/o-nas"
                className="group inline-flex items-center gap-2 text-white hover:text-arylideYellow transition-colors"
              >
                <span className="text-sm font-bold tracking-widest border-b border-white/20 pb-1 group-hover:border-arylideYellow">
                  POZNAJ NAS BLIŻEJ
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
