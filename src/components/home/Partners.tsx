"use client";

import { motion } from "framer-motion";

// Lista instytucji
const partnersList = [
  "Ministerstwo Kultury",
  "Filharmonia Śląska",
  "Narodowa Orkiestra Symfoniczna",
  "Miasto Katowice",
  "Akademia Muzyczna",
  "Polskie Radio",
  "TVP Kultura",
  "Związek Artystów Wykonawców",
  "Fundacja Orlen",
  "Lotto",
  "RMF Classic",
  "Instytut Muzyki i Tańca",
];

// Dublujemy tablicę 4 razy i mapujemy na obiekty z unikalnym ID
// Rozwiązuje to problem "noArrayIndexKey", bo ID jest generowane raz, statycznie
const marqueeItems = [
  ...partnersList,
  ...partnersList,
  ...partnersList,
  ...partnersList,
].map((partner, index) => ({
  id: `${partner}-${index}`, // Unikalny klucz
  name: partner,
}));

export const Partners = () => {
  return (
    <section className="py-16 bg-raisinBlack overflow-hidden relative">
      {/* Nagłówek sekcji */}
      <div className="container mx-auto px-4 mb-10 text-center">
        <span className="text-arylideYellow/60 text-xs font-bold tracking-[0.3em] uppercase block mb-2">
          Zaufanie
        </span>
        <h3 className="text-philippineSilver font-montserrat text-sm uppercase tracking-widest">
          Współpracowaliśmy z:
        </h3>
      </div>

      {/* --- Pasek z gradientami (Fade Effect) --- */}
      <div className="relative w-full max-w-480 mx-auto">
        {/* Lewy gradient */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-linear-to-r from-raisinBlack to-transparent z-10 pointer-events-none" />

        {/* Prawy gradient */}
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-linear-to-l from-raisinBlack to-transparent z-10 pointer-events-none" />

        {/* --- INFINITE MARQUEE --- */}
        <div className="flex overflow-hidden select-none">
          <motion.div
            className="flex gap-12 md:gap-24 items-center whitespace-nowrap min-w-full"
            // Animacja przesuwania
            animate={{ x: "-50%" }}
            initial={{ x: "0%" }}
            transition={{
              duration: 60, // Im większa liczba, tym wolniej jedzie
              ease: "linear",
              repeat: Infinity, // Pętla nieskończona
            }}
          >
            {marqueeItems.map((item) => (
              <div
                // Używamy bezpiecznego ID z obiektu, a nie indeksu pętli
                key={item.id}
                className="group relative flex items-center justify-center"
              >
                <span className="text-xl md:text-2xl font-youngest text-white/30 group-hover:text-arylideYellow transition-colors duration-300 cursor-default">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
