"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Copy, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export const Support = () => {
  const [copied, setCopied] = useState(false);
  const krsNumber = "0000123456";
  const containerRef = useRef(null);

  // Paralaksa dla tła (subtelny ruch)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const handleCopyKrs = () => {
    navigator.clipboard.writeText(krsNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-raisinBlack overflow-hidden"
    >
      {/* TŁO: Organiczna mgła (Wabi-sabi ambiance) */}
      {/* ZMIANA: w-[800px] -> w-200, h-[800px] -> h-200 */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-200 h-200 bg-arylideYellow/5 blur-[150px] rounded-full pointer-events-none opacity-60"
      />

      {/* ZMIANA: max-w-[1400px] -> max-w-350 */}
      <div className="container mx-auto px-6 max-w-350 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* --- LEWA STRONA (STICKY - WIZUALNA) --- */}
          <div className="relative hidden lg:block">
            <div className="sticky top-32 h-[calc(100vh-10rem)] flex flex-col justify-center">
              {/* Tekst wprowadzający */}
              <div className="mb-16 relative z-20">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-arylideYellow text-[10px] font-bold tracking-[0.4em] uppercase block mb-6"
                >
                  Zaangażowanie
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-youngest text-7xl xl:text-8xl text-white leading-[0.8] mb-8"
                >
                  Wspieraj <br />
                  <span className="text-white/20 italic">piękno.</span>
                </motion.h2>
                <p className="text-philippineSilver font-light leading-loose max-w-sm border-l border-white/10 pl-6">
                  Każdy gest ma znaczenie. Twoje wsparcie pozwala nam
                  pielęgnować talenty, które w przyszłości poruszą świat.
                </p>
              </div>

              {/* Kompozycja zdjęć (Asymetryczna, "niedoskonała") */}
              {/* ZMIANA: max-w-[450px] -> max-w-112.5, aspect-[4/5] -> aspect-4/5 */}
              <div className="relative w-full max-w-112.5 aspect-4/5">
                {/* Zdjęcie 1 - Główne */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 z-10 overflow-hidden"
                >
                  <Image
                    src="/images/hero-poster.jpg"
                    alt="Koncert"
                    fill
                    className="object-cover grayscale opacity-80"
                  />
                  {/* Delikatny szum na zdjęciu */}
                  <div className="absolute inset-0 bg-raisinBlack/20 mix-blend-multiply" />
                </motion.div>

                {/* Zdjęcie 2 - Akcent (Przesunięte i lekko obrócone) */}
                <motion.div
                  initial={{ opacity: 0, x: 20, rotate: 0 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute -bottom-12 -right-12 w-2/3 h-2/3 z-20 overflow-hidden shadow-2xl border border-white/5"
                >
                  <Image
                    src="/images/about.jpg"
                    alt="Edukacja"
                    fill
                    className="object-cover grayscale brightness-110"
                  />
                </motion.div>

                {/* Złota Linia (Kintsugi) */}
                <div className="absolute -left-8 top-1/2 w-24 h-px bg-arylideYellow/50 z-30" />
              </div>
            </div>
          </div>

          {/* --- PRAWA STRONA (SCROLL - TREŚĆ) --- */}
          <div className="flex flex-col pt-12 lg:pt-32 pb-24">
            {/* Header mobilny */}
            <div className="lg:hidden mb-16">
              <h2 className="font-youngest text-5xl text-white leading-[0.9] mb-4">
                Wspieraj piękno.
              </h2>
              <p className="text-philippineSilver font-light text-sm">
                Wybierz formę pomocy i stań się częścią naszej misji.
              </p>
            </div>

            {/* --- LISTA OPCJI (Minimalistyczna) --- */}
            <div className="space-y-24">
              {/* 01. PODATEK (KRS) */}
              <div className="group relative">
                <span className="text-white/20 font-mono text-sm tracking-widest mb-2 block">
                  01
                </span>
                <h3 className="text-3xl md:text-4xl font-montserrat font-light text-white mb-6">
                  Przekaż{" "}
                  <span className="font-serif italic text-arylideYellow">
                    1.5%
                  </span>{" "}
                  podatku
                </h3>
                <p className="text-philippineSilver/60 text-sm leading-relaxed max-w-md mb-8 group-hover:text-philippineSilver transition-colors duration-500">
                  Wpisz nasz numer w deklaracji. To najprostsza forma mecenatu,
                  która nic Cię nie kosztuje, a nam daje wolność tworzenia.
                </p>

                {/* Elegancki Box KRS */}
                {/* ZMIANA: Dodano type="button" */}
                <button
                  type="button"
                  onClick={handleCopyKrs}
                  className="relative flex items-center justify-between w-full max-w-md border-b border-white/20 py-4 group/btn hover:border-arylideYellow transition-colors duration-500"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] uppercase text-white/30 tracking-widest mb-1">
                      Numer KRS
                    </span>
                    <span className="font-mono text-2xl text-white tracking-widest group-hover/btn:text-arylideYellow transition-colors duration-300">
                      {krsNumber}
                    </span>
                  </div>

                  <div className="text-white/30 group-hover/btn:text-white transition-colors">
                    {copied ? (
                      <Check className="w-5 h-5 text-arylideYellow" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </div>

                  {/* Subtelny feedback */}
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute right-0 -top-8 text-[10px] text-arylideYellow uppercase tracking-widest font-bold"
                    >
                      Skopiowano
                    </motion.span>
                  )}
                </button>
              </div>

              {/* 02. PATRONITE */}
              <div className="group relative">
                <span className="text-white/20 font-mono text-sm tracking-widest mb-2 block">
                  02
                </span>
                <h3 className="text-3xl md:text-4xl font-montserrat font-light text-white mb-6">
                  Zostań{" "}
                  <span className="font-serif italic text-white/80 group-hover:text-arylideYellow transition-colors">
                    Mecenasem
                  </span>
                </h3>
                <p className="text-philippineSilver/60 text-sm leading-relaxed max-w-md mb-8 group-hover:text-philippineSilver transition-colors duration-500">
                  Dołącz do społeczności na Patronite. Regularne wsparcie
                  pozwala nam planować długofalowo i zamawiać nowe kompozycje.
                </p>

                <Link
                  href="https://patronite.pl"
                  target="_blank"
                  className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 group/link"
                >
                  Zobacz progi
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* 03. BIZNES */}
              <div className="group relative">
                <span className="text-white/20 font-mono text-sm tracking-widest mb-2 block">
                  03
                </span>
                <h3 className="text-3xl md:text-4xl font-montserrat font-light text-white mb-6">
                  Partnerstwo{" "}
                  <span className="font-serif italic text-white/80 group-hover:text-arylideYellow transition-colors">
                    Biznesowe
                  </span>
                </h3>
                <p className="text-philippineSilver/60 text-sm leading-relaxed max-w-md mb-8 group-hover:text-philippineSilver transition-colors duration-500">
                  Zbuduj wizerunek firmy odpowiedzialnej społecznie. Oferujemy
                  pakiety sponsorskie i koncerty dedykowane dla Twoich klientów.
                </p>

                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 group/link"
                >
                  Skontaktuj się
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
