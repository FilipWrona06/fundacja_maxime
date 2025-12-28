// --- START OF FILE Support.tsx ---

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Copy, FileHeart, Heart, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const supportOptions = [
  {
    id: 1,
    icon: Heart,
    title: "Zostań Mecenasem",
    desc: "Twoje regularne wsparcie pozwala nam planować długofalowy rozwój stypendystów i zakup instrumentów.",
    link: "/wsparcie",
    linkText: "Wspieram on-line",
    highlight: false,
  },
  {
    id: 2,
    icon: FileHeart,
    title: "Przekaż 1.5% Podatku",
    desc: "Nic Cię to nie kosztuje, a dla nas znaczy wszystko. Wpisz nasz numer KRS w swojej deklaracji podatkowej.",
    // Specjalne pole dla tej karty (KRS)
    krs: "0000123456",
    highlight: true, // Ta karta będzie się wyróżniać
  },
  {
    id: 3,
    icon: Users,
    title: "Wolontariat",
    desc: "Chcesz zobaczyć orkiestrę od kulis? Dołącz do zespołu organizacyjnego i twórz z nami wydarzenia.",
    link: "/kontakt",
    linkText: "Dołącz do nas",
    highlight: false,
  },
];

export const Support = () => {
  // Stan do obsługi kopiowania KRS
  const [copied, setCopied] = useState(false);

  const handleCopyKrs = (krs: string) => {
    if (!krs) return; // Zabezpieczenie
    navigator.clipboard.writeText(krs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-24 md:py-32 bg-raisinBlack overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Nagłówek */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase block mb-4">
            Wspólna Misja
          </span>
          <h2 className="font-youngest text-4xl md:text-6xl text-white mb-6 leading-tight">
            Twój gest, ich <span className="text-white/20">przyszłość</span>
          </h2>
          <p className="text-philippineSilver text-lg font-light">
            Fundacja Maxime istnieje dzięki ludziom, którzy rozumieją, że
            kultura wymaga pielęgnacji. Zobacz, jak możesz pomóc.
          </p>
        </div>

        {/* Grid Kart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {supportOptions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`group relative flex flex-col p-8 rounded-sm border transition-all duration-300 hover:-translate-y-1
                ${
                  item.highlight
                    ? "bg-white/5 border-arylideYellow/30 hover:border-arylideYellow hover:shadow-[0_0_30px_rgba(239,203,111,0.1)]"
                    : "bg-white/5 border-white/10 hover:border-white/30"
                }
              `}
            >
              {/* Ikona */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110
                ${
                  item.highlight
                    ? "bg-arylideYellow text-raisinBlack"
                    : "bg-white/10 text-white group-hover:bg-white group-hover:text-raisinBlack"
                }
              `}
              >
                <item.icon strokeWidth={1.5} className="w-7 h-7" />
              </div>

              {/* Treść */}
              <h3 className="text-2xl font-montserrat font-bold text-white mb-4">
                {item.title}
              </h3>
              <p className="text-philippineSilver/80 mb-8 leading-relaxed flex-1">
                {item.desc}
              </p>

              {/* Footer Karty (Link lub KRS) */}
              <div className="mt-auto">
                {item.krs ? (
                  // Wersja dla KRS (Kliknij by skopiować)
                  <div className="bg-raisinBlack/50 border border-white/10 rounded p-4 flex items-center justify-between group/krs">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-philippineSilver tracking-widest mb-1">
                        Nasz KRS:
                      </span>
                      <span className="text-xl font-bold text-white tracking-wider font-mono">
                        {item.krs}
                      </span>
                    </div>
                    <button
                      type="button" // POPRAWKA: Dodano jawny typ przycisku
                      onClick={() => handleCopyKrs(item.krs ?? "")} // POPRAWKA: Usunięto non-null assertion (!)
                      className="w-10 h-10 flex items-center justify-center rounded bg-white/5 hover:bg-arylideYellow hover:text-raisinBlack transition-colors text-white cursor-pointer"
                      title="Skopiuj numer KRS"
                    >
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                ) : (
                  // Wersja standardowa (Link)
                  <Link
                    // POPRAWKA: Usunięto non-null assertion (!), dodano fallback
                    href={item.link ?? "/"}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-arylideYellow transition-colors"
                  >
                    {item.linkText}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
