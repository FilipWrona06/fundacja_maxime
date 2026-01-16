import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ArrowRight, ExternalLink, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { SupportCopyButton } from "./SupportCopyButton"; // <--- Import wyspy

// --- TYPY ---
interface SupportOption {
  _key: string;
  number: string;
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
    heading?: PortableTextBlock[];
    description?: string;
    mainImage?: SanityImageSource;
    accentImage?: SanityImageSource;
    options?: SupportOption[];
  };
}

// --- PORTABLE TEXT (Server-side rendering) ---
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
  const {
    eyebrow = "Zaangażowanie",
    heading,
    description,
    mainImage,
    accentImage,
    options = [],
  } = data || {};

  const hasOptions = options.length > 0;

  if (!hasOptions) {
    return <section className="hidden" />;
  }

  // Fallbacki dla obrazków (jeśli w Sanity pusto, pokazujemy placeholder CSS)
  const mainImgUrl = mainImage ? urlFor(mainImage).url() : null;
  const accentImgUrl = accentImage ? urlFor(accentImage).url() : null;

  return (
    <section className="relative py-32 bg-raisinBlack overflow-hidden">
      {/* TŁO (Czysty CSS) */}
      <div
        className="absolute top-0 right-0 w-200 h-200 bg-arylideYellow/5 blur-[150px] rounded-full pointer-events-none opacity-60"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 max-w-350 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* --- LEWA STRONA (STICKY) --- */}
          {/* position: sticky działa natywnie w CSS bez JS */}
          <div className="relative hidden lg:block">
            <div className="sticky top-32 h-[calc(100vh-10rem)] flex flex-col justify-center">
              <div className="mb-16 relative z-20">
                <span className="text-arylideYellow text-[10px] font-bold tracking-[0.4em] uppercase block mb-6 animate-fade-in-up">
                  {eyebrow}
                </span>

                <div className="font-youngest text-7xl xl:text-8xl text-white leading-[0.8] mb-8 animate-fade-in-up delay-100">
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
                </div>

                <p className="text-philippineSilver font-light leading-loose max-w-sm border-l border-white/10 pl-6 animate-fade-in-up delay-200">
                  {description}
                </p>
              </div>

              {/* KOMPOZYCJA ZDJĘĆ */}
              <div className="relative w-full max-w-112.5 aspect-4/5 animate-fade-in-up delay-300">
                {/* Obrazek Główny */}
                <div className="absolute inset-0 z-10 overflow-hidden bg-[#222]">
                  {mainImgUrl ? (
                    <Image
                      src={mainImgUrl}
                      alt="Main visual"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/10 bg-linear-to-br from-white/5 to-transparent border border-white/10">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <span className="text-xs uppercase tracking-widest">
                        Brak zdjęcia
                      </span>
                    </div>
                  )}
                </div>

                {/* Obrazek Akcentowy */}
                <div className="absolute -bottom-12 -right-12 w-2/3 h-2/3 z-20 overflow-hidden shadow-2xl border border-white/5 bg-[#1a1a1a]">
                  {accentImgUrl ? (
                    <Image
                      src={accentImgUrl}
                      alt="Accent visual"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/10 bg-linear-to-tl from-arylideYellow/10 to-transparent">
                      <ImageIcon className="w-8 h-8 mb-2" />
                    </div>
                  )}
                </div>

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

                  {/* AKCJA: KOPIUJ (Client Island) */}
                  {item.actionType === "copy" && item.copyValue && (
                    <SupportCopyButton
                      value={item.copyValue}
                      label={item.copyLabel || "Skopiuj"}
                    />
                  )}

                  {/* AKCJA: LINK (Server HTML) */}
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
