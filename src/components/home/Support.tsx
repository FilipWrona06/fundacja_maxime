"use client";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextBlock, // <--- NOWY IMPORT TYPU
  type PortableTextComponents,
} from "next-sanity";
import { useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

// --- TYPY ---
interface SupportOption {
  _key: string;
  number: string;
  // ZMIANA: Zamiast 'any' używamy poprawnego typu Sanity
  title: PortableTextBlock[];
  text: string;
  actionType: "copy" | "external" | "internal";
  copyValue?: string;
  copyLabel?: string;
  linkUrl?: string;
  linkLabel?: string;
}

interface SupportProps {
  data?: {
    eyebrow?: string;
    // ZMIANA: Zamiast 'any' używamy poprawnego typu Sanity
    heading?: PortableTextBlock[];
    description?: string;
    mainImage?: SanityImageSource;
    accentImage?: SanityImageSource;
    options?: SupportOption[];
  };
}

// --- PORTABLE TEXT COMPONENTS ---
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: {
    highlight: ({ children }) => (
      <span className="font-serif italic text-arylideYellow">{children}</span>
    ),
    strong: ({ children }) => (
      <span className="font-serif italic text-white/80 group-hover:text-arylideYellow transition-colors">
        {children}
      </span>
    ),
  },
};

export const Support = ({ data }: SupportProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const containerRef = useRef(null);

  const {
    eyebrow = "Zaangażowanie",
    heading,
    description,
    mainImage,
    accentImage,
    options = [],
  } = data || {};

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const handleCopy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const hasOptions = options.length > 0;

  if (!hasOptions) {
    return <section ref={containerRef} className="hidden" />;
  }

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-raisinBlack overflow-hidden"
    >
      {/* TŁO */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-200 h-200 bg-arylideYellow/5 blur-[150px] rounded-full pointer-events-none opacity-60"
      />

      <div className="container mx-auto px-6 max-w-350 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* --- LEWA STRONA (STICKY) --- */}
          <div className="relative hidden lg:block">
            <div className="sticky top-32 h-[calc(100vh-10rem)] flex flex-col justify-center">
              <div className="mb-16 relative z-20">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-arylideYellow text-[10px] font-bold tracking-[0.4em] uppercase block mb-6"
                >
                  {eyebrow}
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-youngest text-7xl xl:text-8xl text-white leading-[0.8] mb-8"
                >
                  {heading ? (
                    <PortableText value={heading} components={components} />
                  ) : (
                    <h2>
                      Wspieraj{" "}
                      <span className="font-serif italic text-white/20">
                        piękno.
                      </span>
                    </h2>
                  )}
                </motion.div>

                <p className="text-philippineSilver font-light leading-loose max-w-sm border-l border-white/10 pl-6">
                  {description}
                </p>
              </div>

              {/* KOMPOZYCJA ZDJĘĆ */}
              <div className="relative w-full max-w-112.5 aspect-4/5">
                {/* Obrazek Główny */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 z-10 overflow-hidden bg-[#222]"
                >
                  {mainImage ? (
                    <Image
                      src={urlFor(mainImage).url()}
                      alt="Main visual"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/10 bg-linear-to-br from-white/5 to-transparent border border-white/10">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <span className="text-xs uppercase tracking-widest">
                        Brak zdjęcia głównego
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Obrazek Akcentowy */}
                <motion.div
                  initial={{ opacity: 0, x: 20, rotate: 0 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute -bottom-12 -right-12 w-2/3 h-2/3 z-20 overflow-hidden shadow-2xl border border-white/5 bg-[#1a1a1a]"
                >
                  {accentImage ? (
                    <Image
                      src={urlFor(accentImage).url()}
                      alt="Accent visual"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/10 bg-linear-to-tl from-arylideYellow/10 to-transparent">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <span className="text-[10px] uppercase tracking-widest text-center px-2">
                        Brak zdjęcia małego
                      </span>
                    </div>
                  )}
                </motion.div>

                <div className="absolute -left-8 top-1/2 w-24 h-px bg-arylideYellow/50 z-30" />
              </div>
            </div>
          </div>

          {/* --- PRAWA STRONA --- */}
          <div className="flex flex-col pt-12 lg:pt-32 pb-24">
            <div className="lg:hidden mb-16">
              <div className="font-youngest text-5xl text-white leading-[0.9] mb-4">
                {heading ? (
                  <PortableText value={heading} components={components} />
                ) : (
                  "Wsparcie"
                )}
              </div>
              <p className="text-philippineSilver font-light text-sm">
                {description}
              </p>
            </div>

            <div className="space-y-24">
              {options.map((item) => (
                <div key={item._key} className="group relative">
                  <span className="text-white/20 font-mono text-sm tracking-widest mb-2 block">
                    {item.number}
                  </span>

                  <div className="text-3xl md:text-4xl font-montserrat font-light text-white mb-6">
                    <PortableText value={item.title} components={components} />
                  </div>

                  <p className="text-philippineSilver/60 text-sm leading-relaxed max-w-md mb-8 group-hover:text-philippineSilver transition-colors duration-500">
                    {item.text}
                  </p>

                  {/* AKCJA: KOPIUJ */}
                  {item.actionType === "copy" && item.copyValue && (
                    <button
                      type="button"
                      // ZMIANA: Dodano fallback ?? "" aby uniknąć błędu non-null assertion (!)
                      onClick={() =>
                        handleCopy(item.copyValue ?? "", item._key)
                      }
                      className="relative flex items-center justify-between w-full max-w-md border-b border-white/20 py-4 group/btn hover:border-arylideYellow transition-colors duration-500"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] uppercase text-white/30 tracking-widest mb-1">
                          {item.copyLabel || "Skopiuj"}
                        </span>
                        <span className="font-mono text-2xl text-white tracking-widest group-hover/btn:text-arylideYellow transition-colors duration-300">
                          {item.copyValue}
                        </span>
                      </div>
                      <div className="text-white/30 group-hover/btn:text-white transition-colors">
                        {copiedId === item._key ? (
                          <Check className="w-5 h-5 text-arylideYellow" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </div>
                      {copiedId === item._key && (
                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute right-0 -top-8 text-[10px] text-arylideYellow uppercase tracking-widest font-bold"
                        >
                          Skopiowano
                        </motion.span>
                      )}
                    </button>
                  )}

                  {/* AKCJA: LINK */}
                  {(item.actionType === "external" ||
                    item.actionType === "internal") &&
                    item.linkUrl && (
                      <Link
                        href={item.linkUrl}
                        target={
                          item.actionType === "external" ? "_blank" : undefined
                        }
                        className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 group/link"
                      >
                        {item.linkLabel || "Zobacz więcej"}
                        {item.actionType === "external" ? (
                          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        ) : (
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        )}
                      </Link>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
