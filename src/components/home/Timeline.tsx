"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const timelineData = [
  {
    year: "2022",
    title: "Początek Harmonii",
    description:
      "Rok powstania fundacji. Pierwsze spotkania, formowanie zespołu i marzenie o stworzeniu przestrzeni, gdzie muzyka łączy pokolenia. Pierwszy kameralny koncert w lokalnym domu kultury.",
    image: "/images/timeline/2022.jpg",
  },
  {
    year: "2023",
    title: "Pierwsze Sukcesy",
    description:
      "Rozszerzenie działalności o warsztaty dla młodzieży. Nasza orkiestra powiększyła się dwukrotnie. Zagraliśmy cykl koncertów 'Lato z Klasyką', zdobywając serca lokalnej publiczności.",
    image: "/images/timeline/2023.jpg",
  },
  {
    year: "2024",
    title: "Nowe Horyzonty",
    description:
      "Współpraca z międzynarodowymi solistami i nagranie pierwszej płyty demo. Fundacja otrzymała prestiżowe wyróżnienie za wkład w rozwój kultury regionalnej.",
    image: "/images/timeline/2024.jpg",
  },
  {
    year: "2025",
    title: "Przyszłość Brzmienia",
    description:
      "Otwarcie nowej sali prób i uruchomienie programu stypendialnego dla wybitnie uzdolnionych dzieci. Patrzymy w przyszłość z odwagą, planując trasę koncertową po całej Polsce.",
    image: "/images/timeline/2025.jpg",
  },
  {
    year: "2026",
    title: "Międzynarodowe Echa",
    description:
      "Planujemy naszą pierwszą współpracę z zagranicznymi orkiestrami oraz festiwal muzyki filmowej. Chcemy, aby dźwięki Maxime zabrzmiały poza granicami kraju, promując polską kulturę.",
    image: "/images/timeline/2026.jpg",
  },
];

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(
        Math.floor(latest * timelineData.length),
        timelineData.length - 1,
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Funkcja przewijania do roku po kliknięciu
  const handleScrollTo = (index: number) => {
    if (!containerRef.current) return;

    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableHeight = containerHeight - windowHeight;
    const targetScroll =
      containerTop + (index / timelineData.length) * scrollableHeight + 10;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-raisinBlack">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* --- LEWA STRONA --- */}
          <div className="w-full md:w-1/2 flex flex-row gap-8 items-center md:items-start justify-center md:justify-start">
            {/* Oś czasu (Lista) */}
            <div className="hidden md:flex flex-col gap-12 py-4 border-l border-white/10 pl-8 relative">
              {timelineData.map((item, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div key={item.year} className="relative flex items-center">
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

            {/* Treść */}
            <div className="flex-1 max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={timelineData[activeIndex].year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <span className="md:hidden text-arylideYellow font-youngest text-4xl mb-4 block">
                    {timelineData[activeIndex].year}
                  </span>

                  <h2 className="text-3xl md:text-5xl text-white font-montserrat font-bold mb-6">
                    {timelineData[activeIndex].title}
                  </h2>
                  <p className="text-philippineSilver text-lg leading-relaxed">
                    {timelineData[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* --- PRAWA STRONA --- */}
          <div className="w-full md:w-1/2 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={timelineData[activeIndex].year}
                initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotate: -2 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="relative w-full max-w-md aspect-4/5"
              >
                <div className="absolute inset-0 border border-white/20 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 z-0" />

                <div className="relative w-full h-full overflow-hidden bg-raisinBlack z-10 shadow-2xl">
                  <Image
                    src={timelineData[activeIndex].image}
                    alt={timelineData[activeIndex].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/60 to-transparent opacity-60" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};