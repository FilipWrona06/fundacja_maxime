import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AboutSlider } from "./AboutSlider";

// --- TYPY ---
interface ValueItem {
  _key: string;
  title: string;
  description: string;
  icon: string;
}

// Interfejs dla obrazka z Sanity (z metadata i alt)
interface SanityImage {
  asset: {
    url: string;
    metadata: {
      lqip: string;
    };
  };
  alt?: string; // <--- Dodano obsługę tekstu alternatywnego z CMS
}

interface AboutProps {
  data?: {
    image?: SanityImage;
    eyebrow?: string;
    headingLine1?: string;
    headingLine2?: string;
    description?: string;
    values?: ValueItem[];
    ctaLink?: string;
    ctaText?: string;
  };
}

export const About = ({ data }: AboutProps) => {
  const {
    image,
    eyebrow = "O fundacji",
    headingLine1 = "Tworzymy przestrzeń",
    headingLine2 = "dla dźwięków i ludzi",
    description = "Stowarzyszenie Maxime to więcej niż muzyka...",
    values = [],
    ctaLink = "/o-nas",
    ctaText = "POZNAJ NAS BLIŻEJ",
  } = data || {};

  const hasValues = values.length > 0;

  // Pobieramy dane obrazka
  const imageUrl = image?.asset?.url || "/images/about.jpg";
  const blurUrl = image?.asset?.metadata?.lqip;
  // Fallback dla Alt Text (SEO/Dostępność)
  const altText = image?.alt || "Dyrygent orkiestry Maxime podczas koncertu";

  return (
    <section
      className="relative py-24 md:py-32 bg-raisinBlack overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* --- LEWA STRONA (Media) --- */}
          <div className="w-full lg:w-1/2 relative group">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-arylideYellow/10 blur-[80px] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            <div className="absolute inset-0 border border-white/20 rounded-sm translate-x-4 translate-y-4 z-0 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-arylideYellow" />

            <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm shadow-2xl bg-[#1a1a1a] z-10">
              <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform">
                <Image
                  src={imageUrl}
                  alt={altText} // Dynamiczny Alt Text
                  fill
                  className="object-cover"
                  placeholder={blurUrl ? "blur" : "empty"}
                  blurDataURL={blurUrl}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ filter: "saturate(1.05)" }}
                />
              </div>

              {/* Warstwy dekoracyjne (ukryte dla screen readerów) */}
              <div
                className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-sm"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mixed-blend-overlay"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* --- PRAWA STRONA (Treść) --- */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {/* Nagłówek */}
            <div className="mb-12">
              <span
                id="about-heading" // ID do powiązania z aria-labelledby sekcji
                className="inline-block text-arylideYellow text-xs font-bold tracking-[0.2em] uppercase mb-4 pl-1 animate-fade-in-up"
              >
                {eyebrow}
              </span>
              <h2 className="font-youngest text-5xl md:text-6xl text-white mb-8 leading-tight">
                {headingLine1} <br />
                <span className="text-philippineSilver/50">{headingLine2}</span>
              </h2>
              <p className="text-philippineSilver text-lg leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* SLIDER (Wyspa Kliencka) */}
            {hasValues && (
              <section
                className="border-t border-white/10 pt-10 min-h-55 flex flex-col justify-between"
                aria-label="Wartości fundacji"
              >
                <AboutSlider values={values} />
              </section>
            )}

            {/* Link CTA */}
            <div className="mt-10">
              <Link
                href={ctaLink}
                className="group inline-flex items-center gap-2 text-white hover:text-arylideYellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow rounded-sm p-1"
              >
                <span className="text-sm font-bold tracking-widest border-b border-white/20 pb-1 group-hover:border-arylideYellow">
                  {ctaText}
                </span>
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
