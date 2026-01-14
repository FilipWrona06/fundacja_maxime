import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Typy
interface PartnerItem {
  _key: string;
  name: string;
  logo?: SanityImageSource;
}

interface PartnersProps {
  data?: {
    eyebrow?: string;
    title?: string;
    items?: PartnerItem[];
    settings?: {
      speed?: number;
      direction?: "left" | "right";
    };
  };
}

export const Partners = ({ data }: PartnersProps) => {
  const {
    eyebrow = "Zaufanie",
    title = "Współpracowaliśmy z:",
    items = [],
    settings,
  } = data || {};

  const speed = settings?.speed || 60;
  const direction = settings?.direction || "left";

  if (!items || items.length === 0) return null;

  // TWÓRZENIE LISTY (Oryginał + Kopia dla płynnej pętli)
  // Wystarczy zduplikować raz, jeśli CSS przesuwa o -50%
  const marqueeItems = [...items, ...items];

  return (
    <section
      className="py-16 bg-raisinBlack overflow-hidden relative"
      aria-label="Nasi Partnerzy"
    >
      {/* Nagłówek */}
      <div className="container mx-auto px-4 mb-10 text-center">
        {eyebrow && (
          <span className="text-arylideYellow/60 text-xs font-bold tracking-[0.3em] uppercase block mb-2 animate-fade-in-up">
            {eyebrow}
          </span>
        )}
        {title && (
          <h3 className="text-philippineSilver font-montserrat text-sm uppercase tracking-widest animate-fade-in-up delay-100">
            {title}
          </h3>
        )}
      </div>

      {/* --- Gradienty (Fade Effect) --- */}
      {/* aria-hidden, bo to tylko dekoracja */}
      <div className="relative w-full max-w-480 mx-auto" aria-hidden="true">
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-linear-to-r from-raisinBlack to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-linear-to-l from-raisinBlack to-transparent z-10 pointer-events-none" />

        {/* --- MARQUEE TRACK --- */}
        <div className="flex overflow-hidden select-none">
          <div
            className={`
              flex gap-12 md:gap-24 items-center whitespace-nowrap min-w-full 
              animate-marquee ${direction === "right" ? "animate-marquee-reverse" : ""}
            `}
            // Przekazujemy szybkość jako zmienną CSS (Server-side style)
            style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
          >
            {marqueeItems.map((item, index) => {
              // Sprawdzamy czy to element z duplikowanej części
              const isDuplicate = index >= items.length;
              // Generujemy unikalny klucz: ID + index (bo ID się powtarza w duplikacie)
              const uniqueKey = `${item._key}-${index}`;

              return (
                <div
                  key={uniqueKey}
                  className="relative flex items-center justify-center shrink-0"
                  // Kluczowe dla dostępności: czytnik ignoruje duplikaty
                  aria-hidden={isDuplicate}
                >
                  {item.logo ? (
                    // Wariant: LOGO
                    <div className="relative h-12 w-auto min-w-25 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                      <Image
                        src={urlFor(item.logo).url()}
                        alt={item.name}
                        width={200}
                        height={100}
                        className="h-full w-auto object-contain"
                        // Optymalizacja wydajności
                        loading="lazy"
                        sizes="(max-width: 768px) 150px, 200px"
                      />
                    </div>
                  ) : (
                    // Wariant: TEKST
                    <span className="text-xl md:text-2xl font-youngest text-white/30 hover:text-arylideYellow transition-colors duration-300 cursor-default">
                      {item.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
