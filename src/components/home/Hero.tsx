import { ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { HeroVideo } from "./HeroVideo";

// --- TYPY (Zgodne z nowym Smart CTA) ---
interface HeroButton {
  _key: string;
  title: string;
  style: "primary" | "secondary";
  // Nowe pola z Sanity
  linkType?: "internal" | "external";
  internalLink?: string; // Slug
  externalLink?: string; // URL
  openInNewTab?: boolean;
  ariaLabel?: string;
}

interface HeroProps {
  data?: {
    badge?: string;
    headingLine1?: string;
    headingLine2?: string;
    description?: string;
    buttons?: HeroButton[];
  };
}

// --- HELPERY STYLÓW ---
const btnBase =
  "relative flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-all duration-300 w-auto min-w-55 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack";

const btnPrimary =
  "group bg-arylideYellow text-raisinBlack hover:scale-105 hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] focus-visible:ring-white overflow-hidden";

const btnSecondary =
  "group border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white hover:text-raisinBlack hover:border-white focus-visible:ring-arylideYellow";

// --- HELPER LINKÓW ---
const getHref = (btn: HeroButton) => {
  if (btn.linkType === "internal" && btn.internalLink) {
    return `/${btn.internalLink}`;
  }
  if (btn.linkType === "external" && btn.externalLink) {
    return btn.externalLink;
  }
  return "#";
};

export const Hero = ({ data }: HeroProps) => {
  const {
    badge = "Fundacja Maxime",
    headingLine1 = "Z pasji",
    headingLine2 = "do muzyki",
    description = "Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez piękno dźwięku.",
    buttons = [],
  } = data || {};

  return (
    <section
      aria-label="Sekcja powitalna"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-raisinBlack"
    >
      {/* --- VIDEO TŁO --- */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(38,38,38,0.4)_0%,rgba(38,38,38,0.75)_100%)]" />
        <HeroVideo />
      </div>

      {/* --- TREŚĆ --- */}
      <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="animate-fade-in-up">
          <span className="inline-block py-1.5 px-3 rounded-full border border-philippineSilver/30 bg-white/5 backdrop-blur-sm text-philippineSilver text-xs sm:text-[0.8rem] md:text-[0.9rem] font-montserrat tracking-[0.2em] uppercase">
            {badge}
          </span>
        </div>

        {/* Nagłówek H1 */}
        <h1 className="animate-fade-in-up delay-200 font-youngest text-[4.78rem] sm:text-[8rem] md:text-[10rem] text-arylideYellow mb-2 drop-shadow-lg leading-tight select-none">
          <span className="block">{headingLine1}</span>
          <span className="block -mt-2 md:-mt-6">{headingLine2}</span>
        </h1>

        {/* Opis */}
        <p className="animate-fade-in-up delay-300 font-montserrat text-[0.97rem] sm:text-[1.05rem] md:text-[1.15rem] max-w-lg leading-relaxed mt-10 mb-10 text-white/90">
          {description}
        </p>

        {/* Przyciski */}
        <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {buttons.length > 0 ? (
            buttons.map((btn) => {
              const isPrimary = btn.style?.startsWith("primary");
              const href = getHref(btn);
              const isExternal = btn.linkType === "external";

              return (
                <Link
                  key={btn._key}
                  href={href}
                  target={btn.openInNewTab ? "_blank" : undefined}
                  rel={btn.openInNewTab ? "noopener noreferrer" : undefined}
                  aria-label={btn.ariaLabel || undefined}
                  className={`${btnBase} ${isPrimary ? btnPrimary : btnSecondary}`}
                >
                  {isPrimary ? (
                    <>
                      <span className="relative z-10 flex items-center gap-2">
                        {btn.title}
                        {isExternal && <ExternalLink className="w-4 h-4" />}
                      </span>
                      {/* Efekt Flash */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </>
                  ) : (
                    <span className="flex items-center gap-2">
                      {btn.title}
                      {isExternal && <ExternalLink className="w-4 h-4" />}
                    </span>
                  )}
                </Link>
              );
            })
          ) : (
            // Fallback (Gdy brak danych w Sanity)
            <>
              <Link href="/wydarzenia" className={`${btnBase} ${btnPrimary}`}>
                <span className="relative z-10">Zobacz wydarzenia</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Link>
              <Link href="/kontakt" className={`${btnBase} ${btnSecondary}`}>
                Skontaktuj się
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none animate-fade-in-up delay-500"
        aria-hidden="true"
      >
        <ChevronDown className="w-10 h-10 text-white/75" strokeWidth={1} />
      </div>

      {/* Gradient dolny */}
      <div className="absolute bottom-0 left-0 w-full h-100 bg-linear-to-t from-raisinBlack via-raisinBlack/50 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
