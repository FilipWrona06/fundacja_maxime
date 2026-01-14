import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { HeroVideo } from "./HeroVideo"; // <--- Importujemy komponent kliencki

// Typy danych z Sanity
interface HeroProps {
  data?: {
    badge?: string;
    headingLine1?: string;
    headingLine2?: string;
    description?: string;
    buttons?: Array<{
      _key: string;
      title: string;
      link: string;
      style: "primary" | "secondary";
    }>;
  };
}

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
      {/* Wrapper jest na serwerze, ale środek (Wideo) ładuje się po stronie klienta */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Overlay dla kontrastu (Renderowany na serwerze!) */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(38,38,38,0.4)_0%,rgba(38,38,38,0.75)_100%)]" />

        {/* Wyspa Kliencka */}
        <HeroVideo />
      </div>

      {/* --- TREŚĆ (Server Side Rendered) --- */}
      {/* Wszystko poniżej to czysty HTML z serwera = Idealne SEO i LCP */}
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

              return (
                <Link
                  key={btn._key}
                  href={btn.link || "#"}
                  className={
                    isPrimary
                      ? "group relative px-8 py-4 rounded-full bg-arylideYellow text-raisinBlack font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] w-auto min-w-55 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack"
                      : "group px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-medium text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-raisinBlack hover:border-white w-auto min-w-55 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack"
                  }
                >
                  {isPrimary ? (
                    <>
                      <span className="relative z-10">{btn.title}</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </>
                  ) : (
                    btn.title
                  )}
                </Link>
              );
            })
          ) : (
            // Fallback
            <>
              <Link
                href="/wydarzenia"
                className="group relative px-8 py-4 rounded-full bg-arylideYellow text-raisinBlack font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] w-auto min-w-55 text-center"
              >
                <span className="relative z-10">Zobacz wydarzenia</span>
              </Link>
              <Link
                href="/kontakt"
                className="group px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-medium text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-raisinBlack hover:border-white w-auto min-w-55 text-center"
              >
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
