"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import BackgroundVideo from "next-video/background-video";
import { useRef } from "react";

import backgroundVideo from "../../../videos/background-video.mp4";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // --- FIZYKA (Bardziej "mięsista") ---
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 80, // Trochę mniejsza sztywność dla łagodniejszego startu
    damping: 20,
    restDelta: 0.001,
  });

  // --- SUBTELNE ZMIANY ---

  // 1. Tło przesuwa się bardzo powoli (tylko 15%) - daje to poczucie, że jest "bardzo daleko"
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);

  // 2. Tekst przesuwa się odrobinę szybciej (25%) - odkleja się od tła, ale nie ucieka z ekranu
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);

  // 3. Opacity: Zaczynamy od 1, kończymy na 0.4 (40% widoczności).
  // Nigdy nie znika całkowicie, tylko lekko przygasa.
  const opacity = useTransform(smoothProgress, [0, 0.9], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-raisinBlack"
    >
      {/* --- MUX VIDEO BACKGROUND --- */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          y: backgroundY,
          // Tło niech zanika trochę mocniej niż tekst, żeby skupić wzrok na treści
          opacity: useTransform(smoothProgress, [0, 0.9], [1, 0.3]),
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(38,38,38,0.4)_0%,rgba(38,38,38,0.75)_100%)]" />

        <BackgroundVideo
          src={backgroundVideo}
          className="w-full h-full object-cover"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            border: "none",
            zIndex: -1,
          }}
        />
      </motion.div>

      {/* --- TREŚĆ --- */}
      <motion.div
        className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center will-change-transform"
        style={{
          y: textY,
          opacity: opacity, // Tekst zanika tylko do 40%
        }}
      >
        {/* Badge */}
        <div className="animate-fade-up">
          <span className="inline-block py-1.5 px-3 rounded-full border border-philippineSilver/30 bg-white/5 backdrop-blur-sm text-philippineSilver text-xs sm:text-[0.8rem] md:text-[0.9rem] font-montserrat tracking-[0.2em]">
            Fundacja Maxime
          </span>
        </div>

        {/* Napis */}
        <h1 className="animate-fade-up delay-200 font-youngest text-[4.78rem] sm:text-[8rem] md:text-[10rem] text-arylideYellow mb-2 drop-shadow-lg leading-tight">
          <span className="block">Z pasji</span>
          <span className="block -mt-2 md:-mt-6">do muzyki</span>
        </h1>

        {/* Opis */}
        <p className="animate-fade-up delay-300 font-montserrat text-[0.97rem] sm:text-[1.05rem] md:text-[1.15rem] max-w-lg leading-relaxed mt-10 mb-10 text-white/90">
          Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia
          poprzez piękno dźwięku.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link
            href="/wydarzenia"
            className="group relative px-8 py-4 rounded-full bg-arylideYellow text-raisinBlack font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] w-auto min-w-55 text-center"
          >
            <span className="relative z-10">Zobacz wydarzenia</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Link>

          <Link
            href="/kontakt"
            className="group px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-medium text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-raisinBlack hover:border-white w-auto min-w-55 text-center"
          >
            Skontaktuj się
          </Link>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
        // Strzałka znika szybciej, bo nie jest potrzebna jak już scrollujemy
        style={{ opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]) }}
      >
        <ChevronDown className="w-10 h-10 text-white/75" strokeWidth={1} />
      </motion.div>
    </section>
  );
};
