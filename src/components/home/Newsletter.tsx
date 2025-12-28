// --- START OF FILE Newsletter.tsx ---

"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export const Newsletter = () => {
  return (
    <section className="py-20 bg-raisinBlack relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-sm border border-white/10 bg-white/5 p-8 md:p-12 overflow-hidden"
        >
          {/* Dekoracyjne tło wewnątrz kontenera */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-arylideYellow/5 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Tekst zachęty */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 text-arylideYellow">
                <Mail className="w-5 h-5" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">
                  Bądź na bieżąco
                </span>
              </div>
              <h3 className="font-youngest text-3xl md:text-4xl text-white mb-4">
                Nie przegap pierwszych taktów
              </h3>
              <p className="text-philippineSilver text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                Dołącz do naszego newslettera. Otrzymuj informacje o premierach
                koncertów, ekskluzywne zaproszenia i wieści z życia fundacji.
                Zero spamu, sama muzyka.
              </p>
            </div>

            {/* Formularz */}
            <div className="w-full lg:w-1/2">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Twój adres email..."
                  className="flex-1 bg-raisinBlack/50 border border-white/10 text-white px-6 py-4 rounded-sm focus:outline-none focus:border-arylideYellow/50 transition-all placeholder:text-white/20"
                />
                <button
                  type="button"
                  className="group px-8 py-4 bg-white text-raisinBlack font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-arylideYellow transition-colors flex items-center justify-center gap-2"
                >
                  Zapisz się
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
              <p className="text-white/20 text-[10px] mt-4 text-center sm:text-left">
                Klikając przycisk, akceptujesz naszą politykę prywatności.
                Możesz wypisać się w każdej chwili.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
