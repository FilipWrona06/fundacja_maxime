// --- START OF FILE CallToAction.tsx ---

"use client";

import { motion, useScroll } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Paralaksa dla tła
  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 bg-raisinBlack overflow-hidden flex items-center justify-center"
    >
      {/* --- TREŚĆ --- */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Mały tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-arylideYellow/20 bg-arylideYellow/5 mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-arylideYellow" />
          <span className="text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase">
            Dołącz do misji
          </span>
        </motion.div>

        {/* Nagłówek */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-youngest text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9]"
        >
          Zmieńmy razem <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-arylideYellow to-white bg-size-[200%_auto] animate-shine">
            przyszłość muzyki
          </span>
        </motion.h2>

        {/* Opis */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-philippineSilver text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
        >
          Niezależnie od tego, czy jesteś słuchaczem, artystą czy mecenasem –
          Twoja obecność ma znaczenie. Napiszmy kolejny rozdział tej symfonii.
        </motion.p>

        {/* PRZYCISKI AKCJI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Główny przycisk - "Magnetic" feel */}
          <Link
            href="/wsparcie"
            className="group relative px-10 py-5 bg-arylideYellow text-raisinBlack font-bold text-sm tracking-widest uppercase rounded-sm overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-3">
              Wesprzyj nas <ArrowRight className="w-5 h-5" />
            </span>
          </Link>

          {/* Drugorzędny przycisk */}
          <Link
            href="/kontakt"
            className="group px-10 py-5 bg-transparent border border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-white hover:text-raisinBlack hover:border-white transition-all duration-300"
          >
            Skontaktuj się
          </Link>
        </motion.div>
      </div>

      {/* Dolna krawędź dekoracyjna */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};
